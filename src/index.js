import React from 'react';
import Select from 'react-select';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	ColorPalette,
	DateTimePicker,
	ToggleControl,
} = wp.components;

const {
	InspectorControls
} = wp.editor;


const all_levels = pmpro.all_level_values_and_labels;

const goal_types = [
	{ value: 'revenue', label: __('Revenue', 'pmpro-goals') },
	{ value: 'members', label: __('Members', 'pmpro-goals') },
	{ value: 'sales', label: __('Sales', 'pmpro-goals') }
];

const default_colors = [
	{ color: "#FFFFFF", name: 'white' },
	{ color: "#77A02E", name: 'green' },
	{ color: "#BBBBBB", name: 'grey' }
];

export default registerBlockType(
	'pmpro-goals/goal-progress',
	{
		title: __('Goal Progress Bar', 'pmpro-goals'),
		description: __('Create a progress bar to show funds raised/member signups.', 'pmpro-goals'),
		category: 'pmpro',
		icon: {
			background: '#2997C8',
			foreground: '#FFFFFF',
			src: 'chart-area'
		},
		keywords: [
			__('pmpro', 'pmpro-goals'),
			__('goals', 'pmpro-goals'),
			__('membership tracking', 'pmpro-goals')
		],
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

		edit: props => {

			const { attributes: { goal_type, levels, before, after, goal, revenue, font_color, background_color, fill_color, start_date, end_date, use_dates }, className, setAttributes, isSelected } = props;

			return [
				/**	
				 * Inline Settings for PMPro Goals.
				 */
				isSelected && <div className={className} >
					<p><strong>{__('Goal Progress Bar Settings', 'pmpro-goals')}</strong> <span style={{ fontSize: '12px' }}></span></p>
					<PanelBody>
						<SelectControl
							label={__('Type of Goal', 'pmpro-goals')}
							options={goal_types}
							value={goal_type}
							onChange={goal_type => { setAttributes({ goal_type }) }}
						/>
						<PanelRow className="select2-multi-row">
							<label for="levels" class="components-truncate components-text components-input-control__label em5sgkm4 css-1imalal e19lxcc00">
								{__('Levels to Track', 'pmpro-goals')}
							</label>
							<Select
								classNamePrefix='filter'
								value={levels}
								onChange={levels => { setAttributes({ levels }) }}
								options={all_levels}
								isMulti='true'
								name='levels'
								id='levels'
								className='components-text-control__input'
							/>
						</PanelRow>

						<TextControl
							id="pmpro-goals-goal"
							label={__('Goal Amount', 'pmpro-goals')}
							value={goal}
							onChange={goal => { setAttributes({ goal }) }}
						/>
					</PanelBody>
				</div>,
				isSelected && <InspectorControls>
					<PanelBody
						title={__('Settings', 'pmpro-goals')}
					>
						<SelectControl
							label={__('Type of Goal', 'pmpro-goals')}
							options={goal_types}
							value={goal_type}
							onChange={goal_type => { setAttributes({ goal_type }) }}
						/>
						<PanelRow className="select2-multi-row">
							<label for="levels" class="components-truncate components-text components-input-control__label em5sgkm4 css-1imalal e19lxcc00">
								{__('Levels to Track', 'pmpro-goals')}
							</label>
							<Select
								classNamePrefix='filter'
								value={levels}
								onChange={levels => { setAttributes({ levels }) }}
								options={all_levels}
								isMulti='true'
								name='levels'
								id='levels'
								className='components-text-control__input'
							/>
						</PanelRow>

						<TextControl
							id="pmpro-goals-goal"
							label={__('Goal Amount', 'pmpro-goals')}
							value={goal}
							onChange={goal => { setAttributes({ goal }) }}
						/>

						<TextControl
							id="pmpro-goals-before"
							label={__('Text Before', 'pmpro-goals')}
							value={before}
							onChange={before => { setAttributes({ before }) }}
						/>

						<TextControl
							id="pmpro-goals-after"
							label={__('Text After', 'pmpro-goals')}
							value={after}
							onChange={after => { setAttributes({ after }) }}
						/>
						<div className='datepicker-checkbox'>
							<label for="pmpro-goals-use-dates" className='components-base-control__label css-1v57ksj'>{__('Filter by Date', 'pmpro-goals')}</label>
							<ToggleControl
								id="pmpro-goals-use-dates"
								label={__('Select this if you want to filter results between two dates.', 'pmpro-goals')}
								checked={use_dates}
								onChange={use_dates => { setAttributes({ use_dates }) }}
							/>
						</div>

						<div className={!use_dates ? "hidden datepicker-component-wrapper" : "datepicker-component-wrapper"}>
							<div className={"datepicker-component-startdate"}>
								<label className='components-base-control__label css-1v57ksj' for="pmpro-goals-start-date">{__('Start Date', 'pmpro-goals')}</label>
								<DateTimePicker
									currentDate={start_date}
									onChange={start_date => { setAttributes({ start_date }) }}
									is12Hour={false}
									id="pmpro-goals-start-date"
								/>
							</div>
							<div className={"datepicker-component-enddate"}>
								<label className='components-base-control__label css-1v57ksj' for="pmpro-goals-end-date">{__('End Date', 'pmpro-goals')}</label>
								<DateTimePicker
									currentDate={end_date}
									onChange={end_date => { setAttributes({ end_date }) }}
									is12Hour={false}
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>,
				<InspectorControls>
					<PanelBody title={__('Styles', 'pmpro-goals')}>
						<label className='components-base-control__label css-1v57ksj' for="pmpro-goals-font-color">{__('Font Color', 'pmpro-goals')}</label>
						<ColorPalette
							colors={default_colors}
							value={font_color}
							onChange={font_color => { setAttributes({ font_color }) }}
							id="pmpro-goals-font-color"
						/>

						<label className='components-base-control__label css-1v57ksj' for="pmpro-goals-fill-color">{__('Fill Color', 'pmpro-goals')}</label>

						<ColorPalette
							colors={default_colors}
							value={fill_color}
							onChange={fill_color => { setAttributes({ fill_color }) }}
							id="pmpro-goals-fill-color"
						/>

						<label className='components-base-control__label css-1v57ksj' for="pmpro-goals-background-color">{__('Background Color', 'pmpro-goals')}</label>
						<ColorPalette
							colors={default_colors}
							value={background_color}
							onChange={background_color => { setAttributes({ background_color }) }}
							id="pmpro-goals-background-color"
						/>
					</PanelBody>
				</InspectorControls>,
				<div className={className}>
					<div className="pmpro-goals-container" style={{ backgroundColor: background_color, color: font_color, padding: '5px', borderRadius: '5px' }}>
						<div style={{ backgroundColor: fill_color, padding: '10px', 'width': '50%' }}>{before} {goal * .5} / {goal} {after}</div>
					</div>
					<small><em>{__('This is a preview of your goal and does not reflect actual data.', 'pmpro-goals')}</em></small>
				</div>
			];
		},

		save: props => {
			return null;
		}
	}
);