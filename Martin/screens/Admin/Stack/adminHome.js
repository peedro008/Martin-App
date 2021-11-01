import React, { useEffect, useState } from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import Balance from './adminHomeComponents/balanceCard'
import Orders from './adminHomeComponents/orders'
import axios from 'axios'

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function admindHome({navigation}) {
    




    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
           
            <Text style={styles.header}>Welcome Admin</Text>
            <Balance/>
            <View style={{width:width*0.9}}>   
                    <Text style={styles.header} >Last Orders</Text> 
            </View>
            <Orders navigation={navigation}/>
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
})
