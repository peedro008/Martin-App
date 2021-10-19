import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import {IP} from "../../env"

export default function clientUser() {
    const user = useSelector(state => state.user)
    const [orders, setOrders]= useState([])
    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${user}`)    //traigo los ultimos pedidos del usuario 
                .then(function(response){
                setOrders(response.data)
              

             })
            
       console.log(user)
    console.log(orders)      

    },[])
    
    
    return (
        <View>
            <Text>User</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
