import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'
import axios from 'axios'
import {IP} from '../../../env'
import { useSelector } from 'react-redux'
import Orders from './userComponents/orders'

const width=Dimensions.get("window").width



export default function user({navigation}) {
    const email =  useSelector(state=> state.User)
    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [render,setRender]=useState(true)
    const [orders, setOrders] = useState([])
    const userId=useSelector(state=>state.UserId)

    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
            .then(function(response){
            setOrders(response.data)
            })
            .catch(error=>{
                console.log(error)  
                })
    },[])

    useEffect(()=>{
       axios.get(`${IP}/user?id=${userId}`)
    .then(res=>{
        setName(res.data.name);
        setLastName(res.data.lastName);
    })
    axios.get(`${IP}/userinfo?userId=${userId}`)
    .then(res=>{ 
         setAddress(res.data.address);
         setCity(res.data.city)}
    )        
    },[])

    const handleOrderRender=()=>{
        setRender(true)
    }
    const handleCheckRender=()=>{
        setRender(false)
    }


    return (
        <ScrollView style={{flex:1, backgroundColor:"#fff",}}>
          <Text style={styles.profile}>Profile</Text>
          <View style={styles.header}>
              <View style={styles.contInitials}>
                <Text style={styles.initials}>{name.charAt(0)+lastName.charAt(0)}</Text>
              </View>
              <Text style={styles.name}>{name + " " + lastName }</Text>
              <Text style={styles.address}>{address + ", " + city}</Text>
              <View style={styles.buttonEdit}>
                  <TouchableOpacity onPress={() => navigation.navigate("edit address",{name, lastName})}>
                      <Text>Edit Shipping Address</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={{flexDirection:"row",alignSelf:"center",marginTop:width*0.099,}}>
                <TouchableOpacity onPress={()=>handleOrderRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render?width*0.015:0,borderBottomColor:"#6979F8"}]}>
                    <Text style={{fontFamily:"OpenSans-Regular", color:!render ? "#999999" : "#6979F8",fontWeight:"400",}}>Recent Orders</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleCheckRender()}>
                 <View style={[styles.renderButton,{borderBottomWidth:render? 0:width*0.015, borderBottomColor:"#6979F8"}]}>
                    <Text  style={{fontFamily:"OpenSans-Regular", color:render ? "#999999" : "#6979F8",fontWeight:"400"}}>Notifications</Text>
                </View>
                </TouchableOpacity>
            </View>
            <Orders name={name} lastName={lastName} navigation={navigation} data={orders}/>
        </ScrollView>
    )}
  


const styles = StyleSheet.create({
    profile:{
        marginTop:width*0.1,
        marginBottom:width*0.06,
        fontSize: width*0.07,
        fontWeight: "600",
        alignSelf:"center",
        fontFamily:"OpenSans-Regular"
    },
    header:{
        alignItems:"center",
        alignSelf:"center",
        
    },
    contInitials:{
        height:width*0.21,
        width:width*0.21,
        backgroundColor:"#F15A4D",
        justifyContent:"center",
        borderRadius:100,
        marginBottom:width*0.063,
        borderWidth:1,
        borderColor:"#6979F8",
        
    },
    initials:{
        color:"#fff",
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:width*0.10,
        fontWeight:"400",
        textTransform:"uppercase",
        fontFamily:"OpenSans-Regular"

    },
    name:{
        fontSize: width*0.07,
        textTransform:"capitalize",
        fontFamily:"OpenSans-Regular"
    },
    address:{
        width:width*0.7,
        color:"#666666",
        fontSize:width*0.04,
        textAlign:"center",
        fontWeight:"400",
        textTransform:"capitalize",
        fontFamily:"OpenSans-Regular"
    },
    buttonEdit:{
        width:width*0.44,
        height:width*0.085,
        marginTop:width*0.035,
        borderColor:'#6979F8',
        borderWidth:1,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        fontSize:width*0.05,
        fontWeight:"300",
        fontFamily:"OpenSans-Regular"
    },
    renderButton:{
        alignItems:"center",
        width:width*0.27,
        fontSize:width*0.06,
        fontFamily:"OpenSans-Regular"
        
      },
      
})
