import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,Dimensions } from 'react-native'
import { useState,useEffect  } from 'react';
import axios from 'axios';
import { IP } from '../../../env';
import { Card } from 'react-native-elements/dist/card/Card';
const width=Dimensions.get("window").width

export default function orderDetail({route}) {
    let {id} = route.params
    

    const [order, setOrder]= useState([]);

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
        <View
        style={{backgroundColor:"white"}} >
            <Text style={{ textAlign:"center",
        alignSelf:"center",
        fontSize: 25,
        fontWeight: "bold",
        marginTop:width*0.1,}} >ORDER DETAILS</Text>
            <Card>
            
            {order.length>0 &&   
            <View
               style={{height:100, width:300,flexDirection: 'row'}}>
                    <View>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Order ID: {order[0].id}</Text>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Date: {order[0].createdAt.substring(0,9)}</Text>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Time: {order[0].createdAt.substring(11,16)}</Text>
                    </View> 
                    
                   <View
                    style={{paddingLeft:"20%", alignItems:"flex-end"}}>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Total: ${order[0].total}</Text>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Status: {order[0].status}</Text>
                        <Text style={{fontSize:20, fontWeight:"900"}}>Items: {items.length}</Text> 
                    </View> 
            </View>}
          </Card>
              <FlatList
            data={items}
            s
            renderItem={({item})=>
            
                   
                    <Card
                   
                    containerStyle={styles.shadow,{ height:100, width:380, flexDirection: 'row',padding:0}}>
                        <View
                        style={{flexDirection: 'row'}}>                        
                            <Image source={{uri:item.img}}
                            style={{width:90, height:90, padding:0, borderRadius:50, marginTop:3  }}/>
                            
                            <View
                            style={{paddingLeft:75, alignSelf:"center"}}>
                            <Text
                            style={{fontSize:25, fontWeight:"bold",marginBottom:15}}>{item.name} x{item.quantity} </Text>
                            
                            <Text
                            style={{fontSize:15
                            }}>TOTAL: $ {item.total}   </Text>
                            </View>
                        
                        </View>
                    </Card>

                
        }
            ></FlatList>  


        </View> 
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
})
