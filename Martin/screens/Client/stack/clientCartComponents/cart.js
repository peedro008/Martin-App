import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import {deleteProduct} from '../../../../actions'




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
                             
                                ><Text style={{color:"white", textAlign:"center"}}>x</Text></TouchableOpacity>
                            </View>
                           
                        </ImageBackground>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        <View style={styles.contQuantity}>
                            <Text style={{fontFamily:"OpenSans-Regular"}}>Quantity:</Text>
                            <Text style={{color:"#777777"}}> x{item.quantity} </Text>
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
        marginBottom:12,
        marginTop:10,
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
    width:25,
    
    height:25,
    position:"absolute",
    top:0,  
    right:0,
    borderRadius:3,
    backgroundColor:"#F15A4D"
    
},

info:{
    display:"flex",
    position:"relative",
    flexGrow:10,
    marginLeft:width*0.03,
    
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

  display:"flex",
  position:"absolute",
  right:width*0.05,
  color:"#151522",
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
    bottom:10,
    left:1,
    flexDirection:"row",
 
    fontSize: width*0.04,
    paddingBottom:5,
    fontFamily:"OpenSans-Regular"

},
  
})