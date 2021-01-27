
//takes in specific state, and json object states of abbreviations
export default function stateInverter(state,states){
    return state.length===2?states[state]:Object.keys(states).find(key=>states[key]===state)
   }