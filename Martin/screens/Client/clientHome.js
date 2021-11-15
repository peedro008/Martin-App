import React from 'react'
import { StyleSheet} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import Products from './stack/products';
import ProductDetail from './stack/productDetail';
import Home from './stack/home';
import orderDetail from './stack/orderDetail';
import orders from './stack/homeComponents/orders';

const Stack = createStackNavigator();


export default function clientHome({navigation}) {
   
    return (
      <Stack.Navigator
     >
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}  />
      <Stack.Screen name="Products" component={Products} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: false}}  />
      <Stack.Screen name="order detail" component={orderDetail} options={{headerShown: false}}/>
      <Stack.Screen name="orders" component={orders} options={{headerShown: false}}/>
  
    </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({
  
})
