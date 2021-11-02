import React, { useEffect, useState } from "react";
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions, SectionList} from 'react-native'
import axios from 'axios'
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements'
import {IP} from "../../../../env"
import { useSelector } from "react-redux";


const width=Dimensions.get("window").width


export default function Checkout({order}){
   
    const userId= useSelector(state=> state.UserId)
    const [fullName, setFullName]= useState("")
    const [address, setAddress]= useState("")
    const [apt_Suite, setApt_Suite]= useState("")
    const [postalCode, setPostalCode]= useState("")
    const [phone, setPhone]= useState("")
    const [city, setStateCity]= useState("")
    
        useEffect(()=>{
            axios.get(`${IP}/userinfo?userId=${userId}`)
            .then(res=>{ setFullName(res.data.fullName);
                        setAddress(res.data.address);
                        setApt_Suite(res.data.apt_Suite);
                        setPostalCode(res.data.postalCode);
                        setStateCity(res.data.city);
                        setPhone(res.data.phone)
                    console.log(res.data)}
            )
        },[])
    
    return(
        <ScrollView style={{flex:1, }}>
        { order.length>0 &&
            <View>
            <View style={styles.container}>
                <Text style={styles.text}>Full Name</Text>
                <Input value={fullName} leftIcon={{type:"font-awesome", name:"user"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input value={address} leftIcon={{type:"font-awesome", name:"map-pin"}} onChangeText={setAddress}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input value={apt_Suite} leftIcon={{type:"font-awesome", name:"home"}} onChangeText={setApt_Suite}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input value={city} leftIcon={{type:"font-awesome", name:"building"}} onChangeText={setStateCity}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Postal Code</Text>
                <Input value={postalCode} leftIcon={{type:"font-awesome", name:"clipboard"}} onChangeText={setPostalCode}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input value={phone} leftIcon={{type:"font-awesome", name:"phone"}} onChangeText={setPhone}/>
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
        alignSelf:"center",
        fontFamily:"OpenSans-Regular"
    },
    text:{
       
        fontWeight:"600",
        fontSize:width*0.04,
        textAlign:"justify",
        fontFamily:"OpenSans-Regular"
    },
  
})