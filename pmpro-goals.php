<?php
/**
 * Plugin Name: Paid Memberships Pro - Goal Progress Bar Add On
 * Description: Display a progress bar for membership site signup and revenue goals.
 * Plugin URI: https://www.paidmembershipspro.com/add-ons/pmpro-goals/
 * Author: Paid Memberships Pro
 * Author URI: https://www.paidmembershipspro.com
 * Version: 1.2
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
	// Register script for Gutenberg
	wp_register_script( 
		'pmpro-goals-block', 
		plugins_url( 'build/index.js', __FILE__ ), 
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'pmpro_admin' )
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

	$editor_css_path = '/css/pmpro-goals.css';

	wp_enqueue_style( 
		'pmpro-goals-editor-css',
		plugins_url( $editor_css_path, __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', 'pmpro_goals_block_editor_assets' );

// Show goals for PMPro levels funds raised. Quick example.
function pmpro_goal_progress_bar_shortcode( $atts ) {
	global $wpdb, $pmpro_currency_symbol;
	
	// Make sure PMPro is active
	if ( ! function_exists( 'pmpro_getAllLevels' ) ) {
		return "<span class='pmpro-warning'>" . esc_html__( 'Make sure the Paid Memberships Pro plugin is active.', 'pmpro-goals' ) . "</span>";
	}

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
	
	// If levels is used instead of level
	if ( isset( $level ) && ! isset( $levels ) ) {
		$levels = $level;
	}

	// Default to all levels if none passed.
	$levels = empty( $levels ) ? array_keys( pmpro_getAllLevels() ) : $levels;

	// Generate level data for SQL query.
	if ( is_array( $levels ) ) {
		//We need to ensure backwards compatibility with the old way of passing levels.
		//Select2 pass a multidiemnsional array but it used to be single dimension aray.
		$level_data = count($levels) == count($levels, COUNT_RECURSIVE)
		? implode(",", $levels)
		: implode(",", wp_list_pluck($levels, 'value'));
	} else {
		$level_data = $levels;
	}

	$level_data = apply_filters( 'pmpro_goals_sql_level_data', $level_data );

	// intval ensures we have a number. We need a number greater than 0.
	$goal = intval( $goal ) > 0 ? intval( $goal ) : 1;
	$after = esc_attr( $after );
	$fill_color = sanitize_hex_color( $fill_color );
	$background_color = sanitize_hex_color( $background_color );
	$font_color = sanitize_hex_color( $font_color );
	$goal_type = esc_attr( $goal_type );

	if ( empty( $goal_type ) || ! in_array( $goal_type, array( 'members', 'sales', 'revenue' ) ) ) {
		$goal_type = 'revenue';
	}

	// Store data in a transient to save resources.
	// `pmpro_goals_[level id]_[goal amount]_[goal type]_[start date]_[end date]`
	$cache_string = str_replace(',', '-', $level_data) . '_' . $goal . '_' . $goal_type;

	if ( ! empty( $start_date ) && $use_dates ) {
		$short_start_date = date( 'Y-m-d', strtotime( $start_date ) );
		$start_date = date( 'Y-m-d h:m', strtotime($start_date ) );
		$cache_string .= '_' . $short_start_date;
	} else {
		$cache_string .= '_' . 'null';
	}

	if ( ! empty( $end_date ) && $use_dates ) {
		$short_end_date = date( 'Y-m-d', strtotime( $end_date ) );
		$end_date =  date( 'Y-m-d h:m', strtotime($end_date ) );
		$cache_string .= '_' . $short_end_date;
	} else {
		$cache_string .= '_' . 'null';
	}

	$cache_key = substr( $cache_string, 0, 172);

	$total = get_transient('pmpro_goals_' . $cache_key);

	$should_set_new_transient = $total == false || intval($total) == 0;

	if ($should_set_new_transient)	 {
		$sql = '';
		switch ($goal_type) {
			case 'revenue':
				$sql = "SELECT SUM(total) FROM $wpdb->pmpro_membership_orders WHERE membership_id IN(" . $level_data . ") AND status NOT IN('error', 'pending', 'refunded', 'review', 'token')";
				break;
			case 'sales':
				$sql = "SELECT COUNT(*) FROM $wpdb->pmpro_membership_orders WHERE membership_id IN(" . $level_data . ") AND status NOT IN('error', 'pending', 'refunded', 'review', 'token')";
				break;
			case 'members':
				$is_member = false;
				$sql = "SELECT COUNT(user_id) AS total FROM $wpdb->pmpro_memberships_users WHERE membership_id IN(" . $level_data . ") AND status = 'active'";
				break;
			//This case should never happen and it wont if you don't break $goal_type validation above.
			default:
			return;
		}
	
		if ( $use_dates ) {
			$column_name = $goal_type == 'members' ? 'startdate' : 'timestamp';
			if (!empty($start_date)) {
				$sql .= " AND " . $column_name . " >= '" . esc_sql($start_date) . "'";
			}
			if (!empty($end_date)) {
				$sql .= " AND " . $column_name . " <= '" . esc_sql($end_date) . "'";
			}
		}

		$total = intval($wpdb->get_var($sql));

		set_transient('pmpro_goals_' . $cache_key, $total, 12 * HOUR_IN_SECONDS);
	}

	$formatted_goal = $goal_type == 'revenue' ? pmpro_formatPrice( $goal ) : $goal;
	$after_total_amount_text = ' <span class="pmpro_goals-separator">/</span> ';
	$after_total_amount_text .= '<span class="pmpro_goals-goal">' . esc_html( $formatted_goal ) . '</span>';
	$after_total_amount_text .= ' <span class="pmpro_goals-after-text">' . ' ' . esc_html( $after ) . '</span>';

	$percentage = intval(($total / $goal) * 100);

	/**
	 * Filter to adjust the text after the total amount inside the goal progress bar.
	 * @return string The text after the total amount.
	 * @since 1.0
	 */
	$after_text = apply_filters( 'pmpro_goals_after_text', $after_total_amount_text, $total, $goal, $percentage );
	
	// If we get to over 100%, just keep it at 100%;
	if ( $percentage > 100 ) {
		$percentage = 100;
	}

	ob_start();
	?>	
		<?php do_action( 'pmpro_goals_before_bar', $total, $goal, $percentage ); ?>
				<div class="pmpro_goals-bar" style="<?php echo 'background:' . esc_attr( $background_color ); ?>;margin-top:1em;margin-bottom:1em;padding: 5px;border-radius:5px;">
					<span class="pmpro_goals-bar-content" style="position:absolute;max-width:100%;<?php echo 'color:' . esc_attr( $font_color ); ?>;font-weight: 700;padding: 10px;">
							<span class="pmpro_goals-before-text"><?php echo esc_html( $before ); ?></span>
							<span class="pmpro_goals-total"><?php if ( $goal_type == 'revenue' ) { echo pmpro_formatPrice( $total ); } else { echo $total; } ?></span>
							<?php 
							//phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped - Escaped above.
							echo $after_text; 
							?>
					</span>
					<div class="pmpro_goals-progress" style="<?php echo 'background:' . esc_attr( $fill_color ); ?>; <?php echo 'width:' . esc_attr( $percentage ) . '%'?>;height:50px;"></div>
				</div>

		<?php do_action( 'pmpro_goals_after_bar', $total, $goal, $percentage ); ?>
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
