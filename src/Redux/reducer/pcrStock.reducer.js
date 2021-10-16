/* eslint-disable default-case */
/* eslint-disable no-unreachable */
import {FETCH_SUCCESS,FETCH_FAILURE,FETCH_REQUEST} from '../actionType/pcrstocks.type';

const initialState = {
  response : {},
  responsestocks:{}
}

const PcrReducer = (state = initialState , action) =>{
  switch(action.type){
    case FETCH_SUCCESS:
      switch(action.action){
        case 'fetch':
          return{
            ...state,
            response : action.payload
          }
        break;
        case 'fetchstocks':
          return{
            ...state,
            responsestocks : action.payload
          }
        break;
      }
     
    break;
    default:
      return{
        ...state
      }
    break;
  }
}

export default PcrReducer;