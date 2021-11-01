import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity,Image, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Card,   } from 'react-native-elements';

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default function controlPanel({navigation}) {
    return (
        
        
        <View style={{backgroundColor:"white", height:height}}>
            <View
                style={{alignItems:"center",marginVertical:width*0.04, }}>
                    <Text style={styles.search}>
                        Control Panel
                    </Text>
                    <View style={{position:"absolute", right:0}}>

                        
                    </View>
                </View>
        <View style={styles.card}  >
           <TouchableOpacity
           onPress={() => navigation.navigate("Admin Categories")}>
               <Text style={styles.boton}>Product Catalog</Text>
           </TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <TouchableOpacity
           onPress={() => navigation.navigate("Order Register")}>
               <Text style={styles.boton}>Order Register</Text>
           </TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <TouchableOpacity>
               <Text style={styles.boton}>Add Products</Text>
           </TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <Image style={styles.image} source={require('../../../assets/logo.png')}/>

           
        </View>
        
        
        
        
        
        
        
        
        
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        alignSelf:"center",
      
        height:width*0.7,
        width:width*0.7,
    

    },
    search:{
        marginTop:width*0.05,
        fontSize: width*0.07,
        
        fontFamily:"OpenSans-SemiBold"
    },
    boton:{
        fontSize:25,
        fontFamily:"OpenSans-Regular",
        marginVertical: width*0.04,
        marginHorizontal:width*0.08    
        
    },
    card:{
        marginVertical:width*0.11
    }
})
