/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    BlockControls = _wp$blocks.BlockControls;
var _wp$components = wp.components,
    Panel = _wp$components.Panel,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    SelectControl = _wp$components.SelectControl,
    TextControl = _wp$components.TextControl,
    RangeControl = _wp$components.RangeControl,
    ColorPalette = _wp$components.ColorPalette;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    InspectorControls = _wp$editor.InspectorControls;


var all_levels = pmpro.all_level_values_and_labels;

var goal_types = [{ value: 'revenue', label: 'Revenue' }, { value: 'members', label: 'Members' }];

var default_colors = [{ color: "#ff7675", name: 'red' }, { color: "#55efc4", name: 'green' }, { color: "#74b9ff", name: 'blue' }];

registerBlockType('pmpro-goals/goal-progress', {
	title: __('PMPro Goal', 'pmpro-goals'),
	description: __('Create a progress bar to show funds raised/member signups.', 'pmpro-goals'),
	category: 'pmpro',
	icon: {
		background: '#2997c8',
		foreground: '#ffffff',
		src: 'chart-area'
	},

	attributes: {
		levels: {
			type: 'array',
			default: []
		},
		fill_color: {
			type: 'string',
			default: '#f7f7f7'
		},
		background_color: {
			type: 'string',
			default: '#ff008c'
		},
		font_color: {
			type: 'string',
			default: '#ff008c'
		},
		goal_type: {
			type: 'string',
			default: 'revenue'
		},
		before: {
			type: 'string',
			default: ''
		},
		after: {
			type: 'string',
			default: ''
		},
		goal: {
			type: 'string',
			default: 0
		}
	},

	edit: function edit(props) {
		var _props$attributes = props.attributes,
		    goal_type = _props$attributes.goal_type,
		    levels = _props$attributes.levels,
		    before = _props$attributes.before,
		    after = _props$attributes.after,
		    goal = _props$attributes.goal,
		    revenue = _props$attributes.revenue,
		    font_color = _props$attributes.font_color,
		    background_color = _props$attributes.background_color,
		    fill_color = _props$attributes.fill_color,
		    className = props.className,
		    setAttributes = props.setAttributes,
		    isSelected = props.isSelected;


		return [isSelected && wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(
				PanelBody,
				null,
				wp.element.createElement(SelectControl, {
					label: 'Select the type of goal.',
					options: goal_types,
					value: goal_type,
					onChange: function onChange(goal_type) {
						setAttributes({ goal_type: goal_type });
					}
				}),
				wp.element.createElement(SelectControl, {
					multiple: true,
					label: 'Select the level(s) you would like to track.',
					options: all_levels,
					value: levels,
					onChange: function onChange(levels) {
						setAttributes({ levels: levels });
					},
					help: 'Hold shift down to select multiple levels.'
				}),
				wp.element.createElement(TextControl, {
					id: 'pmpro-goals-before',
					label: 'Text Before',
					help: 'This will show text before total and goal amount. Ideal to show currency.',
					value: before,
					onChange: function onChange(before) {
						setAttributes({ before: before });
					}
				}),
				wp.element.createElement(TextControl, {
					id: 'pmpro-goals-after',
					label: 'Text After',
					help: 'This will show text at the end of the bar.',
					value: after,
					onChange: function onChange(after) {
						setAttributes({ after: after });
					}
				}),
				wp.element.createElement(TextControl, {
					id: 'pmpro-goals-goal',
					label: 'Goal Amount',
					help: 'Enter your desired goal amount.',
					value: goal,
					onChange: function onChange(goal) {
						setAttributes({ goal: goal });
					}
				}),
				__('Font Color', 'pmpro-goals'),
				wp.element.createElement(ColorPalette, {
					colors: default_colors,
					value: font_color,
					onChange: function onChange(font_color) {
						setAttributes({ font_color: font_color });
					}
				}),
				__('Background Color', 'pmpro-goals'),
				wp.element.createElement(ColorPalette, {
					colors: default_colors,
					value: background_color,
					onChange: function onChange(background_color) {
						setAttributes({ background_color: background_color });
					}
				}),
				__('Fill Color', 'pmpro-goals'),
				wp.element.createElement(ColorPalette, {
					colors: default_colors,
					value: fill_color,
					onChange: function onChange(fill_color) {
						setAttributes({ fill_color: fill_color });
					}
				})
			)
		), wp.element.createElement(
			'div',
			{ className: className },
			wp.element.createElement(
				'h2',
				null,
				'PMPro Goal'
			),
			wp.element.createElement(
				'div',
				{ className: 'pmpro-goals-container', style: { backgroundColor: background_color, color: font_color, padding: '5px' } },
				wp.element.createElement(
					'div',
					{ style: { backgroundColor: fill_color, padding: '10px', 'width': '75%' } },
					before,
					'X / ',
					before,
					goal,
					' ',
					after
				)
			)
		)];
	},

	save: function save(props) {
		return null;
	}
});

/***/ })
/******/ ]);