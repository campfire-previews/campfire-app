FUNCTION STATE_GENERATOR(PROPS: STRINGS) 


FUNCTION REDUCER(STATE, ACTION) 
	SWITCH(ACTION.TYPE)
		CASE "DISPLAY_MODAL"
			RETURN {
				...STATE
				isVisible: true
			}
		CASE "HIDE_MODAL"
			RETURN {
				...STATE
				isVisible: false
			}
	

FUNCTION FEEDBACK_INTERFACE
	CONST [ CONVO_STATE, CONVO_DISPATCH ] = useReducer(REDUCER, INTIAL_STATE)
	CONST [ SCREENSHOT_STATE, SCREENSHOT_DISPATCH ] = useReducer(REDUCER, INTIAL_STATE)
	CONST [ RECORDING_STATE, RECORDING_DISPATCH ] = useReducer(REDUCER, INTIAL_STATE)

	

	RETURN 
		<SPEED_DIAL />
		
		{ convo_state.isVisible? < CONVO_MODAL convo_state.comments /> : NULL }
		{ screenshot_state.isVisible? < SCREENSHOT_MODAL /> : NULL }
		{ recording_state.isVisible? < RECORDING_MODAL /> : NULL }



CONVO_BUTTON
	FUNCTION ON_CLICK
		DISPATCH({type: 'display_modal'})

SCREENSHOT_MODAL
RECORDING_MODAL



CONVO_STATE
{
  isVisible: false
  comments: []
}


SCREENSHOT_STATE
{
  isVisible: false
}

RECORDING_STATE
{
  isVisible: false
}



CHANGES MADE TO APP.JSX
========================
- Adding Speed-dial component
- Extracted all component to compeonents dir
- Created Utils for filtering comments

