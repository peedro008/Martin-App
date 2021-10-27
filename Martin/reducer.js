import { 
  ADD_PRODUCT, 
  USER_ROLE, 
  DELETE_PRODUCT,
  USER,POST_ORDER, POST_DELETE, USER_ID
   } from './actions'

const initialState = {
  UserRole: null,
  PreOrder:[],
  TotalPrice:0,
  User:null,
  UserId:null

}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_ROLE:// booleano para identificar al user al hacer el login si es admin o cliente
      return{
        ...state,
        UserRole: action.payload
      }
      case USER:
        return{
          ...state,
          User: [action.payload]
        }
        case USER_ID:
          return{
            ...state,
            UserId: action.payload
          }

      case ADD_PRODUCT:
    
        return{
          ...state,
          PreOrder: [...state.PreOrder,action.payload],
          TotalPrice: state.TotalPrice + action.payload.total
        }
       
        case DELETE_PRODUCT:
          let filter= state.PreOrder.filter(el=> el.id !== action.payload)
          let deleted= state.PreOrder.find(el=> el.id == action.payload)
          return{
            ...state,
            PreOrder: filter,
            TotalPrice: state.TotalPrice - deleted.total
          }
        case POST_DELETE:
          return{
            ...state, 
            PreOrder: [],
            TotalPrice:0
          }
       
      
       
                
     default: return state  
  }
}