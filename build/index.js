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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

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
    ColorPalette = _wp$components.ColorPalette,
    DateTimePicker = _wp$components.DateTimePicker,
    CheckboxControl = _wp$components.CheckboxControl;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    InspectorControls = _wp$editor.InspectorControls;
var all_levels = pmpro.all_level_values_and_labels;
var goal_types = [{
  value: 'revenue',
  label: __('Revenue', 'pmpro-goals')
}, {
  value: 'members',
  label: __('Members', 'pmpro-goals')
}];
var default_colors = [{
  color: "#FFFFFF",
  name: 'white'
}, {
  color: "#77A02E",
  name: 'green'
}, {
  color: "#BBBBBB",
  name: 'grey'
}];
/* harmony default export */ __webpack_exports__["default"] = (registerBlockType('pmpro-goals/goal-progress', {
  title: __('Goal Progress Bar', 'pmpro-goals'),
  description: __('Create a progress bar to show funds raised/member signups.', 'pmpro-goals'),
  category: 'pmpro',
  icon: {
    background: '#2997C8',
    foreground: '#FFFFFF',
    src: 'chart-area'
  },
  keywords: [__('pmpro', 'pmpro-goals'), __('goals', 'pmpro-goals'), __('membership tracking', 'pmpro-goals')],
  attributes: {
    levels: {
      type: 'array',
      default: []
    },
    fill_color: {
      type: 'string',
      default: '#77A02E'
    },
    background_color: {
      type: 'string',
      default: '#BBBBBB'
    },
    font_color: {
      type: 'string',
      default: '#FFFFFF'
    },
    goal_type: {
      type: 'string',
      default: 'revenue'
    },
    after: {
      type: 'string',
      default: ''
    },
    before: {
      type: 'string',
      default: ''
    },
    start_date: {
      type: 'string',
      default: ''
    },
    end_date: {
      type: 'string',
      default: ''
    },
    goal: {
      type: 'string',
      default: 0
    },
    use_dates: {
      type: 'boolean',
      default: false
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
        start_date = _props$attributes.start_date,
        end_date = _props$attributes.end_date,
        use_dates = _props$attributes.use_dates,
        className = props.className,
        setAttributes = props.setAttributes,
        isSelected = props.isSelected;
    return [
    /**	
     * Inline Settings for PMPro Goals.
     */
    isSelected && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: className
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("strong", null, __('Goal Progress Bar Settings', 'pmpro-goals')), " ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      style: {
        fontSize: '12px'
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(SelectControl, {
      label: __('Type of Goal', 'pmpro-goals'),
      options: goal_types,
      value: goal_type,
      onChange: function onChange(goal_type) {
        setAttributes({
          goal_type: goal_type
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(SelectControl, {
      multiple: true,
      label: __('Levels to Track', 'pmpro-goals'),
      value: levels,
      onChange: function onChange(levels) {
        setAttributes({
          levels: levels
        });
      },
      options: all_levels
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      id: "pmpro-goals-goal",
      label: __('Goal Amount', 'pmpro-goals'),
      value: goal,
      onChange: function onChange(goal) {
        setAttributes({
          goal: goal
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      id: "pmpro-goals-before",
      label: __('Text Before', 'pmpro-goals'),
      value: before,
      onChange: function onChange(before) {
        setAttributes({
          before: before
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
      id: "pmpro-goals-after",
      label: __('Text After', 'pmpro-goals'),
      value: after,
      onChange: function onChange(after) {
        setAttributes({
          after: after
        });
      }
    }), __('Filter by Date', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(CheckboxControl, {
      label: __('Select this if you want to filter results between two dates.', 'pmpro-goals'),
      checked: use_dates,
      onChange: function onChange(use_dates) {
        setAttributes({
          use_dates: use_dates
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: !use_dates ? "hidden" : ""
    }, __('Start Date', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("small", null, __('Set the start date to track statistics from this day onwards.', 'pmpro-goals')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(DateTimePicker, {
      currentDate: start_date,
      onChange: function onChange(start_date) {
        setAttributes({
          start_date: start_date
        });
      },
      is12Hour: false
    }), __('End Date', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("small", null, __('Set the end date to track statistics up until this day.')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(DateTimePicker, {
      currentDate: end_date,
      onChange: function onChange(end_date) {
        setAttributes({
          end_date: end_date
        });
      },
      is12Hour: false
    })), __('Font Color', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ColorPalette, {
      colors: default_colors,
      value: font_color,
      onChange: function onChange(font_color) {
        setAttributes({
          font_color: font_color
        });
      }
    }), __('Fill Color', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ColorPalette, {
      colors: default_colors,
      value: fill_color,
      onChange: function onChange(fill_color) {
        setAttributes({
          fill_color: fill_color
        });
      }
    }), __('Background Color', 'pmpro-goals'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ColorPalette, {
      colors: default_colors,
      value: background_color,
      onChange: function onChange(background_color) {
        setAttributes({
          background_color: background_color
        });
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: className
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "pmpro-goals-container",
      style: {
        backgroundColor: background_color,
        color: font_color,
        padding: '5px',
        borderRadius: '5px'
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      style: {
        backgroundColor: fill_color,
        padding: '10px',
        'width': '50%'
      }
    }, before, " ", goal * .5, " / ", goal, " ", after)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("small", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("em", null, __('This is a preview of your goal and does not reflect actual data.', 'pmpro-goals'))))];
  },
  save: function save(props) {
    return null;
  }
}));

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map