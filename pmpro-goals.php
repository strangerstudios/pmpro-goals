<?php
/**
 * Plugin Name: Paid Memberships Pro - Goal Progress Bar Add On
 * Description: Display a progress bar for membership site signup and revenue goals.
 * Plugin URI: https://wwwpaidmembershipspro.com/add-ons/pmpro-goals/
 * Author: Paid Memberships Pro
 * Author URI: https://www.paidmembershipspro.com
 * Version: 1.0
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pmpro-goals
 * Domain Path: /languages
 * Network: false
 *
 * Paid Memberships Pro - Goal Progress Bar Add On is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Paid Memberships Pro - Goal Progress Bar Add On is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Paid Memberships Pro Goal Progress. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 */

defined( 'ABSPATH' ) or exit;

/**
 * Register gutenberg block.
 * @since 1.0
 */
function pmpro_goals_register_block() {

	// register script for Gutenberg
	wp_register_script( 
		'pmpro-goals-block', 
		plugins_url( 'build/index.js', __FILE__ ), 
		array( 'wp-blocks', 'wp-element', 'wp-editor' )
	);

	register_block_type( 'pmpro-goals/goal-progress', array(
		'editor_script' => 'pmpro-goals-block',
		'render_callback' => 'pmpro_goal_progress_bar_shortcode'
	) );

	load_plugin_textdomain( 'pmpro-goals', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	wp_set_script_translations( 'pmpro-goals-block', 'pmpro-goals', dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	add_shortcode( 'pmpro_goal', 'pmpro_goal_progress_bar_shortcode' );
	add_shortcode( 'pmpro_goals', 'pmpro_goal_progress_bar_shortcode' );
}
add_action( 'init', 'pmpro_goals_register_block' );

function pmpro_goals_block_editor_assets() {

	$editor_css_path = '/css/pmpro-goals-editor.css';

	wp_enqueue_style( 
		'pmpro-goals-editor-css',
		plugins_url( $editor_css_path, __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', 'pmpro_goals_block_editor_assets' );

// Show goals for PMPro levels funds raised. Quick example.
function pmpro_goal_progress_bar_shortcode( $atts ) {

	global $wpdb, $pmpro_currency_symbol;

	extract( shortcode_atts( array(
		'after' => NULL,
		'background_color' => '#BBBBBB',
		'before' => NULL,
		'end_date' => NULL,
		'fill_color' => '#77A02E',
		'font_color' => '#FFFFFF',
		'goal' => NULL,
		'goal_type' => NULL, 
		'level' => NULL,
		'levels' => NULL,
		'start_date' => NULL,
		'use_dates' => true
	), $atts ) );
	//if levels is used instead of level
	if ( isset( $levels ) && ! isset( $level ) ) {
		$level = $levels;
	} else {
		$levels = $level;
	}

	$goal = intval( $goal );
	$after = esc_attr( $after );
	$fill_color = sanitize_hex_color( $fill_color );
	$background_color = sanitize_hex_color( $background_color );
	$font_color = sanitize_hex_color( $font_color );
	$goal_type = esc_attr( $goal_type );
	$total = 0;
	$goal_reached = false;

	if ( empty( $levels ) ) {
		return "<span class='pmpro-warning'>" . __( 'Please insert a valid level(s)', 'pmpro-goals' ) . "</span>";
	}

	if ( empty( $goal ) || $goal === 0 ) {
		return "<span class='pmpro-warning'>" . __( 'Goal amount is invalid.', 'pmpro-goals' ) . "</span>";
	}

	if ( empty( $goal_type ) || 'members' !== $goal_type ) {
		$goal_type = 'revenue';
	}

	// This is used to create a level string that can be hashed.
	$levels_for_hash = '';
	if ( is_array( $levels ) ) {
		foreach( $levels as $key => $value ) {
			$levels_for_hash .= $value;
		}
	} else {
		$levels_for_hash = $levels;
	}

	// Generate level data for SQL query.
	if ( is_array( $levels ) ) {
		$level_data = implode(",", $levels);
	} else {
		$level_data = $level;
	}

	$level_data = apply_filters( 'pmpro_goals_sql_level_data', $level_data );

	// Check hash for transients.
	$to_hash = md5( $goal . $after . $fill_color . $background_color . $font_color . $goal_type . $start_date . $end_date . $use_dates . $levels_for_hash );
	$hashkey = substr( $to_hash, 0, 10);

	if ( ! empty( $start_date ) ) {
		$start_date = date( 'Y-m-d', strtotime( $start_date ) ) . " 00:00:00";
	}

	if ( ! empty( $end_date ) ) {
		$end_date = date( 'Y-m-d', strtotime( $end_date ) ) . " 11:59:59";
	}

	if ( 'revenue' === $goal_type ) {

		if ( false === get_transient( "pmpro_goals_" . $hashkey )  ) {

			$sql = "SELECT total FROM $wpdb->pmpro_membership_orders WHERE membership_id IN(" . $level_data . ") AND status = 'success'";

			if ( $use_dates !== false ) {
				if ( ! empty( $start_date ) ) {
					$sql .= " AND timestamp >= '" . esc_sql( $start_date ) . "'";
				}

				if ( ! empty( $end_date ) ) {
					$sql .= " AND timestamp <= '" . esc_sql( $end_date ) . "'";
				}
			}

			$results = $wpdb->get_results( $sql );

			if ( ! empty( $results ) && is_array( $results ) ) {
				foreach ( $results as $key => $value ) {
					$total += floatval( $value->total);
				}
			}

			if ( $total > 0 ) {
				$total = round( $total );
			} else {
				$total = 0;
			}

			set_transient( 'pmpro_goals_' . $hashkey, $total, 12 * HOUR_IN_SECONDS );	

		} else {
			$total = get_transient( 'pmpro_goals_' . $hashkey );
		}

		$after_total_amount_text =  ' <span class="pmpro_goals-separator">/</span> ';
		$after_total_amount_text .=  '<span class="pmpro_goals-goal">' . pmpro_formatPrice( $goal ) . '</span>';
		$after_total_amount_text .=  ' <span class="pmpro_goals-after-text">' . ' ' . $after . '</span>';

		$percentage = intval( ( $total / $goal ) * 100 );

		$total = pmpro_formatPrice( $total ); //Format the pricing here for later.

	} else {

		if ( false === get_transient( "pmpro_goals_" . $hashkey )  ) {
			$sql = "SELECT COUNT(user_id) AS total FROM $wpdb->pmpro_memberships_users WHERE membership_id IN(" . $level_data . ") AND status = 'active'";

			if ( $use_dates !== false ) {
				if ( ! empty( $start_date ) ) {
					$sql .= " AND startdate >= '" . esc_sql( $start_date ) . "'";
				}

				if ( ! empty( $end_date ) ) {
					$sql .= " AND startdate <= '" . esc_sql( $end_date ) . "'";
				}
			}

			$total = $wpdb->get_var( $sql );

			set_transient( 'pmpro_goals_' . $hashkey, $total, 12 * HOUR_IN_SECONDS );	

		} else {

			$total = get_transient( "pmpro_goals_" . $hashkey );

		}

		$after_total_amount_text =  ' <span class="pmpro_goals-separator">/</span> ';
		$after_total_amount_text .=  '<span class="pmpro_goals-goal">' . $goal . '</span>';
		$after_total_amount_text .=  ' <span class="pmpro_goals-after-text">' . ' ' . $after . '</span>';

		$percentage = intval( ( $total / $goal ) * 100 );
	}

	/**
	 * Filter to adjust the text after the total amount inside the goal progress bar.
	 * @return string The text after the total amount.
	 * @since 1.0
	 */
	$after_text = apply_filters( 'pmpro_goals_after_text', $after_total_amount_text );
	

	if ( $percentage > 100 ) {
		$percentage = 100;
	}

	ob_start();
	?>	
		<?php do_action( 'pmpro_goals_before_bar' ); ?>
				<div class="pmpro_goals-bar" style="<?php echo 'background:' . $background_color; ?>;margin-top:1em;margin-bottom:1em;padding: 5px;border-radius:5px;">
					<span class="pmpro_goals-bar-content" style="position:absolute;max-width:100%;<?php echo 'color:' . $font_color; ?>;font-weight: 700;padding: 10px;">
							<span class="pmpro_goals-before-text"><?php echo $before; ?></span>
							<span class="pmpro_goals-total"><?php echo $total; ?></span>
							<?php echo $after_text; ?>
					</span>
					<div class="pmpro_goals-progress" style="<?php echo 'background:' . $fill_color; ?>; <?php echo 'width:' . $percentage . '%'?>;height:50px;"></div>
				</div>

		<?php do_action( 'pmpro_goals_after_bar' ); ?>
<?php

	$shortcode_content = ob_get_clean();

	return $shortcode_content;
}

function pmpro_goals_delete_transients() {
	global $wpdb;

	$sql = "SELECT `option_name` FROM $wpdb->options WHERE `option_name` LIKE '%_pmpro_goal_%'";

	$results = $wpdb->get_results( $sql );

	foreach( $results as $key => $value ) {
		if ( strpos( $value->option_name, 'timeout' ) === false ) {
			$transient = ltrim( $value->option_name, '_transient_' );
			delete_transient( $transient );
		}
	}	
}
add_action( 'pmpro_added_order', 'pmpro_goals_delete_transients' );
add_action( 'pmpro_updated_order', 'pmpro_goals_delete_transients' );
add_action( 'pmpro_after_change_membership_level', 'pmpro_goals_delete_transients' );

/*
	Function to add links to the plugin row meta
*/
function pmpro_goals_plugin_row_meta( $links, $file ) {
	if ( strpos( $file, 'pmpro-goals.php' ) !== false ) {
		$new_links = array(
			'<a href="' . esc_url( 'https://www.paidmembershipspro.com/add-ons/pmpro-goals/' )  . '" title="' . esc_attr( __( 'View Documentation', 'paid-memberships-pro' ) ) . '">' . __( 'Docs', 'paid-memberships-pro' ) . '</a>',
			'<a href="' . esc_url( 'http://paidmembershipspro.com/support/' ) . '" title="' . esc_attr( __( 'Visit Customer Support Area', 'paid-memberships-pro' ) ) . '">' . __( 'Support', 'paid-memberships-pro' ) . '</a>',
		);
		$links = array_merge( $links, $new_links );
	}
	return $links;
}
add_filter( 'plugin_row_meta', 'pmpro_goals_plugin_row_meta', 10, 2 );
