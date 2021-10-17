import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import orderRegister from './Stack/orderRegister';
import controlPanel from './Stack/controlPanel';
import catalogScreen from "./Stack/catalogScreen"
import editProduct from './Stack/editProduct';
import editOrder from './Stack/editOrder';

const Stack = createStackNavigator();
export default function adminControlPanel() {
    return (
       <Stack.Navigator>
        <Stack.Screen name="_Control Panel" component={controlPanel} />
        <Stack.Screen name="Order Register" component={orderRegister} />
        <Stack.Screen name="Order" component={editOrder}/>
        <Stack.Screen name="Catalog Screen" component={catalogScreen} />
        <Stack.Screen name="Edit Product" component={editProduct} />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})


