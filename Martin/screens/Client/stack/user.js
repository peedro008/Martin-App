import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { IP } from '../../../env'

const width=Dimensions.get("window").width
export default function user() {
    const [orders,setOrders]= useState([]) 
    const email =  useSelector(state=> state.User)
    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
            .then(function(response){
            setOrders(response.data)
            })
            .catch(error=>{
                console.log(error)  
                })
    },[])
    
    
    let pending
      
    let orr
    if(orders.length>0){
    orr=orders.reverse()}
  
   if (orders.length>0){
     
    return (
        <View>
            <View
        style={{  height:300}}>
        <Text style={styles.OrderHeader} >Last Orders</Text> 

        {orders.length>0?
        <FlatList
        
        horizontal={true}
        data={orr}
        renderItem={({item})=> 
          <View>
            <Card  
            style={{width:325, height:180, backgroundColor:"grey",}}>
              <View style={{flexDirection: 'row', marginBottom:13}}>

                    <Text style={{color:"orange", fontSize:20}}>{item.status}</Text>
                      <Text style={{ fontWeight:"bold",paddingLeft:100,fontSize:16 }}>{item.createdAt.substring(0,9)} | {item.createdAt.substring(11,16)}</Text>
                    </View>
                    <Card.Divider/>
                    <View
                    style={{flexDirection: 'row'}}>
                      <Text style={{margin:10, fontSize:22, color:"blue"}}>
                      Order N° {item.id} 
                      </Text>
                      
                      <View
                      style={{marginBottom:15}}>
                      <TouchableOpacity
                      onPress={() => handleAddProduct(item.orderItems)}
                      style={{borderRadius:5, width:80, height:25, backgroundColor:"green", marginLeft:90}}>
                        <Text
                        style={{fontSize:10, alignSelf:"center",fontWeight:"bold", color:"#fff", marginTop:4}}>
                          ADD TO CART
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => navigation.navigate("order detail",{id:item.id})}
                      style={{borderRadius:5, width:80, height:25, marginTop:2, backgroundColor:"#F15A4D", marginLeft:90}}>
                        <Text
                        style={{fontSize:10, alignSelf:"center",fontWeight:"bold", color:"#fff", marginTop:4,}}>
                          DETAILS
                        </Text>
                      </TouchableOpacity>
                      </View>
                      
                      
                      </View>
                      <Card.Divider/>
                      <View
                       style={{flexDirection: 'row'}}>
                        <Text
                        style={{fontWeight:"bold"}}>VALUE OF ITEMS: ${item.total.toFixed(2)}         QUANTITY: {item.orderItems.length}</Text>
                        
                      </View>
                    
                  </Card> 
                </View>
                    }>
                </FlatList>:
                <View>
                  <Text>sadf</Text>
      
                  </View>}
      </View>
        </View>
    )}
    else return(
      <View><Text>pasd</Text></View>
    )
}

const styles = StyleSheet.create({
  OrderHeader:{
     
    alignSelf:"center",
    fontSize: width*0.07,
    fontWeight: "600",
    marginBottom:15,
    
    
  },

})
