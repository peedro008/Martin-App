import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,FlatList,ImageBackground,TouchableOpacity} from 'react-native'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import Products from './stack/products';
import ProductDetail from './stack/productDetail';
import Home from './stack/home';
import orderDetail from './stack/orderDetail';
const Stack = createStackNavigator();


export default function clientHome({navigation}) {
   
    return (
      <Stack.Navigator
     >
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}  />
      <Stack.Screen name="Products" component={Products} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: false}}  />
      <Stack.Screen name="order detail" component={orderDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({
  
})
