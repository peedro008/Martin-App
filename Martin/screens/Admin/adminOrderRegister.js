import React, {useState, useEffect} from 'react'
import { Card } from 'react-native-elements'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { IP } from '../../env'
import { FlatList } from 'react-native-gesture-handler'
import Orders from './Stack/adminHomeComponents/orders'


const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height
export default function adminOrderRegister() {
    const [button, setButton]=useState(1)
    const [order, setOrder]= useState([])
    useEffect(() => {
        axios.get(`${IP}/orders`)
        .then(function(response){
            setOrder(response.data)
        })
        .catch(error=>{
        console.log(error)  
        })
    }, [])
         
    
    let Pending = order.filter(e=>e.status=="Pending")
    let Received = order.filter(e=>e.status=="Received")
    let Dispatched = order.filter(e=>e.status=="Dispatched")
    console.log(Received)

    const onPending = function () {
        setButton(1)
    }
    const onReceived = function () {
        setButton(0)
    }
    const onDispatched = function () {
        setButton(2)
    }
    


    return (
        
        <View style={{backgroundColor:"#FFFFFFFF", height:heigth}}>
           <View>
                 <Text style={styles.header}>Order Register</Text>
            </View> 
          
            <View
            style={styles.containerButton}>
                <TouchableOpacity
                onPress= {onReceived}
                style={
                    styles.button}>
                    <Text style={ 
                        button==0?
                        styles.PtextP:
                        styles.textP}>RECEIVED</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress= {onPending}
                style={styles.button}>
                    <Text style={
                         button==1?
                         styles.PtextR:
                         styles.textR
                        }>PENDING</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress= {onDispatched}
                style={styles.button}>
                    <Text style={
                        button==2?
                        styles.PtextD:
                        styles.textD}>DISPATCHED</Text>
                </TouchableOpacity>
            </View>
            {
                button==1?<Orders data={Pending}/>
                : button==0?<Orders data={Received}/>
                : button==2&&<Orders data={Dispatched}/>
        
            }
        
        
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontSize:width*0.07,
        fontWeight:"400",
        marginTop:width*0.1,
       
        fontFamily:"OpenSans-Regular",
        alignSelf:"center"
    },
    containerButton:{
       flexDirection:"row",
       alignSelf:"center",
       marginVertical:20,
       
              
    },
    button:{
        marginHorizontal:width*0.045,
        marginVertical:-5, 
        
    },
    textP:{
        fontSize:17,
        fontFamily:"OpenSans-Regular",
        color:"#00C48C"
        
    },
    textR:{
        fontSize:17,
        fontFamily:"OpenSans-Regular",
        color:"#FFCF5C"
        
    },
    textD:{
        fontSize:17,
        fontFamily:"OpenSans-Regular",
        color:"#0084F4"
        
    },
    PtextP:{
        fontSize:19,
        fontFamily:"OpenSans-Bold",
        color:"#00C48C",
        textDecorationLine: 'underline'
        
    },
    PtextR:{
        fontSize:19,
        fontFamily:"OpenSans-Bold",
        color:"#FFCF5C",
        textDecorationLine: 'underline'
        
    },
    PtextD:{
        fontSize:19,
        fontFamily:"OpenSans-Bold",
        color:"#0084F4",
        textDecorationLine: 'underline'
        
    },
    Card:{
        height:heigth
    }
})
