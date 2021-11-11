import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground, Button,Image, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import {deleteProduct} from '../../../../actions'
import { Card } from 'react-native-elements/dist/card/Card'
import { Divider } from 'react-native-elements/dist/divider/Divider'



const width=Dimensions.get("window").width


export default function Cart({order}){
    const dispatch= useDispatch()
    
    const handleDelete=(id)=>{     //elimino producto del carrito de compras
        dispatch(deleteProduct(id))
    }

    return(
    <View style={{flex:1}}>
        <FlatList
        keyExtractor={item => item.id.toString()}
        data={order}
        contentContainerStyle={{paddingVertical:width*0.02}}
        renderItem={({item})=>
       
               <View style={styles.container}>
                    <View style={styles.contImage}>
                        <ImageBackground source={{uri: item.img}} style={styles.image}>
                        <View>
                                <TouchableOpacity
                                style={styles.buttonX}
                                onPress={() => handleDelete(item.id)} 
                             
                                ><Text style={{fontSize:width*0.035, fontFamily:"OpenSans-SemiBold",color:"white", textAlign:"center"}}>x</Text></TouchableOpacity>
                            </View>
                           
                        </ImageBackground>
                    </View>
                    <View style={styles.info}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
                            {item.name}
                        </Text>
                        <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
                        <View style={styles.contQuantity}>
                            <Text style={{fontSize:width*0.038,fontFamily:"OpenSans-Regular"}}>Quantity:</Text>
                            <Text style={{fontSize:width*0.038,fontFamily:"OpenSans-Regular",color:"#777777"}}> x{item.quantity} </Text>
                        </View>
                        
                    </View>
                </View>
         }/>
        
    </View>        
    )
}

const styles= StyleSheet.create({
  

   
    container:{
    
        alignSelf:"center",
        width: width*0.9,
        flexDirection:"row",
        borderWidth:0.5,
        borderColor:"rgba(228, 228, 228, 0.6)",
        borderRadius:8,
        height:width*0.25,
        backgroundColor:"#fffff9",
        shadowColor: "#000",
        shadowOffset: {
              width: 0,
              height: 5,
         },
        shadowOpacity: 0.34,
        shadowRadius: 6.27, 
        elevation: 10,
        backgroundColor:"#FFFAFA"
    },
    contImage:{
        width: width*0.23,
        height: width*0.23,
        flexGrow:1,
        //margin:width*0.03,
        marginLeft:width*0.005,
        marginTop:width*0.008
    },
    image:{
        width: width*0.23,
        height: width*0.23,
  },
  buttonX:{
    width:width*0.055,
    
    height:width*0.055,
    position:"absolute",
    top:0,  
    right:0,
    borderRadius:5,
    backgroundColor:"#F15A4D"
    
},

info:{
    flexGrow:10,
  
},
name:{
    position:"absolute",
    fontSize: width*0.04,
    width:width*0.59,
    fontFamily:"OpenSans-SemiBold",
    marginTop:width*0.02
},
price:{

  position:"absolute",
  right:width*0.01,
  color:"#151522",
  bottom:width*0.035,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: width*0.05,
//   paddingVertical:width*0.08,
  fontFamily:"OpenSans-SemiBold"
 
  
},
contQuantity:{
    display:"flex",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:width*0.02,
    left:width*0.002,
    flexDirection:"row",
 
    fontSize: width*0.04,
    paddingBottom:width*0.02,
    fontFamily:"OpenSans-Regular"

},
  
})