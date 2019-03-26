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
	ColorPalette,
	DateTimePicker
} = wp.components;

const {
	RichText,
	InspectorControls
} = wp.editor;

const all_levels = pmpro.all_level_values_and_labels;

const goal_types = [
	{ value: 'revenue', label: __( 'Revenue', 'pmpro-goals' ) },
	{ value: 'members', label: __( 'Members', 'pmpro-goals' ) }
];

const default_colors = [
	{ color: "#FFFFFF", name: 'white' },
	{ color: "#77A02E", name: 'green' },
	{ color: "#BBBBBB", name: 'grey' }
];

export default registerBlockType(
	'pmpro-goals/goal-progress',
	{
		title: __( 'Goal Progress Bar', 'pmpro-goals' ),
		description: __( 'Create a progress bar to show funds raised/member signups.', 'pmpro-goals'),
		category: 'pmpro',
		icon: {
			background: '#2997C8',
			foreground: '#FFFFFF',
			src: 'chart-area'
		},

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
			}
		},

		edit: props => {

			const { attributes: { goal_type, levels, before, after, goal, revenue, font_color, background_color, fill_color, start_date, end_date }, className, setAttributes, isSelected } = props;

			return[
				/**	
				 * Inline Settings for PMPro Goals.
				 */
				 isSelected && <div className={ className } >
                  <p><strong>{ __( 'Goal Progress Bar Settings', 'pmpro-goals' ) }</strong> <span style={ { fontSize: '12px' } }></span></p>
                  <PanelBody>
                  	<SelectControl 
						label={ __( 'Type of Goal', 'pmpro-goals' ) }
						options={goal_types}
						value={goal_type}
						onChange={ goal_type => { setAttributes( { goal_type } ) } }
					/>

                    <SelectControl
                    	multiple
                    	label={ __( 'Levels to Track' ) }
                    	value={ levels }
                    	onChange={ levels => { setAttributes( { levels } ) } }
                    	options={ all_levels }
                  	/>

                    <TextControl
						id="pmpro-goals-goal"
						label={ __( 'Goal Amount', 'pmpro-goals' ) }
						value={ goal }
						onChange={ goal => { setAttributes( {  goal } ) } }
					/>

					<TextControl
						id="pmpro-goals-before"
						label={ __( 'Text Before', 'pmpro-goals' ) }
						value={ before }
						onChange={ before => { setAttributes( { before } ) } }
					/>

					<TextControl
						id="pmpro-goals-after"
						label={ __( 'Text After', 'pmpro-goals' ) }
						value={ after }
						onChange={ after => { setAttributes( { after } ) } }
					/>

					{ __( 'Start Date', 'pmpro-goals' ) }
					<br/><small>{ __( 'Set the start date to track statistics from this day onwards.' ) }</small>
					<DateTimePicker
						currentDate={ start_date }
						onChange={ start_date => { setAttributes( { start_date } ) } }
						is12Hour={ false }
					/>

					{ __( 'End Date', 'pmpro-goals' ) }
					<br/><small>{ __( 'Set the end date to track statistics up until this day.' ) }</small>
					<DateTimePicker
						currentDate={ end_date }
						onChange={ end_date => { setAttributes( { end_date } ) } }
						is12Hour={ false }
					/>

					{ __( 'Font Color', 'pmpro-goals' ) }
					<ColorPalette
						colors={ default_colors }
						value={ font_color }
						onChange={ font_color => { setAttributes( { font_color } ) } }
					/>

					{ __( 'Fill Color', 'pmpro-goals' ) }
					<ColorPalette
						colors={ default_colors }
						value={ fill_color }
						onChange={ fill_color => { setAttributes( { fill_color } ) } }
					/>

					{ __( 'Background Color', 'pmpro-goals' ) }
					<ColorPalette 
						colors={ default_colors }
						value={ background_color }
						onChange={ background_color => { setAttributes( { background_color } ) } }
					/>

                </PanelBody>
                </div>,


				<div className={ className }>
				 	<div className="pmpro-goals-container" style={ { backgroundColor: background_color, color: font_color, padding: '5px', borderRadius: '5px' } }>
				 		<div style={ { backgroundColor: fill_color, padding: '10px', 'width': '50%' } }>{before} {goal * .5} / {goal} {after}</div>
				 	</div>
				 	<small><em>{ __( 'This is a preview of your goal and does not reflect actual data.', 'pmpro-goals' ) }</em></small>
				</div>
			];
		},

		save: props => {
			return null;
		}
	}
);