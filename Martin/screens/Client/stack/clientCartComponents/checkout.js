import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements'


const width=Dimensions.get("window").width


export default function Checkout({order}){
    return(
        <View style={{flex:1, alignItems:"center"}}>
        { order.length>0 &&
            <View>
            <View style={styles.container}>
                <Text style={styles.text}>Full Name</Text>
                <Input style={styles.input} leftIcon={{type:"feather", name:"user"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Street Address</Text>
                <Input leftIcon={{type:"feather", name:"map-pin"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Apt / Suite / Other</Text>
                <Input leftIcon={{type:"feather", name:"home"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>State / City</Text>
                <Input leftIcon={{type:"feather", name:"map-pin"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Postal Code</Text>
                <Input leftIcon={{type:"feather", name:"clipboard"}}/>
            </View>
            <View style={styles.container}> 
                <Text style={styles.text}>Phone</Text>
                <Input leftIcon={{type:"feather", name:"phone"}}/>
            </View>
            </View>

            }
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        width:width-50,
        flex:1,
    },
    text:{
       
        fontWeight:"600",
        fontSize:width*0.04,
        textAlign:"justify"
    },
  
})