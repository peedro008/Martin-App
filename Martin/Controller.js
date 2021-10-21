import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector,useDispatch } from 'react-redux';
import  AuthScreen  from './screens/AuthScreen';
import ClientNavigation from "./screens/Client/ClientNavigation"
import store from './store';
import { useNavigation } from '@react-navigation/native'
import {getCategories, userRole} from './actions.js'
import AdminNavigation from './screens/Admin/AdminNavigation';



export default function Controller() {
    const UserRole = useSelector(state => state.UserRole)
     
 

     
    
    // if(UserRole==null){
    //     return (
    //         <NavigationContainer>
    //             <AuthScreen />
    //         </NavigationContainer>
           
    //     )
    // }
    // else if(UserRole=="Client" ){
          return(
            <NavigationContainer>
                <ClientNavigation />
            </NavigationContainer>
           )
    // }
    // else if(UserRole== "Admin"){
    //     return(
    //         <NavigationContainer>
    //             <AdminNavigation />
    //         </NavigationContainer>
    //     )
    // }
    
}

const styles = StyleSheet.create({})
