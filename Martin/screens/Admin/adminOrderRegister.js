import React, {useState, useEffect} from 'react'
import { Card } from 'react-native-elements'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { IP } from '../../env'
import { FlatList } from 'react-native-gesture-handler'
import OrdersR from './Stack/adminHomeComponents/ordersR'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import 'react-native-gesture-handler';

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height
export default function adminOrderRegister({navigation}) {
    const [button, setButton]=useState(1)
    const [order, setOrder]= useState([])
    
const unsubscribe = navigation.addListener('focus', () => {
    
  });
    
    useEffect(() => {
        axios.get(`${IP}/orders`)
        .then(function(response){
            setOrder(response.data.reverse())
        })
        .catch(error=>{
        console.log(error)  
        })
    }, [unsubscribe])
         
    
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
                 <Divider/>
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
            <Divider/>
            {
                button==1?<OrdersR data={Pending}/>
                : button==0?<OrdersR data={Received}/>
                : button==2&&<OrdersR data={Dispatched}/>
        
            }
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        textAlign:"center",
        marginTop:width*0.09,
        marginBottom:width*0.055,
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
    },
    containerButton:{
       flexDirection:"row",
       alignSelf:"center",
       marginVertical:width*0.06,
    },
    button:{
        marginHorizontal:width*0.045,
        marginVertical:-width*0.02, 
        
    },
    textP:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Regular",
        color:"#00C48C"
        
    },
    textR:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Regular",
        color:"#FFCF5C"
        
    },
    textD:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Regular",
        color:"#0084F4"
        
    },
    PtextP:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Bold",
        color:"#00C48C",
        textDecorationLine: 'underline'
        
    },
    PtextR:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Bold",
        color:"#FFCF5C",
        textDecorationLine: 'underline'
        
    },
    PtextD:{
        fontSize:width*0.038,
        fontFamily:"OpenSans-Bold",
        color:"#0084F4",
        textDecorationLine: 'underline'
        
    },
    Card:{
        height:heigth
    }
})
