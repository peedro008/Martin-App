import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import user from './stack/user';
import orderDetail from './stack/orderDetail';
import orders from './stack/homeComponents/orders';


const Stack = createStackNavigator();

export default function clientUser() {
    return (
      
      <Stack.Navigator>
        
        <Stack.Screen name="orders" component={orders} options={{headerShown: false}}/>
        <Stack.Screen name="user" component={user} options={{headerShown: false}}/>
        <Stack.Screen name="order detail" component={orderDetail} options={{headerShown: false}}/>
     </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
