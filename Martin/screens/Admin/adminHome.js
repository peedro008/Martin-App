 import  { useEffect, useState } from 'react'

import Balance from './Stack/adminHomeComponents/balanceCard'
import Orders from './Stack/adminHomeComponents/orders'
import axios from 'axios'
import { IP } from '../../env'
import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { ScrollView } from 'react-native-gesture-handler'

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function adminHome({navigation}) {
    const [orders,SetOrders]= useState([])
    

    useEffect(()=>{
        axios.get(`${IP}/orderpending`)
        .then(function(response){
           SetOrders(response.data)
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
             <Balance/>
            <Text style={[styles.header, {marginTop:44}]} >Latest Orders</Text>
            { orders.length ?<Orders data={orders}/> : <Icon style={{marginTop:width*0.06,alignSelf:"flex-start",marginLeft:width*0.06}} name="file-text" type="feather"  size= {width*0.4}/>}
        </ScrollView></View>
    )
}

const styles = StyleSheet.create({
    header:{
                fontSize:width*0.07,
                marginTop:width*0.1,
                marginLeft:width*0.06,
                fontFamily:"OpenSans-Regular"
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
