import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import axios from 'axios'
import { IP	 } from '../../../env'

export default function editOrder({route, navigation}) {
    const order = route.params.order
    console.log(order.id)
   
   const received = function(id){
    axios.put(`${IP}/updateOrderStatus`,{id})
    .then(response=>{
      console.log(response.data)
    })
   } 
    
    
    
    
    
    return (
        <View
        style={{ alignItems: 'center',
                     width: 350,
                     backgroundColor: "lightgray"
                      
                    }}  >
            <Text>Client: {order.email}</Text>
            <Text>Status: {order.status}</Text>
            {
                order.orderItems.map(e=>{
                    return(
                        <View key={e.id}
                        style={{ backgroundColor: "grey",
                     margin: 10,
                      width: 350,
                      
                    }} >
                        <Text>Product: {e.name}</Text>
                        <Text>Quantity: {e.quantity}</Text>
                        <Text>Total: {e.total}</Text>
                        
                        </View>
                    )
                })
            }
            <Button
            title="Received"
            onPress={received(order.id)}/>
        </View>
    )
}

const styles = StyleSheet.create({})
