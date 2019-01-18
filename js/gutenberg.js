const { __, setLocaleData } = wp.i18n;

const{
	registerBlockType,
	BlockControls
} = wp.blocks;

const {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	RangeControl,
	ColorPalette,
} = wp.components;

const {
	RichText,
	InspectorControls
} = wp.editor;

const all_levels = pmpro.all_level_values_and_labels;

const goal_types = [
	{ value: 'revenue', label: 'Revenue' },
	{ value: 'members', label: 'Members' }
];

const default_colors = [
	{ color: "#ff7675", name: 'red' },
	{ color: "#55efc4", name: 'green' },
	{ color: "#74b9ff", name: 'blue' }
];

registerBlockType(
	'pmpro-goals/goal-progress',
	{
		title: __( 'PMPro Goal', 'pmpro-goals' ),
		description: __( 'Create a progress bar to show funds raised/member signups.', 'pmpro-goals'),
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

		edit: props => {

			const { attributes: { goal_type, levels, before, after, goal, revenue, font_color, background_color, fill_color }, className, setAttributes, isSelected } = props;

			return[

				isSelected && <InspectorControls>
					<PanelBody>
						<SelectControl 
							label="Select the type of goal."
							options={goal_types}
							value={goal_type}
							onChange={ goal_type => { setAttributes( { goal_type } ) } }
						/>
					
						<SelectControl 
							multiple
							label="Select the level(s) you would like to track."
							options={all_levels}
							value={levels}
							onChange={ levels => { setAttributes( { levels } ) } }
							help="Hold shift down to select multiple levels."
						/>

						<TextControl
							id="pmpro-goals-before"
							label="Text Before"
							help="This will show text before total and goal amount. Ideal to show currency."
							value={ before }
							onChange={ before => { setAttributes( { before } ) } }
						/>
			
						<TextControl
							id="pmpro-goals-after"
							label="Text After"
							help="This will show text at the end of the bar."
							value={ after }
							onChange={ after => { setAttributes( { after } ) } }
						/>
		
						<TextControl
							id="pmpro-goals-goal"
							label="Goal Amount"
							help="Enter your desired goal amount."
							value={ goal }
							onChange={ goal => { setAttributes( {goal } ) } }
						/>

						{ __( 'Font Color', 'pmpro-goals' ) }
						<ColorPalette
							colors={ default_colors }
							value={ font_color }
							onChange={ font_color => { setAttributes( { font_color } ) } }
						/>

						{ __( 'Background Color', 'pmpro-goals' ) }
						<ColorPalette 
							colors={ default_colors }
							value={ background_color }
							onChange={ background_color => { setAttributes( { background_color } ) } }
						/>

						{ __( 'Fill Color', 'pmpro-goals' ) }
						<ColorPalette 
							colors={ default_colors }
							value={ fill_color }
							onChange={ fill_color => { setAttributes( { fill_color } ) } }
						/>


					</PanelBody>
				</InspectorControls>,


				<div className={ className }>
				 	<div className="pmpro-goals-container" style={ { backgroundColor: background_color, color: font_color, padding: '5px'} }>
				 		<div style={ { backgroundColor: fill_color, padding: '10px', 'width': '75%' } }>{before}X / {before}{goal} {after}</div>
				 	</div>
				</div>
			];
		},

		save: props => {
			return null;
		}
	}
);