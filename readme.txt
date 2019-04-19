== Paid Memberships Pro - Goals Progress Bar Add On ==
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

This Add On supports a shortcode or block implementation. Sites using the WordPress v5.0+ Block Editor can insert the block via either method. All other sites can use the shortcode method described below. 

Each Goal Progress Bar has unique settings and can be configured to fit your needs. You can set up more than one Goal Progress Bar on a single page or insert them on multiple pages of your site. Both implementations feature the same settings:
1. Type of Goal: Choose whether your goal is tracking revenue, sales, or member count.
1. Levels to Track: Choose the levels to include in your goal tracking.
1. Goal Amount: The numeric revenue value (no currency symbol), or the number of sales or signups to reach your goal.
1. Start Date: Only include sales and sign ups after this date.
1. End Date: Only include sales and sign ups before this date.
1. Text Before: Text to display before the Goal Progress value to date.
1. Text After: Text to display after the total Goal Amount.
1. Font Color: The color of the text overlaid on the Goal Progress Bar.
1. Fill Color: The color of the progress “thermometer”.
1. Background Color: The background color of the entire bar.

If you’re using the WordPress v5.0+ Block Editor, you can place the Goal Progress Bar Block in your posts and pages. If you want to show the same Goal on multiple pages, you can use a “Reusable Block” or copy the same settings from one Block to another.

Here is the format for using the shortcode implementation:
`[pmpro_goal level="1,2" goal="100" goal_type="members" fill_color="#9932CC"]`

The shortcode attributes include:
1. after: Text to display after the goal text.
1. background_color: Hexadecimal color value for background of the entire goal bar. Default: “#BBBBBB”.
1. before: Text to display before the progress text to date.
1. fill_color: Hexadecimal color value for the goal’s progress bar. Default: “#77A02E”.
1. font_color: Hexadecimal color value for the text of the goal bar. Default: “#FFFFFF”.
1. goal: The numeric goal you would like to reach. Do not include any currency symbol or special characters; Required. (i.e. “1000”)
1. goal_type: The type of goal to track. Default: "revenue"; Accepts: "revenue", "sales" or "members"
1. start_date: Only include orders or sign ups after this date. Use yyyy-mm-dd format.
1. end_date: Only include orders or sign ups before this date. Use yyyy-mm-dd format.
1. levels: A single or comma-separated list of level IDs to include in the goal tracking. (i.e. “1,2”) Defaults to all levels if blank.

== Frequently Asked Questions ==

= I found a bug in the plugin. =

Please post it in the issues section of GitHub and we'll fix it as soon as we can. Thanks for helping. https://github.com/strangerstudios/pmpro-goals/issues

== Changelog ==

= 1.0 =
* This is the initial version of the plugin.