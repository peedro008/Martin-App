import * as React from 'react';
import { Text, View } from 'react-native';
import { TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import adminHome from "./adminHome"
import Sales from "./sales"
import adminControlPanel from "./adminControlPanel"
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

const AdminNavigation = () => {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })
      }
   >
        <Tab.Screen name="Home" component={adminHome}options={{headerShown: false}} />
        <Tab.Screen name="Control Panel" component={adminControlPanel}options={{headerShown: false}} />
        <Tab.Screen name="Sales" component={Sales}/>
        
    </Tab.Navigator>
    
  );
}
export default AdminNavigation;