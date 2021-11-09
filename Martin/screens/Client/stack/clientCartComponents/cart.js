import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground, Button,Image, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import {deleteProduct} from '../../../../actions'
import { Card } from 'react-native-elements/dist/card/Card'



const width=Dimensions.get("window").width


export default function Cart({order}){
    const dispatch= useDispatch()
    
    const handleDelete=(id)=>{     //elimino producto del carrito de compras
        dispatch(deleteProduct(id))
    }

    return(
        <FlatList
        keyExtractor={item => item.id.toString()}
        data={order}
        
        renderItem={({item})=>
        <View style={styles.shadow}>
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
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
                        <View style={styles.contQuantity}>
                            <Text style={{fontSize:width*0.038,fontFamily:"OpenSans-Regular"}}>Quantity:</Text>
                            <Text style={{fontSize:width*0.038,fontFamily:"OpenSans-Regular",color:"#777777"}}> x{item.quantity} </Text>
                        </View>
                        
                    </View></View>
                </View>
         }/>
    )
}

const styles= StyleSheet.create({
  

   
    container:{
        display:"flex",
        alignSelf:"center",
        width: width-30,
        flexDirection:"row",
        marginBottom:width*0.02,
        marginTop:width*0.03,
        borderWidth:0.5,
        borderColor:"rgba(228, 228, 228, 0.6)",
        borderRadius:8,
        borderTopWidth:0.5,
        height:width*0.25,
        backgroundColor:"#fffff9"

    },
    contImage:{
        width: width*0.20,
        height: width*0.25,
        flexGrow:1,
        //margin:width*0.03,
       
        
    },
    image:{
        width: width*0.25,
        height: width*0.25,
        flexGrow:1,
        margin:0,
      
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
    marginLeft:width*0.03,
    backgroundColor:"yellow",
},
name:{
    display:"flex",
    position:"absolute",
    fontStyle: "normal",
   
    fontSize: width*0.05,
    paddingVertical:width*0.03,
    flexWrap:"wrap",
    width:width*0.4,
    fontFamily:"OpenSans-Regular"

    
},
price:{

  position:"absolute",
  right:width*0.01,
  color:"#151522",
  bottom:-5,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: width*0.06,
  paddingVertical:width*0.08,
  fontFamily:"OpenSans-Regular"
 
  
},
contQuantity:{
    display:"flex",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:width*0.03,
    left:width*0.002,
    flexDirection:"row",
 
    fontSize: width*0.04,
    paddingBottom:width*0.02,
    fontFamily:"OpenSans-Regular"

},
  
})