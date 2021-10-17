


import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, backgroundColor } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IP } from '../../../env'




export default function orderRegister({navigation}) {
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
    console.log(order)      
    
    
    return(
        <View>

        
        {
            order?.map(el=>{
            
                return(
                    
                        
                    <TouchableOpacity
                    style={{ backgroundColor: "grey",
                     margin: 5,
                      width: 350,
                      alignItems: 'center'
                    }}  
                    key={el.id} onPress={() => navigation.navigate("Order",{order:el})}>
                    <View
                    style={{flex: 1,
                        flexDirection: 'column',
                        backgroundColor: 'lightgray',
                        justifyContent: 'center',
                        alignItems: 'center',}}  
                    >
                
                        
                        <Text>Client: {el.email}</Text>
                        <Text>Date: {el.createdAt}</Text>
                        <Text>Status: {el.status}</Text>
                    
                
                        </View>
                    </TouchableOpacity>
                
                
                
                
                )
            })
            
        }
    </View>
    )  
    
}

const styles = StyleSheet.create({

})