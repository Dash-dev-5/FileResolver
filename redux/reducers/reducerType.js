import {TOGGLE_TYPE} from '../constantes'

const initialstate = 'receive'
const reducerType = ( state = initialstate, action ) =>{
    switch (action.type) {
        case TOGGLE_TYPE:
            return action.playload
        default:
            return state            
    }
}
export default reducerType