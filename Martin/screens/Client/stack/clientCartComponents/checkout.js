import React, { useEffect, useState } from "react";
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import axios from 'axios'
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements'
import {IP} from "../../../../env"
import { useSelector } from "react-redux";


const width=Dimensions.get("window").width


export default function Checkout({order}){

    const id= useSelector(state=> state.UserId)

    useEffect(()=>{
        axios.get(`${IP}/userinfo?=${id}`)
    })
    const [fullName, setFullName]= useState("")
    const [address, setAddress]= useState("")
    const [apt_Suite_, setApt_Suite_]= useState("")
    const [postalCode, setPostalCode]= useState("")
    const [phone, setPhone]= useState("")
    const [city, setStateCity]= useState("")

    return(
        <ScrollView style={{flex:1, }}>
        { order.length>0 &&
            <View>
            <View style={styles.container}>
                <Text style={styles.text}>Full Name</Text>
                <Input  leftIcon={{type:"font-awesome", name:"user"}} onChangeText={setFullName}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input leftIcon={{type:"font-awesome", name:"map-pin"}} onChangeText={setAddress}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input leftIcon={{type:"font-awesome", name:"home"}} onChangeText={setApt_Suite_}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input leftIcon={{type:"font-awesome", name:"building"}} onChangeText={setStateCity}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Postal Code</Text>
                <Input leftIcon={{type:"font-awesome", name:"clipboard"}} onChangeText={setPostalCode}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input leftIcon={{type:"font-awesome", name:"phone"}} onChangeText={setPhone}/>
            </View>
            </View>

            }
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container:{
        width:width-50,
        flex:1,
        alignSelf:"center"
    },
    text:{
       
        fontWeight:"600",
        fontSize:width*0.04,
        textAlign:"justify"
    },
  
})