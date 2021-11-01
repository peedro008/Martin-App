import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';


export default function controlPanel({navigation}) {
    return (
        <View>
           <Button 
          
           title="Catalog"
           onPress={() => navigation.navigate("Admin Categories")}> 
           
            
            </Button>
           
          
            
            <Button
            title="Order Register"
            onPress={() => navigation.navigate("Order Register")}
            >
                
            </Button>
        </View>
    )
}

// const styles = StyleSheet.create({
//     justifyContent:'space-between',
//     backgroundColor: "red"
// })
