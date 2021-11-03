

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import adminHome from './adminHome'
import adminOrderDetail from './Stack/AdminOrderDetail';

const Stack = createStackNavigator();


export default function adminHomeNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen name="home" component={adminHome} options={{headerShown: false}}/>
        <Stack.Screen name="Order Details" component={adminOrderDetail} options={{headerShown: false}}/>   
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})


