import axios from "axios"
import { IP }from "./env"

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const USER_ROLE = 'USER_ROLE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const PLUS_QUANTITY = 'PLUS_QUANTITY'
export const LESS_QUANTITY = 'LESS_QUANTITY'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const USER = "USER"
export const POST_ORDER = 'POST_ORDER'
export const GET_SALES = 'GET_SALES'
export const EDIT_PRICE = 'EDIT_PRICE'



// LOGIN ACTION

export function userRole(role){ 
  return{
    type: USER_ROLE,
    payload: role
  } 
}
// CLIENT ACTIONS

export function addOrder(orderProduct){
  return{
    type: ADD_PRODUCT,
    payload: orderProduct
  }
}
export function plusQuantity(){
  return{
    type: PLUS_QUANTITY,
  }
}
export function lessQuantity(){
  return{
    type: LESS_QUANTITY,
  }
}

export function deleteProduct(id){
  return{
    type: DELETE_PRODUCT,
    payload: id
  }
}
export function User(user){
  return{
    type: USER,
    payload: user
  }
}

export function postOrder(order,user){
  return (dispatch)=>{
      axios.post(`${IP}/orderItems`,[order,user])
      .then(response=>{
        console.log(response.data)
          dispatch({
            type:POST_ORDER,
            payload: response.data
          })
      })
  }
}

// ADMIN ACTIONS

export function updateProduct(price,id){
  return (dispatch)=>{
    axios.put(`${IP}/updateproductprice`,{price,id})
    .then(response=>{
      console.log(response.data)
        dispatch({
          type:EDIT_PRICE,
          payload: response.data
        })
    })
}
}









