import React, { useEffect } from "react";
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


    return(
        <ScrollView style={{flex:1, }}>
        { order.length>0 &&
            <View>
            <View style={styles.container}>
                <Text style={styles.text}>Full Name</Text>
                <Input leftIcon={{type:"font-awesome", name:"user"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input leftIcon={{type:"font-awesome", name:"map-pin"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input leftIcon={{type:"font-awesome", name:"home"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input leftIcon={{type:"font-awesome", name:"building"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Postal Code</Text>
                <Input leftIcon={{type:"font-awesome", name:"clipboard"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input leftIcon={{type:"font-awesome", name:"phone"}}/>
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