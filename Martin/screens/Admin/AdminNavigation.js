import * as React from 'react';
import { Text, View } from 'react-native';
import { TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import adminHomeNavigation from "./adminHomeNavigation"

import adminControlPanel from "./adminControlPanel"
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();
 const AdminNavigation = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = "ios-home"
        } 
        else if (route.name === 'Control Panel') {
          iconName ='ios-settings';
        
        
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })
    }
   >
        <Tab.Screen name="Home" component={adminHomeNavigation}options={{headerShown: false}} />
        <Tab.Screen name="Control Panel" component={adminControlPanel}options={{headerShown: false}} />
        
        
    </Tab.Navigator>
    
  );
}
export default AdminNavigation;