import * as React from 'react';
import { Text, View ,Dimensions} from 'react-native';
import { TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clientHome from "./clientHome";
import clientCatalog from "../Client/clientCatalog";
import clientCart from "../Client/clientCart";
import clientUser from "../Client/clientUser";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <Tab.Screen name="Home" component={clientHome} options={{headerShown: false}} />
        <Tab.Screen name="Catalog" component={clientCatalog} options={{headerShown: false}} />
        <Tab.Screen name="Cart" component={clientCart} options={{headerShown: false}} />
        <Tab.Screen name="User" component={clientUser} />
    </Tab.Navigator>
    
  );
}
export default ClientNavigation;