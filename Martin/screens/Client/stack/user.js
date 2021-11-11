import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'
import axios from 'axios'
import {IP} from '../../../env'
import { useDispatch, useSelector } from 'react-redux'
import Orders from './userComponents/orders'
import { logOut } from '../../../actions'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Divider } from 'react-native-elements/dist/divider/Divider'

const width=Dimensions.get("window").width



export default function user({navigation}) {
    const email =  useSelector(state=> state.User)
    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [render,setRender]=useState(true)
    const [orders, setOrders] = useState([])
    const [config,setConfig] = useState(false)
    const userId=useSelector(state=>state.UserId)
    const dispatch=useDispatch()

    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
            .then(function(response){
            setOrders(response.data.reverse())
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

    const handleLogOut=()=>{
        dispatch(logOut())
    }

    return (
       
        <ScrollView style={{flex:1, backgroundColor:"#FFF",}}>
             
          <View style={{marginTop:width*0.1,
        marginBottom:width*0.06,flexDirection:"row",justifyContent:"center"}}>
            <Text style={styles.profile}>Profile</Text>
            <View style={{position:"absolute", right:width*0.055,top:width*0.0125}}>
                <TouchableOpacity onPress={()=>setConfig(!config)}>
                    <Icon type="feather" name="settings" size={width*0.07} color="gray"/>
                </TouchableOpacity>
            </View>
          </View>
          
          { config &&<View style={styles.logOut}>
                        <TouchableOpacity onPress={()=>handleLogOut()}>
                        <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.04}}>Log out</Text>
                       </TouchableOpacity>
                     </View>}
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
            
            <View style={{marginTop:width*-0.03}}>
            <Orders name={name} lastName={lastName} navigation={navigation} data={orders}/></View>
        </ScrollView>
        
    )}
  


const styles = StyleSheet.create({
    profile:{
        fontSize: width*0.07,
        alignSelf:"center",
        fontFamily:"OpenSans-Regular",
    },
    header:{
        alignItems:"center",
        alignSelf:"center",
        
    },
    logOut:{
        borderRadius:3,alignSelf:"flex-end",
        marginRight:width*0.04,
        marginTop:-width*0.052,
        backgroundColor:"#F5F5DC",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:width*0.3,
        alignItems:"center"
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
