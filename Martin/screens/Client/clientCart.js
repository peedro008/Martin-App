import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder,postDelete} from '../../actions.js'
import axios from 'axios'
import { IP } from '../../env'
import Checkout from './stack/clientCartComponents/checkout.js'
import Cart from './stack/clientCartComponents/cart.js'

const width=Dimensions.get("window").width

export default function clientCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const [render,setRender]=useState(true)
    const dispatch= useDispatch()
    
    

    const handlePostOrder=()=>{
        axios.post(`${IP}/orderItems`,[order,user])
        .then(response=>{
          console.log(response.data)
        })
        dispatch(postDelete())
    }
    
    const handleOrderRender=()=>{
        setRender(true)
    }
    const handleCheckRender=()=>{
        setRender(false)
    }


    
    return (
        <View
        style={{flex:1, backgroundColor: "white"}}>
          <View style={{display:/*order.length<1 && "none"*/"flex"}}>
            <View style={{alignSelf:"center", alignItems:"center",height:width*0.1, width:width*0.3,  marginTop:30, marginBottom:20}}>
                <Text style={styles.cart}>Cart</Text>
            </View> 
            <View style={{flexDirection:"row",alignSelf:"center", width:width*0.4 }}>
                <TouchableOpacity onPress={()=>handleOrderRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render?5:0,borderBottomColor:"#6979F8"}]}>
                    <Text style={{ color:!render ? "gray" : "#6979F8",fontWeight:"400",}}>CART</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:5, borderBottomColor:"#6979F8"}]}>
                    <Text  style={{ color:render ? "gray" : "#6979F8",fontWeight:"400"}}>CHECKOUT</Text>
                </View>
                </TouchableOpacity>
            </View>

         </View>
         
          
           { 
           render ?  <Cart order={order}/>
                  :  <Checkout order={order}/>
                    
            }

            {order.length>0 ? (
            <View style={styles.contTotalOrder}>
                <Text style={styles.totalOrder}>
                    Total order: ${totalPrice.toFixed(2)}  
                </Text>
            <View style={styles.buttonOrder}>
                <TouchableOpacity onPress={()=>handlePostOrder()}> 
                  <Text style={{color:"#FFFFFF",alignSelf:"center",fontSize:width*0.05}}>Place order</Text>
                 </TouchableOpacity> 
            </View> 
            </View>)
             :
             <View style={{marginTop:Dimensions.get("screen").width*0.50, justifyContent:"center", alignItems:"center", position:"absolute", top:50, left:Dimensions.get("screen").width*0.25}}>
                <Icon name="shopping-cart" color="gray" size={Dimensions.get("screen").width/2}/>
             </View>
            }
           
           
        </View>
        )
}

const styles = StyleSheet.create({
  
  cart:{
    marginTop:5,
    fontSize: width*0.07,
    fontWeight: "bold",
  },
  renderButton:{
    alignItems:"center",
    width:(width*0.4)/2,
    fontSize:width*0.06,
    
  },
  contTotalOrder:{
    marginTop:15,
    backgroundColor:"beige"
  },
  totalOrder:{
    color:"#151522",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf:"center"
  //  lineheight: 20,

  },
  buttonOrder:{
       width:width,
      height:width*0.11,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:5,
      backgroundColor:"#F15A4D"

  }
})