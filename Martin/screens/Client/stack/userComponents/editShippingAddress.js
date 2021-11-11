import React, { useEffect, useState } from "react";
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions, ImagePropTypes} from 'react-native'
import axios from 'axios'
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements'
import {IP} from "../../../../env"
import { useSelector } from "react-redux";
import { setStatusBarBackgroundColor } from "expo-status-bar";


const width=Dimensions.get("window").width


export default function EditShippingAddress(){
    // const {name,lastName}=route.params

    const [address,setAddress]=useState("")
    const [apt_Suite,setApt_Suite]=useState("")
    const [city,setCity]=useState("")
    const [postalCode,setPostalCode]=useState("")
    const [phone,setPhone]=useState("")
    const [boolDefault,setBoolDefault]=useState(true)
    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("")
    const [saved,setSaved]=useState(false)
    const userId=useSelector(state=>state.UserId)

    useEffect(()=>{
        axios.get(`${IP}/user?id=${userId}`)
     .then(res=>{
         setName(res.data.name);
         setLastName(res.data.lastName);
         console
     })
             
         
     },[])
     useEffect(()=>{
        axios.get(`${IP}/userinfo?userId=${userId}`)
        .then(res=>{

            setCity(res.data.city)
            setPhone(res.data.phone) 
            setPostalCode(res.data.postalCode) 
            setApt_Suite(res.data.apt_Suite) 
            setAddress(res.data.address) 
            setBoolDefault(res.data.default)
 }
        )
    },[])

    const handleDefault=()=>{
        setBoolDefault(!boolDefault)
    }

    const handleSave=()=>{
        
          axios.post(`${IP}/userinfo?id=${userId}`,{
                       fullName:name +" "+ lastName ,
                       address: address,
                       apt_Suite: apt_Suite,
                       postalCode: postalCode,
                       city:city,
                       phone: phone,
                       default:boolDefault
          })
          setSaved(true)
          setTimeout(()=>{
              setSaved(false)
          },2000)
    }

    return(
        <ScrollView style={{flex:1, backgroundColor:"#FFF" }}>
            <Text style={styles.header}>Add New Shipping Address</Text>
            <View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input value={address}  onChangeText={value=>setAddress(value)} leftIcon={{type:"font-awesome", name:"map-pin"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input value={apt_Suite}  onChangeText={value=>setApt_Suite(value)} leftIcon={{type:"font-awesome", name:"home"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input value={city}  onChangeText={value=>setCity(value)} leftIcon={{type:"font-awesome", name:"building"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Postal Code</Text>
                <Input value={postalCode}  onChangeText={value=>setPostalCode(value)}  leftIcon={{type:"font-awesome", name:"clipboard"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input value={phone}  onChangeText={value=>setPhone(value)} leftIcon={{type:"font-awesome", name:"phone"}}/>
            </View>
            </View>
            <View style={styles.containerButtonDefault}>
                <TouchableOpacity onPress={()=>handleDefault()}>
                <View style={styles.contButtonDefault}>
                    <View style={boolDefault ? styles.buttonDefault1 : styles.buttonDefault2}></View>
                </View>
                </TouchableOpacity>
                <Text style={styles.defaultText}>SET AS DEFAULT</Text>
            </View>
            <View style={{marginBottom:0,alignItems: "center",justifyContent:"center",height: width*0.17}}>
                <TouchableOpacity onPress={()=>handleSave()}>
                    <View style={styles.buttonSave}>
                        <Text style={styles.buttonSaveText}>Save</Text>
                    </View>
                </TouchableOpacity>
                {
                    saved && <Text style={{color:"#00bb2d",  fontSize:width*0.04}}>Successfully saved</Text>
                }
            </View>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    header:{
        alignSelf:"center",
        marginTop:width*0.1,
        fontSize: width*0.07,
        fontWeight: "600",
        marginBottom:width*0.09,
        fontFamily:"OpenSans-Regular"
    },
    container:{
        width:width-50,
        flex:1,
        alignSelf:"center",
        
    },
    text:{
        fontWeight:"600",
        fontSize:width*0.04,
        textAlign:"justify",
        fontFamily:"OpenSans-Regular"
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
    buttonDefault1:{
        height:width*0.06,
        width:width*0.06,
        backgroundColor:"#6979F8",
        borderRadius:100,
        alignSelf:"flex-end"
    },
    buttonDefault2:{
        height:width*0.06,
        width:width*0.06,
        backgroundColor:"#E4E4E4",
        borderRadius:100,
    },
    defaultText:{
        fontSize:width*0.035,
        marginLeft:width*0.03,
        fontWeight:"400"
    },
    buttonSave:{
        width:(width -50)/2,
        height: width*0.12 ,
        backgroundColor:"#F15A4D",
        borderRadius:5,
        justifyContent:"center",
       
    },
    buttonSaveText:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.05
    }
  
})