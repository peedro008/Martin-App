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
        alignSelf:"center",
        width: width-30,
        flexDirection:"row",
        marginBottom:12,
        marginTop:10,
        borderWidth:0.5,
        borderColor:"#E0E0E0",
        borderRadius:8,
        borderTopWidth:0.5,
        shadowColor:"black",
        shadowOffset: { width: 3, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation:1,

    },
    contImage:{
        width: width*0.20,
        height: width*0.25,
        flexGrow:1,
        margin:width*0.03,
        backgroundColor:"yellow"
        
    },
    image:{
        width: width*0.26,
        height: width*0.25,
        flexGrow:1,
        margin:0,
      
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
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: width*0.04,
    paddingVertical:width*0.03,
    flexWrap:"wrap",
    width:width*0.4
   // lineheight: 20,
    
},
price:{
  display:"flex",
  position:"absolute",
  top:width*0.02,
  right:width*0.05,
  color:"#151522",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: width*0.06,
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
    fontSize: width*0.04,
    paddingBottom:5
   // lineheight: 13,
},
  
})