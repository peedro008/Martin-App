

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import adminHome from './Stack/adminHome'
import orderDetail from '../Client/stack/orderDetail';

const Stack = createStackNavigator();


export default function adminHomeNavigation() {
    return (
       <Stack.Navigator>
        <Stack.Screen name="home" component={adminHome} options={{headerShown: false}}/>
        <Stack.Screen name="order detail" component={orderDetail} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})


