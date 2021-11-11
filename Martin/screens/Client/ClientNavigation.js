import * as React from 'react';
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView} from 'react-native'
import { TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clientHome from "./clientHome";
import clientCatalog from "../Client/clientCatalog";
import clientUser from "../Client/clientUser";
import Ionicons from 'react-native-vector-icons/Ionicons';
import clientCartStack from './stack/clientCartStack';

const width=Dimensions.get("window").width


const Tab = createBottomTabNavigator();

const ClientNavigation = () => {
  return (
   
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = "ios-home"
          } 
          else if (route.name === 'Catalog') {
            iconName ='ios-list';
          }
          else if (route.name === 'Cart') {
            iconName = "ios-cart"
          }
          else if (route.name === 'User') {
            iconName = "ios-person"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
     
    })
      }
   >
     
        <Tab.Screen name="Home" component={clientHome} 
        
         options={{ unmountOnBlur: true , headerShown: false }} listeners={({ navigation }) => ({
           blur: () => navigation.setParams({ screen: undefined }),
          })} />
        <Tab.Screen name="Catalog" component={clientCatalog} options={{ unmountOnBlur: true , headerShown: false }} listeners={({ navigation }) => ({
           blur: () => navigation.setParams({ screen: undefined }),
          })}  />
        <Tab.Screen name="Cart" component={clientCartStack} options={{ unmountOnBlur: true , headerShown: false }} listeners={({ navigation }) => ({
           blur: () => navigation.setParams({ screen: undefined }),
          })}  />
           <Tab.Screen name="User" component={clientUser} options={{ unmountOnBlur: true , headerShown: false }} listeners={({ navigation }) => ({
           blur: () => navigation.setParams({ screen: undefined }),
         })}  />
    </Tab.Navigator>
    
  );
}
export default ClientNavigation;