import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'
import axios from 'axios'
import {IP} from '../../../env'
import { useSelector } from 'react-redux'


const width=Dimensions.get("window").width

export default function user() {
    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("")
    const [render,setRender]=useState(true)
    const id=useSelector(state=>state.UserId)

    useEffect(()=>{
       axios.get(`${IP}/user?=${id}`)
    .then(res=>{
        setName(res.data.name);
        setLastName(res.data.lastName);
        console.log(res.data)
    })
            
        
    },[])

    const handleOrderRender=()=>{
        setRender(true)
    }
    const handleCheckRender=()=>{
        setRender(false)
    }


    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
          <Text style={styles.profile}>Profile</Text>
          <View style={styles.header}>
              <View style={styles.contInitials}>
                <Text style={styles.initials}>TM</Text>
              </View>
              <Text style={styles.name}>{name + " " + lastName }</Text>
              <Text style={styles.address}>Larrea 719 Mendoza, Lujan de Cuyo</Text>
              <View style={styles.buttonEdit}>
                  <TouchableOpacity>
                      <Text>Edit Shipping Address</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={{flexDirection:"row",alignSelf:"center",marginTop:width*0.099 }}>
                <TouchableOpacity onPress={()=>handleOrderRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render?5:0,borderBottomColor:"#6979F8"}]}>
                    <Text style={{ color:!render ? "#999999" : "#6979F8",fontWeight:"400",}}>Recent Orders</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:5, borderBottomColor:"#6979F8"}]}>
                    <Text  style={{ color:render ? "#999999" : "#6979F8",fontWeight:"400"}}>Notifications</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )}
  


const styles = StyleSheet.create({
    profile:{
        marginTop:width*0.08,
        marginBottom:width*0.06,
        fontSize: width*0.07,
        fontWeight: "600",
        alignSelf:"center"
    },
    header:{
        alignItems:"center",
        alignSelf:"center"
    },
    contInitials:{
        height:width*0.21,
        width:width*0.21,
        backgroundColor:"#F15A4D",
        justifyContent:"center",
        borderRadius:100,
        marginBottom:25,
        borderWidth:1,
        borderColor:"#6979F8"
    },
    initials:{
        color:"#fff",
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:width*0.10,
        fontWeight:"400"
    },
    name:{
        fontSize: width*0.07,
    },
    address:{
        width:width*0.7,
        color:"#666666",
        fontSize:width*0.04,
        textAlign:"center",
        fontWeight:"400"
    },
    buttonEdit:{
        width:width*0.44,
        height:width*0.085,
        marginTop:13.58,
        borderColor:'#6979F8',
        borderWidth:1,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        fontSize:width*0.05,
        fontWeight:"300"
    },
    renderButton:{
        alignItems:"center",
        width:108.33,
        fontSize:width*0.06,
        
      },
})
