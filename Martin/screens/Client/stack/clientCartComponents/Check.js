import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,Dimensions, Image, ScrollView } from 'react-native'
import { Icon,  } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IP } from '../../../../env';

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default function Check({navigation}) {
   
    const email =  useSelector(state=> state.User)
    const [orders,setOrders]= useState([]) 
    const [lastOrder,setLastOrder]= useState()
  
    
    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
            .then(function(response){
            setOrders(response.data)
           })

          
            .catch(error=>{
                console.log(error)  
                })
    },[email])
   
   
    useEffect(() => {
        setLastOrder(orders[orders.length-1])
        
    }, [orders])
    
    


    
    const handlePress=()=>{
       

  
    navigation.navigate("order detail",{id:lastOrder.id})
     }



    return (
        <View style={{height:height,flex:1, backgroundColor:"#FFFFFFFF" }}>
            <ScrollView>
        <View style={styles.icon}>
 
            
            <Image style={styles.image} source={require("../../../../assets/Check.png")}/></View>
              
              <View style={{marginBottom:width*0.35}}>
              <Text style={styles.congratulations}>Congratulations!</Text>
              <Text style={styles.text}>Your items are on the way and should arrive shortly</Text>
              </View>
              <View style={styles.button}>
                  <TouchableOpacity
                  containerStyle={{   width:width*0.5,
                     height:width*0.12,}}
                  onPress={handlePress}>
                        <Text style={styles.TextButton}>
                        Track Your Order</Text>
                  </TouchableOpacity>
                </View></ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    icon:{
        marginTop:width*0.2,
        alignSelf:"center",
        
        
    },
    text:{
        textAlign:"center",
        fontFamily:"OpenSans-Regular",
        fontSize:18,
        marginHorizontal:width*0.15,
        color:"#999999"
    },
    congratulations:{
        fontSize:38,
        color:"#151522",
        textAlign:"center",
        fontFamily:"OpenSans-Regular",
        marginBottom:width*0.03,
        letterSpacing:0.2
    },
    button:{
        backgroundColor:"#F15A4D",
        alignItems:"center",
        // width:width*0.7,
        // height:width*0.12,
        alignSelf:"center",
        borderRadius:5,
      
        bottom:width*0.1,
        
     
        
        
        


        
    },
    image:{
        marginTop:width*0.3,
        marginBottom:width*0.3
        
    },
    TextButton:{
        color:"#ffffffff",
        textAlign:"center",
        position:"relative",
        fontFamily:"OpenSans-Regular",
        fontSize:19,
        display:"flex",
        marginVertical:width*0.025
        

        
    }

})
