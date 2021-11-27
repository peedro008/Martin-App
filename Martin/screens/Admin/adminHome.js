 import  { useEffect, useState } from 'react'

import Balance from './Stack/adminHomeComponents/balanceCard'
import OrdersA from './Stack/adminHomeComponents/ordersA'
import axios from 'axios'
import { IP } from '../../env'
import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements/dist/divider/Divider'

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function adminHome({navigation}) {
    const [orders,SetOrders]= useState([])
    

    useEffect(()=>{
        axios.get(`${IP}/orderpending`)
        .then(function(response){
           SetOrders(response.data.reverse())
           console.log(response.data)
        })
        .catch(error=>{
            console.log(error)  
            })
    },[])
    
    
   
    return (
        <View style={{flex:1, backgroundColor:"#fff",}}>
         <ScrollView>  
            <Text style={styles.header}>Welcome Admin</Text>
            <Divider style={{marginVertical:width*0.04}}/> 
            
             <Balance/>
            <Text style={{marginTop:width*0.07, marginBottom:width*0.02,fontSize: width*0.07, fontFamily:"OpenSans-Regular",textAlign:"center", fontSize: width*0.06,}} >Latest Orders</Text>
            { orders.length ?<OrdersA data={orders}/> : 
            <Text style={{fontSize:width*0.035,alignSelf:"center",fontFamily:"OpenSans-Regular"}}>NOT ORDERS</Text>}
        </ScrollView></View>
    )
}

const styles = StyleSheet.create({
    header:{
        marginTop:width*0.09,
        fontSize: width*0.07,
        
        fontFamily:"OpenSans-Regular",
        textAlign:"center",
        
        
        fontSize: width*0.06,
       
       
            },
   balanceCard:{
       width:width*0.95,
       alignSelf:"center",
       height:heigth*0.3,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 7,
       },
       shadowOpacity: 0.43,
       shadowRadius: 9.51,
       
       elevation: 15
   }
})
