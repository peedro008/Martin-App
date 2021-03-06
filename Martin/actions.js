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
export const USER_ID = "USER_ID"
export const POST_DELETE = "POST_DELETE"
export const LOG_OUT = "LOG_OUT"



// LOGIN ACTION

export function userRole(role){ 
  return{
    type: USER_ROLE,
    payload: role
  } 
}
export function userId(id){ 
  return{
    type: USER_ID,
    payload: id
  } 
}
export function logOut(){ 
  return{
    type: LOG_OUT,
  } 
}
// CLIENT ACTIONS

export function addOrder(orderProduct){
  return{
    type: ADD_PRODUCT,
    payload: orderProduct
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

export function postDelete(){
  return {
     type: POST_DELETE
  }    
}

// ADMIN ACTIONS

export function updateProduct(price,id,salePercent,sale, name,description,categoryID){
  return (dispatch)=>{
    axios.put(`${IP}/updateProduct`,{price,id,salePercent,sale, name,description,categoryID})
    .then(response=>{
      console.log(response.data)
        dispatch({
          type:EDIT_PRICE,
          payload: response.data
        })
    })
}
}
export function createProduct(categoryID,price,description, name,sale,salePercent){
  return (dispatch)=>{
    axios.post(`${IP}/createProduct`,{categoryID,price,description, name,sale,salePercent})
    .then(response=>{
      console.log(response.data)
        dispatch({
          type:EDIT_PRICE,
          payload: response.data
        })
    })
}
}









