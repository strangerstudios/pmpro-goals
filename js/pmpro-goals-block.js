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
	{ color: "#fff", name: 'white' },
	{ color: "#77A02E", name: 'green' },
	{ color: "#2497C8", name: 'blue' }
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
				default: '#77A02E'
			},
			background_color: {
				type: 'string',
				default: '#2497C8'
			},
			font_color: {
				type: 'string',
				default: '#FFF'
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
							help="Hold shift/control down to select multiple levels."
						/>

						<TextControl
							id="pmpro-goals-before"
							label="Text Before"
							help="This will show text before the calculation."
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

				/**	
				 * Inline Settings for PMPro Goals.
				 * This is only to show the main settings for PMPro Goals.
				 */
				 isSelected && <div className={ className } >
                  <p><strong>PMPro Goal Settings</strong> <span style={ { fontSize: '12px' } }><em>Please use the Block Settings widget for additional settings.</em></span></p>
                  <PanelBody>
                  	<SelectControl 
						label="Select the type of goal."
						options={goal_types}
						value={goal_type}
						onChange={ goal_type => { setAttributes( { goal_type } ) } }
					/>

                    <SelectControl
                    	multiple
                    	label={ __( 'Select the level(s) you would like to track.' ) }
                    	value={ levels }
                    	onChange={ levels => { setAttributes( { levels } ) } }
                    	options={ all_levels }
                  	/>

                    <TextControl
						id="pmpro-goals-goal"
						label="Goal Amount"
						value={ goal }
						onChange={ goal => { setAttributes( {goal } ) } }
					/>

					<TextControl
						id="pmpro-goals-after"
						label="Text After"
						value={ after }
						onChange={ after => { setAttributes( { after } ) } }
					/>

					<TextControl
						id="pmpro-goals-before"
						label="Text Before"
						value={ before }
						onChange={ before => { setAttributes( { before } ) } }
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
				 		<div style={ { backgroundColor: fill_color, padding: '10px', 'width': '75%' } }>{before} X / {goal} {after}</div>
				 	</div>
				</div>
			];
		},

		save: props => {
			return null;
		}
	}
);