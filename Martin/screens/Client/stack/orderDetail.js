import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,Dimensions, ScrollView } from 'react-native'
import { useState,useEffect  } from 'react';
import axios from 'axios';
import { IP } from '../../../env';
import { Card, Icon } from 'react-native-elements';
import * as Font from "expo-font"




const width=Dimensions.get("window").width
const height=Dimensions.get("window").height
export default function orderDetail({route}) {
    const [fontsLoaded, setFontsLoaded]= useState(false)
    
    useEffect(() => {
      if (!fontsLoaded){
        loadFonts()
      }
      
    })
    const loadFonts = async()=>{
      await Font.loadAsync({
        "OpenSans-Regular": require("../../../assets/fonts/OpenSans-Regular.ttf")
      })
      setFontsLoaded(true)
    }
 
    
    let {id} = route.params
    

    const [order, setOrder]= useState([]);
    console.log(order)

   
   
            
    

    useEffect(()=>{
        axios.get(`${IP}/orderid?id=${id}`)
            .then(function(response){
                setOrder(response.data)
               
            })
            
            .catch(error=>{
              console.log(error)  
            })
           
             
        },[id])
 



       let userInfo
       let items   
      if(order.length>0)  {
          userInfo=order[0].userInfo
         items = order[0].orderItems} 
        //console.log(items)
        
    return (
          <ScrollView>
        <View style={{backgroundColor:"#FFFFFFFF"}}>
            <Text style={styles.header}>Order Details</Text>
            {order.length>0 && 
            <View>
            <Card
            containerStyle={{paddingLeft:width*0.07}}>
                <View style={{flexDirection:"row",marginBottom:height*0.015 }}>
                                    <Text style={{fontSize:16, color:"#999999", fontWeight:"900",fontFamily:"OpenSans-Regular"}}>Date: {order[0].createdAt.substring(0,9)}  </Text>
                                    <Text style={{fontSize:16, color:"#999999", fontWeight:"900",fontFamily:"OpenSans-Regular"}}>Time: {order[0].createdAt.substring(11,16)}</Text>  
                </View>
                <Card.Divider/>
                <Text style={{fontSize:23,fontFamily:"OpenSans-Bold", color:"#6979F8", marginBottom:height*0.015}}>Order N° {order[0].id}</Text>
                
                <Card.Divider/>
                
                
                <View style={{flexDirection:"row", marginBottom:height*0.02}}>
                
                    <View style={{width:"50%",}}>
                        <Text style={{color:"#999999", fontSize:14,fontFamily:"OpenSans-Regular"}}>VALUE OF ITEMS</Text>
                        <Text>$ {order[0].total}</Text>
                    </View>
                    <View>
                        <Text style={{color:"#999999", fontSize:14,fontFamily:"OpenSans-Regular"}}>QUANTITY  </Text>
                        <Text style={{fontFamily:"OpenSans-Regular"}}>{order[0].orderItems.length} products</Text>
                    </View>

                </View>
                <Card.Divider/>
                <Text style={{fontSize:17, fontFamily:"OpenSans-Regular"}}>SHIPPING PROGRESS</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                <Icon type="feather" name="truck" color="black" size={35}/>
               
                <Text  style={{fontSize:20, fontFamily:"OpenSans-SemiBold"}}>  Out for Delivery</Text>
                <Text  style={{fontSize:17, color:"grey", fontFamily:"OpenSans-Regular"}}> - 3 day shipping</Text>
                               
                </View>
                <View style={{width:200, flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginVertical:height*0.015}}>
                    <View style={{width:44, height:3, backgroundColor:"#6979F8"}}/>
                    <View style={{width:44, height:3, backgroundColor:"#CDD2FD"}}/>
                    <View style={{width:44, height:3, backgroundColor:"#CDD2FD"}}/>
                    <View style={{width:44, height:3, backgroundColor:"#CDD2FD"}}/>
                </View>

                <Card.Divider/>
                <Text style={{fontSize:20, fontFamily:"OpenSans-Bold"}}>Shipping Address</Text>
                <View style={{marginTop:height*0.01}}>
                    <Text style={{fontSize:18,fontFamily:"OpenSans-Regular"}}>{order[0].userInfo.fullName}, {order[0].userInfo.address} </Text>
                    <Text style={{fontSize:18,fontFamily:"OpenSans-Regular"}}>{order[0].userInfo.city}, {order[0].userInfo.postalCode} </Text>
                    <Text style={{fontSize:18,fontFamily:"OpenSans-Regular"}}>TEL:  {order[0].userInfo.phone}</Text>
                </View>
            </Card>
          
            <FlatList
                data={order[0].orderItems}
                s
                renderItem={({item})=>
            
                   
                    <Card
                    containerStyle={{ height:78, width:380, flexDirection: 'row',padding:0}}>
                        <View
                        style={{flexDirection: 'row',width:380}}>                        
                            <Image source={{uri:item.img}}
                            style={{width:70, height:70, padding:0, borderRadius:8, marginTop:3,   }}/>
                            
                            <View
                            style={{paddingLeft:20 ,  width:290,  }}>
                            <View style={{flexDirection:"row", alignItems:"center", width:290}}>
                                <Text
                                style={{fontSize:20, fontFamily:"OpenSans-SemiBold"}}>{item.name}</Text>
                               
                                <Text style={{fontSize:15,  position:"absolute", right:0, fontFamily:"OpenSans-Bold" }}>$ {item.total}   </Text>
                                
                            </View>

                            <Text>Price:  ${item.price}</Text>
                            <Text>Quantity:  {item.quantity}</Text>
                            
                            </View>
                        
                        </View>
                        
                    </Card>

                
        }
            />
            </View>}
            </View>
            </ScrollView>

    )
    }


          
 























const styles = StyleSheet.create({
    shadow:{
        borderRadius:8,
        marginHorizontal:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    header:{
        alignSelf:"center",
        fontSize:width*0.07,
        fontWeight: "600",
        marginTop:width*0.09,
        fontFamily:"OpenSans-Regular"
    },
  
})
