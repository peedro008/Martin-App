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
                <View style={styles.container}>
                    <View style={styles.contImage}>
                        <ImageBackground source={{uri: item.img}} style={styles.image}>
                            <View style={styles.buttonX}>
                                <Button
                                onPress={() => handleDelete(item.id)} 
                                title="x"
                                color="#F15A4D"
                                />
                            </View>
                           
                        </ImageBackground>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        <View style={styles.contQuantity}>
                            <Text>Quantity:</Text>
                            <Text style={{color:"#777777"}}> x{item.quantity} </Text>
                        </View>
                        
                    </View>
                </View>
         }/>
    )
}

const styles= StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        marginBottom:12,
        marginTop:10,
        borderBottomWidth:0.5,
        borderBottomColor:"#E0E0E0",
        borderTopColor: "#E0E0E0",
        borderTopWidth:0.5
    },
    contImage:{
        width: 100,
        height: 100,
        flexGrow:1,
        margin:0,
  
    },
    image:{
        width: "100%",
        height: "100%",
        flexGrow:1,
        margin:0
        
  },
  buttonX:{
    width:25,
    position:"absolute",
    top:0,  
    right:0,
    borderRadius:3
},

info:{
    display:"flex",
    position:"relative",
    flexGrow:10,
},
name:{
    display:"flex",
    position:"absolute",
    top:0,
    left:5,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: width*0.04,
   // lineheight: 20,
    
},
price:{
  display:"flex",
  position:"absolute",
  top:0,
  right:0,
  color:"#151522",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 15,
  //lineheight: 20,
  
},
contQuantity:{
    display:"flex",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:30,
    left:5,
    flexDirection:"row",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    paddingBottom:5
   // lineheight: 13,
},
  
})