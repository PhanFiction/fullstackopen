const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let newGood = {
        ...state,
        good: state["good"] + 1
      }
      return newGood
    case 'OK':
      let newOk = {
        ...state,
        ok: state["ok"] + 1
      }
      return newOk
    case 'BAD': 
      let newBad= {
        ...state,
        bad: state.bad + 1
      }
      return newBad
    case 'ZERO':
      return state
    default: return {good: 0, ok: 0, bad: 0}
  }
  
}

export default counterReducer