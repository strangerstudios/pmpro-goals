<?php
/**
 * Plugin Name: Paid Memberships Pro Goal Progress
 * Description: Track Membership and Revenue Goals with Progress Bars.
 * Plugin URI: https://paidmembershipspro.com
 * Author: Stranger Studios
 * Author URI: https://paidmembershipspro.com
 * Version: 1.0
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pmpro-goals
 * Domain Path: /languages
 * Network: false
 *
 * Paid Memberships Pro Goal Progress is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Paid Memberships Pro Goal Progress is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Paid Memberships Pro Goal Progress. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 */

defined( 'ABSPATH' ) or exit;

function pmpro_goals_load_text_domain() {
	load_plugin_textdomain( 'pmpro-goals', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'pmpro_goals_load_text_domain' );

function pmpro_goals_register_scripts_styles() {

	wp_register_style( 'pmpro-goals-progress-css', plugins_url( '/css/goalProgress.css', __FILE__ ), array( '' ), '1.0.0');

	wp_register_script( 'pmpro-goals-progress-js', plugins_url( '/js/goalProgress.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );

}
add_action( 'wp_enqueue_scripts', 'pmpro_goals_register_scripts_styles' );

// Show goals for PMPro levels funds raised. Quick example.
function pmpro_goal_progress_bar_shortcode( $atts ) {
	global $wpdb, $pmpro_currency_symbol;

	// enqueue script and styles.
	wp_enqueue_script( 'pmpro-goals-progress-js' );
	wp_enqueue_style( 'pmpro-goals-progress-css' );

	extract( shortcode_atts( array(
		'level' => NULL,
		'levels' => NULL,
		'goal' => NULL,
		'text_after' => 'raised',
		'fill_color' => '#f7f7f7',
		'background_color' => '#ff008c',
		'font_color' => '#FFF'
	), $atts ) );

	//if levels is used instead of level
	if ( isset( $levels ) && ! isset( $level ) ) {
		$level = $levels;
	}

	//figure out which level/levels to check
	if ( ! empty( $level ) || $level === "0" || $level === 0 ) {
	   //they specified a level(s)
	   if ( strpos( $level, "," ) ) {
		   //they specified many levels
		   $levels = explode( ",", $level );
	   } else {
		   //they specified just one level
		   $levels = array( $level );
	   }	   
	}

	$goal = intval( $goal );
	$text_after = esc_attr( $text_after );
	$fill_color = esc_attr( $fill_color );
	$background_color = esc_attr( $background_color );
	$font_color = esc_attr( $font_color );
	$total = 0;
	$goal_reached = false;

	$after_total_amount_text =  ' / ' . $pmpro_currency_symbol . $goal . ' ' . $text_after;

	/**
	 * Filter to adjust the text after the total amount inside the goal progress bar.
	 * @return string The text after the total amount.
	 * @since 1.0
	 */
	$text_after = apply_filters( 'pmpro_goals_text_after', $after_total_amount_text );

	if ( empty( $levels ) ) {
		return "<span class='pmpro-warning'>" . __( 'Please insert a valid level(s)', 'pmpro-goals' ) . "</span>";
	}

	$sql = "SELECT total FROM $wpdb->pmpro_membership_orders WHERE membership_id IN(" . implode(",", $levels) . ") AND status = 'success'";

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

	ob_start();
	?>
	<script type="text/javascript">
		jQuery(document).ready(function(){
		    jQuery('#pmpro_goal_progress_bar').goalProgress({
		        goalAmount: <?php echo $goal; ?>,
		        currentAmount: <?php echo $total; ?>,
		        textBefore: "<?php echo $pmpro_currency_symbol; ?>",
		        textAfter: "<?php echo $text_after; ?> ",
		    });
		});
	</script>

	<style type="text/css">
		.goalProgress {
			background: <?php echo $fill_color; ?>;
			padding: 5px;
		}
		div.progressBar {
			background: <?php echo $background_color; ?>;
			color: <?php echo $font_color; ?>;
			font-size: 1.5em;
			font-family: 'helvetica neue', helvetica, arial, sans-serif;
			letter-spacing: -1px;
			font-weight: 700;
			padding: 10px;
			display: block;
			overflow: hidden;
			width: 20px;
		}
		span.goalAmount {
			display: none;
			text-indent: -9999px;
		}
	</style>	
	
	<div class="pmpro_goal_container">
		<?php do_action( 'pmpro_before_progress_bar' ); ?>
			<div id="pmpro_goal_progress_bar"></div>
		<?php do_action( 'pmpro_after_progress_bar' ); ?>
	</div>

<?php

	$shortcode_content = ob_get_clean();

	return $shortcode_content;
}
add_shortcode( 'pmpro_goal', 'pmpro_goal_progress_bar_shortcode' );