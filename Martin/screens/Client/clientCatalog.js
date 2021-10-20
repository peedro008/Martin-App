import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Categories from './stack/categories';
import ProductDetail from './stack/productDetail';
import Products from './stack/products';
const Stack = createStackNavigator();

export default function clientCatalog() {
    return (
      
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={Categories} options={{headerShown: false}}/>
        <Stack.Screen name="Products" component={Products} options={{headerShown: false}}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail}options={{headerShown: false}} />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

