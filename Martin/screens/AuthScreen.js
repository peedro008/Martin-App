import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ClientNavigation from "./Client/ClientNavigation"
import { useEffect} from 'react';
import {logIn, userRole, User} from "../actions";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IP } from '../env';


const width=Dimensions.get("window").width


const AuthScreen = () => {

    
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

   

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${IP}/${isLogin ? 'login' : 'signup'}`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(payload),
            
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                  
                    setIsError(false);
                    setMessage(jsonRes.message);
                    dispatch(userRole(jsonRes.role));
                    dispatch(User(payload.email))
                }
            } catch (err) {
                console.log(err);
            };
        
        })
        .catch(err => {
            console.log(err);
        });

       
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

   
       
         return (
             
        //<ImageBackground source={require('../image/logo.png')} style={styles.image}>
            <View style={styles.card}>
                 <Image style={styles.image} source={require('../assets/logo.png')}/>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <Text style={styles.description}>Enter your email and password for {"\n"}signing in. Thanks.</Text>
                <View style={styles.form}>
                  
                        <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin && <TextInput underlineColorAndroid='transparent' style={[styles.input,{marginTop:width*0.055}]} placeholder="Name" onChangeText={setName}></TextInput>}
                        <TextInput secureTextEntry={true} style={[styles.input,{marginTop:width*0.055}]} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                     
                </View>
            </View>
        //</ImageBackground>
    );}

    
    
;

const styles = StyleSheet.create({
    image: {
        width: width*0.8,
        height:width*0.6,
        alignItems: 'center',
        marginTop:width*0.25
    },  
    card: {
        flex: 1,
        alignItems:"center"
    },
    heading: {
        fontSize: width*0.07,
        fontWeight: 'bold',
        marginLeft:width*0.1,
        marginTop: width*0.13,
        color: 'black',
        alignSelf:"flex-start"
    },
    description:{
        // backgroundColor:"green",
        marginTop:width*0.02,
        alignSelf:"flex-start",
        marginLeft:width*0.1,
        color:"gray",
        fontWeight:"400",
        fontSize:width*0.05
    },
    form: {
        width: width*0.8,
        flex: 1,
        alignItems: 'center',
        justifyContent:"flex-start",
        // backgroundColor:"orange",
        marginTop: width*0.1
      
    }, 
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontSize:width*0.04, 
        height:width*0.14,
        borderWidth:1,
        borderColor:"rgba(228, 228, 228, 0.6)",
        borderRadius:5
    },
    button: {
        width: '100%',
        backgroundColor: '#F15A4D',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-width*0.01,
      
    },
    buttonText: {
        color: 'white',
        fontSize: width*0.05,
       
    },
    buttonAlt: {
        width: '80%',
        height: width*0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: '#6979F8',
        fontSize: width*0.05,
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default AuthScreen;