import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,Dimensions, ScrollView } from 'react-native'
import { useState,useEffect  } from 'react';
import axios from 'axios';
import { IP } from '../../../env';
import { Card, Icon } from 'react-native-elements';
import * as Font from "expo-font"




const width=Dimensions.get("window").width
const height=Dimensions.get("window").height
export default function adminOrderDetail({route}) {
    const [fontsLoaded, setFontsLoaded]= useState(false)
    const [status, setStatus]= useState()
    
   
 
    
    let {id} = route.params
    

    const [order, setOrder]= useState([]);
    console.log(order)

   
    const onPending = function () {
        
        axios.put(`${IP}/setPendingStatus`, {id:order[0].id})
            .then(function(response){
               
                setStatus("Pending")
            })
            
            .catch(error=>{
              console.log(error)  
            })
    }
    const onReceived = function () {
       
        axios.put(`${IP}/setReceivedStatus`, {id:order[0].id})
            .then(function(response){
               
                setStatus("Received")
            })
            
            .catch(error=>{
              console.log(error)  
            })
    }
    const onDispatched = function () {
        axios.put(`${IP}/setDispatchedStatus`, {id:order[0].id})
        .then(function(response){
           
            setStatus("Dispatched")
        })
        
        .catch(error=>{
          console.log(error)  
        })
    }
    
            
    

    useEffect(()=>{
        axios.get(`${IP}/orderid?id=${id}`)
            .then(function(response){
                setOrder(response.data)
                setStatus(response.data[0].status)
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
        <ScrollView style={{backgroundColor:"#FFFFFFFF", }}>
        <View style={{backgroundColor:"#FFFFFFFF", }}>
            <Text style={styles.header}>Order Details</Text>
            {order.length>0 && 
            <View>
            <Card
            containerStyle={{width:width*0.9 ,alignSelf:"center", paddingHorizontal:width*0.04}}>
                <View style={{flexDirection:"row", alignItems:"center",marginBottom:height*0.015 }}>
                                    <Text style={{fontSize:width*0.04, color:"#999999", fontWeight:"900",fontFamily:"OpenSans-Regular"}}>Date: {order[0].createdAt.substring(0,9)}  </Text>
                                    <Text style={{fontSize:width*0.04, color:"#999999", fontWeight:"900",fontFamily:"OpenSans-Regular"}}>Time: {order[0].createdAt.substring(11,16)}</Text>  
                </View>
                <Card.Divider/>
                <Text style={{fontSize:width*0.06,fontFamily:"OpenSans-Bold", color:"#6979F8", marginBottom:height*0.015}}>Order N° {order[0].id}</Text>
                
                <Card.Divider/>
                
                
                <View style={{flexDirection:"row", marginBottom:height*0.02}}>
                
                    <View style={{width:"50%",justifyContent:"center"}}>
                        <Text style={{color:"#999999", fontSize:width*0.035,fontFamily:"OpenSans-Regular"}}>VALUE OF ITEMS</Text>
                        <Text style={{fontSize:width*0.034}}>$ {order[0].total.toFixed(2)}</Text>
                    </View>
                    <View style={{width:"50%",justifyContent:"center"}}>
                        <Text style={{color:"#999999", fontSize:width*0.035,fontFamily:"OpenSans-Regular"}}>QUANTITY  </Text>
                        <Text style={{fontFamily:"OpenSans-Regular"}}>{order[0].orderItems.length} products</Text>
                    </View>

                </View>
                <Card.Divider/>
                <Text style={{fontSize:width*0.045, fontFamily:"OpenSans-Regular"}}>SHIPPING PROGRESS</Text>
                <View style={{flexDirection:"row",paddingTop:width*0.03, alignItems:"center"}}>
                <Icon type="feather" name="truck" color="black" size={width*0.08}/>
               
                <Text  style={{fontSize:width*0.05,marginLeft:-width*0.02, fontFamily:"OpenSans-SemiBold"}}>  Out for Delivery</Text>
                <Text  style={{fontSize:width*0.045, color:"grey", fontFamily:"OpenSans-Regular"}}> - 3 day shipping</Text>
                               
                </View>
                <View style={{width:width*0.5, flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginVertical:height*0.015}}>
                    <View style={{width:"23%", height:width*0.008, backgroundColor:"#6979F8"}}/>
                    <View style={{width:"23%", height:width*0.008, backgroundColor:"#CDD2FD"}}/>
                    <View style={{width:"23%", height:width*0.008, backgroundColor:"#CDD2FD"}}/>
                    <View style={{width:"23%", height:width*0.008, backgroundColor:"#CDD2FD"}}/>
                </View>

                <Card.Divider/>
                <Text style={{fontSize:width*0.05, fontFamily:"OpenSans-Bold"}}>Shipping Address</Text>
                <View style={{marginTop:height*0.01}}>
                    <Text numberOfLines={4} ellipsizeMode="tail" style={{ width:"100%", fontSize:width*0.048,textTransform:"capitalize" ,fontFamily:"OpenSans-Regular"}}>{order[0].userInfo.fullName}, {order[0].userInfo.address} </Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{width:"100%", fontSize:width*0.048,fontFamily:"OpenSans-Regular"}}>{order[0].userInfo.city}, {order[0].userInfo.postalCode} </Text>
                    <Text numberOfLines={2} ellipsizeMode="tail"  style={{width:"100%",fontSize:width*0.048,fontFamily:"OpenSans-Regular"}}>TEL:  {order[0].userInfo.phone}</Text>
                </View>
                <Card.Divider/>
                <Text style={{fontSize:width*0.05, fontFamily:"OpenSans-Bold"}}>Set Status</Text>
                <View
            style={styles.containerButton}>
                <TouchableOpacity
                onPress={onReceived}
                style={
                    styles.button}>
                    <Text style={ 
                        [status=="Received"?
                        styles.PtextR:
                        styles.textR,{marginLeft:width*0.01}]}>RECEIVED</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={onPending}
                style={styles.button}>
                    <Text style={
                         [status=="Pending"?
                         styles.PtextP:
                         styles.textP,{marginHorizontal:width*0.04}]
                        }>PENDING</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={onDispatched}
                style={styles.button}>
                    <Text style={
                        status=="Dispatched"?
                        styles.PtextD:
                        styles.textD}>DISPATCHED</Text>
                </TouchableOpacity>
            </View>
            </Card>
          
            <FlatList
                data={order[0].orderItems}
                s
                renderItem={({item})=>
            
                   
                    <Card
                    containerStyle={{marginVertical:width*0.06, width:width*0.9,alignSelf:"center",padding:0}}>
                        <View
                        style={{flexDirection: 'row',width:width*0.9}}>                        
                            <Image source={{uri:item.img}}
                            style={{width:width*0.18, height:width*0.18, borderRadius:5}}/>
                            
                            <View
                            style={{paddingLeft:width*0.03 ,  width:(width*0.9)-(width*0.18) }}>
                            <View style={{flexDirection:"row", alignItems:"center", width:"100%"}}>
                                <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={{fontSize:width*0.05, width:width*0.48,fontFamily:"OpenSans-SemiBold"}}>{item.name}</Text>
                               
                                <Text style={{fontSize:width*0.045,  position:"absolute", right:0, fontFamily:"OpenSans-Bold" }}>$ {item.total.toFixed(2)}   </Text>
                                
                            </View>

                            <Text style={{fontSize:width*0.037}}>Price:  ${item.price.toFixed(2)}</Text>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontSize:width*0.037}}>Quantity:</Text>
                                <Text style={{fontSize:width*0.037,color:"grey"}}> x{item.quantity}</Text>
                            </View>
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
    containerButton:{
        flexDirection:"row",
        alignSelf:"center",
        marginVertical:width*0.04,
        
               
     },
     button:{
       alignItems:"center" 
     },
     textP:{
        fontSize:width*0.045,
        fontFamily:"OpenSans-Regular",
        color:"black"
        
    },
    textR:{
        fontSize:width*0.045,
        fontFamily:"OpenSans-Regular",
        color:"black"
        
    },
    textD:{
        fontSize:width*0.045,
        fontFamily:"OpenSans-Regular",
        color:"black"
        
    },
    PtextR:{
        fontSize:width*0.05,
        fontFamily:"OpenSans-Bold",
        color:"#00C48C",
        textDecorationLine: 'underline'
        
    },
    PtextP:{
        fontSize:width*0.05,
        fontFamily:"OpenSans-Bold",
        color:"#FFCF5C",
        textDecorationLine: 'underline'
        
    },
    PtextD:{
        fontSize:width*0.05,
        fontFamily:"OpenSans-Bold",
        color:"#0084F4",
        textDecorationLine: 'underline'
        
    },
  
})
