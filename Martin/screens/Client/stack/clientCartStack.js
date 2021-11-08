import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import clientCart from "./clientCart"
import Check from './clientCartComponents/Check';

const Stack = createStackNavigator();

export default function clientCartStack() {
    return (
      
      <Stack.Navigator>
        <Stack.Screen name="ClientCart" component={clientCart} options={{headerShown: false}}/>
        <Stack.Screen name="Check" component={Check} options={{headerShown: false}}/>
        
       
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})