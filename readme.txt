== Paid Memberships Pro - Paid Memberships Pro - Goals Progress Bar Add On ==
Contributors: strangerstudios, andrewlimaza
Tags: pmpro, paid memberships pro, goals, progress
Requires at least: 4.0
Tested up to: 5.1.1
Stable tag: 1.0

Display a progress bar for membership site signup and revenue goals.

== Description ==

Create a dynamic progress bar that can be used in your posts, pages or widgets. Each progress bar offers unique settings to customize the appearance and the target, including which membership levels to count in the total goal progress calculation.

After installing and activating the plugin, you will be able to add a new Goal Progress Bar via a shortcode or Block (if you are using the Block Editor as part of WordPress v5.0+).

== Installation ==

1. Upload the 'pmpro-goals' directory to the '/wp-content/plugins/' directory of your site.
1. Activate the plugin through the 'Plugins' menu in WordPress.

== Setup ==

The Add On adds a new '[pmpro_goal]' shortcode and a Goal Progress Bar Block.

Shortcode attributes and Block settings include:
1. levels: A single or comma-separated list of level IDs to include in the goal tracking; Required. (i.e. “1,2”)
1. goal_type: The type of goal to track. Default: “revenue”; Accepts: “revenue” or “members”
1. goal: The numeric goal you would like to reach. Do not include any currency symbol or special characters; Required. (i.e. “1000”)
1. before: Text to display before the progress text to date.
1. after: Text to display after the goal text.
1. fill_color: Hexadecimal color value for the goal’s progress bar. Default: “#77A02E”.
1. background_color: Hexadecimal color value for background of the entire goal bar. Default: “#2497C8”.
1. font_color: Hexadecimal color value for the text of the goal bar. Default: “#FFFFFF”.

== Frequently Asked Questions ==

= I found a bug in the plugin. =

Please post it in the issues section of GitHub and we'll fix it as soon as we can. Thanks for helping. https://github.com/strangerstudios/pmpro-goals/issues

== Changelog ==

= 1.0 =
* This is the initial version of the plugin.