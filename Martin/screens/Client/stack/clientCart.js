import React, { useEffect, useState,  Suspense } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions, ScrollView} from 'react-native'
import { Divider, Icon } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder,postDelete} from '../../../actions'
import axios from 'axios'
import { IP } from '../../../env'
import Cart from './clientCartComponents/cart'

import { Input, } from "react-native-elements";
import Loading from './clientCartComponents/loading'

const width=Dimensions.get("window").width

export default function clienCart({navigation}) {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const userId= useSelector(state=> state.UserId)
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const [render,setRender]=useState(true)
    const dispatch= useDispatch()
    const [info, setInfo]= useState({fullName:"", city:"", phone:"", postalCode:"", apt_Suite:"",address:""})
    const [loading, setLoading]=useState(true)
    const [orderId, setOrderId]=useState(true)


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

  

    const  handlePostOrder=()=>{
        
        if(info.fullName||info.address||info.postalCode||info.city||info.phone)
        {
            setLoading(false)
            axios.post(`${IP}/orderItems`,[order,user, info])
            .then(response=>{
            console.log(response.data)
            })
           
            .then(()=>navigation.navigate("Check"))
            
            dispatch(postDelete())}
        else{
            setRender(false)
        }
        
        
    }
    
    const handleOrderRender=()=>{
        setRender(true)
    }
    const handleCheckRender=()=>{
        setRender(false)
    }


    
    return (
        <View style={{flex:1, backgroundColor: "white"}}>{ loading?

        <View style={{flex:1, backgroundColor: "#FFF"}}
        >

            
          <View style={{display:/*order.length<1 && "none"*/"flex"}}>
            <View style={{marginTop:width*0.13, marginBottom:width*0.05}}>
                <Text style={styles.cart}>Cart</Text>
                
            </View> 
            <Divider style={{marginBottom:width*0.04}}/>
            <View style={{flexDirection:"row",alignSelf:"center", width:width*0.4,marginVertical:width*0.02, }}>
                <TouchableOpacity onPress={()=>handleOrderRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render?width*0.01:0,borderBottomColor:"#40D3A8"}]}>
                    <Text style={{fontSize:width*0.035, color:!render ? "#999999" : "#40D3A8",fontWeight:"400",fontFamily:"OpenSans-SemiBold",marginBottom:5}}>CART</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:width*0.01, borderBottomColor:"#40D3A8"}]}>
                    <Text  style={{fontSize:width*0.035, color:render ? "#999999" : "#40D3A8",fontWeight:"400",fontFamily:"OpenSans-SemiBold",marginBottom:5}}>CHTECKOUT</Text>
                </View>
                </TouchableOpacity>
            </View>

         </View>
         
          
           { 
           render ?  
           
           
           
           <Cart order={order}/>
                  :   order.length>0 && <ScrollView style={{flex:1, }}>
                        
                        <View style={{marginTop:width*0.045}}>
                            <View style={styles.container}>
                                <Text style={styles.text}>Full Name</Text>
                                <Input  value={info.fullName}  leftIcon={{type:"feather", name:"check"}} name= "fullName" onChangeText={value=>setInfo({...info,fullName:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Street Address</Text>
                                <Input  value={info.address} leftIcon={{type:"feather", name:"map-pin"}} onChangeText={value=>setInfo({...info,address:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Apt / Suite / Other</Text>
                                <Input  value={info.apt_Suite} leftIcon={{type:"feather", name:"home"}} onChangeText={value=>setInfo({...info,apt_Suite:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>State / City</Text>
                                <Input  value={info.city} leftIcon={{type:"feather", name:"map"}} onChangeText={value=>setInfo({...info,city:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Postal Code</Text>
                                <Input  value={ info.postalCode} leftIcon={{type:"feather", name:"clipboard"}} onChangeText={value=>setInfo({...info,postalCode:value})}/>
                            </View>
                            <View style={styles.container}> 
                                <Text style={styles.text}>Phone</Text>
                                <Input  value={ info.phone} leftIcon={{type:"feather", name:"phone"}} onChangeText={value=>setInfo({...info,phone:value})}/>
                            </View>
                        </View>
                
          
                      
                  </ScrollView>
                    
            }


            {order.length>0 && (
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
             
             
                
                      
                     
           
            }
           
           
        </View>
        :<Loading/>
        
        }
        </View>
        )
}



const styles = StyleSheet.create({
  
  cart:{
    textAlign:"center",
 
    fontSize: width*0.06,
   
   
    fontFamily:"OpenSans-SemiBold"
  },
  renderButton:{
    alignItems:"center",
    width:(width*0.44)/2,
    fontSize:width*0.06,
    fontFamily:"OpenSans-Regular"
    
  },
  contTotalOrder:{
    
    backgroundColor:"#323531"
  },
  totalOrder:{
    color:"white",
    fontStyle: "normal",
    marginVertical:width*0.02,
    fontSize: width*0.0385,
    alignSelf:"center",
    fontFamily:"OpenSans-Bold"

  },
  buttonOrder:{
       width:width,
      height:width*0.12,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:5,
      backgroundColor:"#40D3A8",
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