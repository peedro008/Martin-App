import React, { useEffect, useState } from "react";
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import axios from 'axios'
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements'
import {IP} from "../../../../env"
import { useSelector } from "react-redux";
import { setStatusBarBackgroundColor } from "expo-status-bar";


const width=Dimensions.get("window").width


export default function EditShippingAddress({route}){
    // const {name,lastName}=route.params

    const [address,setAddress]=useState("")
    const [apt_Suite,setApt_Suite]=useState("")
    const [city,setCity]=useState("")
    const [postalCode,setPostalCode]=useState("")
    const [phone,setPhone]=useState("")

    const id= useSelector(state=> state.UserId)

    useEffect(()=>{
        axios.get(`${IP}/userinfo?=${id}`)
    })


    return(
        <ScrollView style={{flex:1, backgroundColor:"#fff" }}>
            <Text style={styles.header}>Add New Shipping Address</Text>
            <View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input onChangeText={setAddress} leftIcon={{type:"font-awesome", name:"map-pin"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input onChangeText={setApt_Suite} leftIcon={{type:"font-awesome", name:"home"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input onChangeText={setCity} leftIcon={{type:"font-awesome", name:"building"}}/>
            </View>
            <View style={styles.container}> 
                <Text onChangeText={setPostalCode} style={styles.text}>Postal Code</Text>
                <Input leftIcon={{type:"font-awesome", name:"clipboard"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input leftIcon={{type:"font-awesome", name:"phone"}}/>
            </View>
            </View>
            <View style={styles.containerButtonDefault}>
                <View style={styles.contButtonDefault}>
                    <View style={styles.buttonDefault}></View>
                </View>
                <Text style={styles.defaultText}>SET AS DEFAULT</Text>
            </View>

        </ScrollView>
    )
}

const styles= StyleSheet.create({
    header:{
        alignSelf:"center",
        marginTop:width*0.08,
        fontSize: width*0.07,
        fontWeight: "600",
        marginBottom:width*0.135
    },
    container:{
        width:width-50,
        flex:1,
        alignSelf:"center",
        
    },
    text:{
        fontWeight:"600",
        fontSize:width*0.04,
        textAlign:"justify"
    },
    containerButtonDefault:{
        flexDirection:"row", 
        alignItems:"center",
        width:width-50, 
        alignSelf:"center",
        marginTop:width*0.07,
    },
    contButtonDefault:{
        width:width*0.13,
        height:width*0.075,
        borderRadius:16, 
        borderColor:"rgba(228, 228, 228, 0.6)",
        borderTopWidth:0.5,
        shadowColor:"black",
        shadowOffset: { width: 3, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation:1,
        justifyContent:"center"
    },
    buttonDefault:{
        height:width*0.06,
        width:width*0.06,
        backgroundColor:"#E4E4E4",
        borderRadius:100,
    },
    defaultText:{
        fontSize:width*0.035,
        marginLeft:width*0.03,
        fontWeight:"400"
    }
  
})