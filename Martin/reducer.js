import { 
  ADD_PRODUCT, 
  USER_ROLE, 
  LESS_QUANTITY,
  PLUS_QUANTITY,
  DELETE_PRODUCT,
  USER,POST_ORDER,
   } from './actions'

const initialState = {
  UserRole: null,
  PreOrder:[],
  User:null,

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


      case ADD_PRODUCT:
        return{
          ...state,
          PreOrder: [...state.PreOrder, action.payload]
        }
        case LESS_QUANTITY:  // resto cantidad del producto en el carrito de compras

          let less= state.PreOrder.map(el=> 
            el={
              name:el.name,
              id:el.id,
              price:el.price,
              img:el.img,
              total:el.total - el.price,
              quantity: el.quantity -1
            })
          console.log(less)
          return{
            ...state,
            PreOrder: less
          }
        case PLUS_QUANTITY:  // sumo cantidad del producto en el carrito de compras
          let plus= state.PreOrder.map(el=> 
            el={
            name:el.name,
            id:el.id,
            price:el.price,
            img:el.img,
            total:el.total + el.price,
            quantity:el.quantity + 1})
          return{
            ...state,
            PreOrder: plus
          }
        case DELETE_PRODUCT:
          let deleted= state.PreOrder.filter(el=> el.id !== action.payload)
          return{
            ...state,
            PreOrder: deleted
          }
          case POST_ORDER:
            return{
              ...state,
              PreOrder:[]
            }
         
     default: return state  
  }
}