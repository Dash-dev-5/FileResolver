import {TOGGLE_TYPE} from '../constantes'

export const actionChangeType = (type) => {
   return (dispatch) => {
        return  dispatch({
                        type :TOGGLE_TYPE,
                        playload :type 
                    })
                
   }
}