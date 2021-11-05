import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions, ScrollView} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder,postDelete} from '../../../actions'
import axios from 'axios'
import { IP } from '../../../env'
import Cart from './clientCartComponents/cart'
import { Input } from "react-native-elements";

const width=Dimensions.get("window").width

export default function clienCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const userId= useSelector(state=> state.UserId)
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const [render,setRender]=useState(true)
    const dispatch= useDispatch()
    const [info, setInfo]= useState({fullName:"", city:"", phone:"", postalCode:"", apt_Suite:"",address:""})



    useEffect(()=>{
        axios.get(`${IP}/userinfo?userId=${userId}`)
        .then(res=>{ 
            if(res.data.default){
                setInfo({
                    fullName:res.data.fullName,
                    address:res.data.address,
                    apt_Suite:res.data.apt_Suite,
                    postalCode:res.data.postalCode,
                    city:res.data.city,
                    phone:res.data.phone,
                })
            }
         console.log(res.data)}
        )
    },[])



    const handlePostOrder=()=>{
        axios.post(`${IP}/orderItems`,[order,user, info])
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
                 <View style={[styles.renderButton,{borderBottomWidth:render?width*0.015:0,borderBottomColor:"#6979F8"}]}>
                    <Text style={{fontSize:width*0.035, color:!render ? "#999999" : "#6979F8",fontWeight:"400",fontFamily:"OpenSans-Regular"}}>CART</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:width*0.015, borderBottomColor:"#6979F8"}]}>
                    <Text  style={{fontSize:width*0.035, color:render ? "#999999" : "#6979F8",fontWeight:"400",fontFamily:"OpenSans-Regular"}}>CHECKOUT</Text>
                </View>
                </TouchableOpacity>
            </View>

         </View>
         
          
           { 
           render ?  <Cart order={order}/>
                  :   order.length>0 && <ScrollView style={{flex:1, }}>
                        
                        <View>
                            <View style={styles.container}>
                                <Text style={styles.text}>Full Name</Text>
                                <Input style={{textTransform:"capitalize"}} value={info.fullName}  leftIcon={{type:"font-awesome", name:"user"}} name= "fullName" onChangeText={value=>setInfo({...info,fullName:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Street Address</Text>
                                <Input style={{textTransform:"capitalize"}} value={info.address} leftIcon={{type:"font-awesome", name:"map-pin"}} onChangeText={value=>setInfo({...info,address:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Apt / Suite / Other</Text>
                                <Input style={{textTransform:"capitalize"}} value={info.apt_Suite} leftIcon={{type:"font-awesome", name:"home"}} onChangeText={value=>setInfo({...info,apt_Suite:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>State / City</Text>
                                <Input style={{textTransform:"capitalize"}} value={info.city} leftIcon={{type:"font-awesome", name:"building"}} onChangeText={value=>setInfo({...info,city:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Postal Code</Text>
                                <Input style={{textTransform:"capitalize"}} value={ info.postalCode} leftIcon={{type:"font-awesome", name:"clipboard"}} onChangeText={value=>setInfo({...info,postalCode:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Phone</Text>
                                <Input style={{textTransform:"capitalize"}} value={ info.phone} leftIcon={{type:"font-awesome", name:"phone"}} onChangeText={value=>setInfo({...info,phone:value})}/>
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
                  <Text style={{color:"#FFFFFF",alignSelf:"center",fontSize:width*0.05,fontFamily:"OpenSans-Regular"}}>Place order</Text>
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
    marginTop:width*0.02,
    fontSize: width*0.07,
    fontWeight: "600",
    fontFamily:"OpenSans-Regular"
  },
  renderButton:{
    alignItems:"center",
    width:(width*0.4)/2,
    fontSize:width*0.06,
    fontFamily:"OpenSans-Regular"
    
  },
  contTotalOrder:{
    
    backgroundColor:"beige"
  },
  totalOrder:{
    color:"#151522",
    fontStyle: "normal",
    
    fontSize: width*0.0385,
    alignSelf:"center",
    fontFamily:"OpenSans-Bold"
    
  //  lineheight: 20,

  },
  buttonOrder:{
       width:width,
      height:width*0.12,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:5,
      backgroundColor:"#F15A4D",
      fontFamily:"OpenSans-Regular"

  },
  container:{
    width:width-50,
    flex:1,
    alignSelf:"center"
},
text:{
   
    fontWeight:"600",
    fontSize:width*0.04,
    textAlign:"justify",
    fontFamily:"OpenSans-Regular"
},
})