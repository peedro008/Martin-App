 import  { useEffect, useState } from 'react'

import Balance from './Stack/adminHomeComponents/balanceCard'
 import Orders from '../Client/stack/homeComponents/orders'
 import axios from 'axios'
 import { IP } from '../../env'







import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function adminHome() {
    const [orders,SetOrders]= useState([])


    useEffect(()=>{
        axios.get(`${IP}/orderpending`)
        .then(function(response){
           SetOrders(response.data)
        })
        .catch(error=>{
            console.log(error)  
            })
    })
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
           
            <Text style={styles.header}>Welcome Admin</Text>
             <Balance/>
            <Text style={[styles.header, {marginTop:44}]} >Latest Orders</Text>
            <Orders orders={orders}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
                fontSize:width*0.07,
                fontWeight:"400",
                marginTop:width*0.1,
                marginLeft:width*0.06
            },
   balanceCard:{
       width:width*0.95,
       alignSelf:"center",
       height:heigth*0.3,
       elevation:15
   }
})
