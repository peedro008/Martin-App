import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions, ScrollView} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder,postDelete} from '../../actions.js'
import axios from 'axios'
import { IP } from '../../env'
import Checkout from './stack/clientCartComponents/checkout.js'
import Cart from './stack/clientCartComponents/cart.js'
import { Input } from "react-native-elements";

const width=Dimensions.get("window").width

export default function clientCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const id= useSelector(state=> state.UserId)
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const [render,setRender]=useState(true)
    const dispatch= useDispatch()
    const [fullName, setFullName]= useState("")
    const [address, setAddress]= useState("")
    const [apt_Suite_, setApt_Suite_]= useState("")
    const [postalCode, setPostalCode]= useState("")
    const [phone, setPhone]= useState("")
    const [city, setStateCity]= useState("")
    

















    const handlePostOrder=()=>{
        axios.post(`${IP}/orderItems`,[order,user,fullName,address,apt_Suite_,postalCode,phone,city])
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
            <View style={{alignSelf:"center", alignItems:"center",height:width*0.1, width:width*0.3,  marginTop:width*0.08, marginBottom:width*0.053}}>
                <Text style={styles.cart}>Cart</Text>
            </View> 
            <View style={{flexDirection:"row",alignSelf:"center", width:width*0.4 }}>
                <TouchableOpacity onPress={()=>handleOrderRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render?5:0,borderBottomColor:"#6979F8"}]}>
                    <Text style={{ color:!render ? "#999999" : "#6979F8",fontWeight:"400",}}>CART</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:5, borderBottomColor:"#6979F8"}]}>
                    <Text  style={{ color:render ? "#999999" : "#6979F8",fontWeight:"400"}}>CHECKOUT</Text>
                </View>
                </TouchableOpacity>
            </View>

         </View>
         
          
           { 
           render ?  <Cart order={order}/>
                  :  <ScrollView style={{flex:1, }}>
                  
                      <View>
                      <View style={styles.container}>
                          <Text style={styles.text}>Full Name</Text>
                          <Input  leftIcon={{type:"font-awesome", name:"user"}} onChangeText={setFullName}/>
                      </View>
                      <View style={styles.container}> 
                          <Text style={styles.text}>Street Address</Text>
                          <Input leftIcon={{type:"font-awesome", name:"map-pin"}} onChangeText={setAddress}/>
                      </View>
                      <View style={styles.container}> 
                          <Text style={styles.text}>Apt / Suite / Other</Text>
                          <Input leftIcon={{type:"font-awesome", name:"home"}} onChangeText={setApt_Suite_}/>
                      </View>
                      <View style={styles.container}> 
                          <Text style={styles.text}>State / City</Text>
                          <Input leftIcon={{type:"font-awesome", name:"building"}}onChangeText={setStateCity}/>
                      </View>
                      <View style={styles.container}> 
                          <Text style={styles.text}>Postal Code</Text>
                          <Input leftIcon={{type:"font-awesome", name:"clipboard"}}onChangeText={setPostalCode}/>
                      </View>
                      <View style={styles.container}> 
                          <Text style={styles.text}>Phone</Text>
                          <Input leftIcon={{type:"font-awesome", name:"phone"}}onChangeText={setPhone}/>
                      </View>
                      </View>
          
                      
                  </ScrollView>
                    
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
    fontWeight: "600",
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
      height:width*0.12,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:5,
      backgroundColor:"#F15A4D"

  },
  container:{
    width:width-50,
    flex:1,
    alignSelf:"center"
},
text:{
   
    fontWeight:"600",
    fontSize:width*0.04,
    textAlign:"justify"
},
})