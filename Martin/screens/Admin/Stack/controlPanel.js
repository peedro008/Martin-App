import React,{useState} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity,Image, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Card,   } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { logOut } from '../../../actions';
import { useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements/dist/divider/Divider';

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default function controlPanel({navigation}) {
    const [config,setConfig] = useState(false)
    const dispatch=useDispatch()


    const handleLogOut=()=>{
        dispatch(logOut())
    }
    return (
        
        
        <View style={{backgroundColor:"white", height:height}}>
            <View
                style={{alignItems:"center",marginTop:width*0.04, marginBottom:width*0.04}}>
                    <Text style={styles.search}>
                        Control Panel
                    </Text>
                    
                    <View style={{position:"absolute", right:width*0.055,top:width*0.055}}>
                <TouchableOpacity onPress={()=>setConfig(!config)}>
                    <Icon type="feather" name="settings" size={width*0.06} color="black"/>
                </TouchableOpacity>
                    </View>  
            </View>
            <View  style={{marginBottom:width*0.08}}/>
            { config &&<View style={styles.logOut}>
                        <TouchableOpacity onPress={()=>handleLogOut()}>
                        <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.04}}>Log out</Text>
                       </TouchableOpacity>
                     </View>}
        <View style={styles.card}  >
           <TouchableOpacity
           onPress={() => navigation.navigate("Admin Categories")}>
               <View style={{flexDirection:"row",alignItems:"center", marginVertical: width*0.04,
        marginHorizontal:width*0.08    }}>
               <Icon type="feather" name="list" size={width*0.06} color="black"/><Text style={styles.boton}>Product Catalog</Text>
           </View></TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <TouchableOpacity
           onPress={() => navigation.navigate("Order Register")}>
               <View style={{flexDirection:"row",alignItems:"center", marginVertical: width*0.04,
        marginHorizontal:width*0.08    }}>
               <Icon type="feather" name="check-circle" size={width*0.06} color="black"/>
               <Text style={styles.boton}>Order Register</Text>
           </View></TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <TouchableOpacity onPress={() => navigation.navigate("Add Product")}>
           <View style={{flexDirection:"row",alignItems:"center", marginVertical: width*0.04,
        marginHorizontal:width*0.08    }}>
               <Icon type="feather" name="plus-circle" size={width*0.06} color="black"/>
               <Text style={styles.boton}>Add Products</Text></View>
           </TouchableOpacity>
           <Card.Divider style={{width:width*0.85, alignSelf:"center"}}/>
           <Image style={styles.image} source={require('../../../assets/logo.png')}/>

           
        </View>
        
        
        
        
        
        
        
        
        
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        alignSelf:"center",
      
        height:width*0.65,
        width:width*0.65,
        marginTop:width*0.1

    },
    logOut:{
        borderRadius:3,alignSelf:"flex-end",
        position:"absolute",
        top:width*0.2,
        right:width*0.04,
        backgroundColor:"#F5F5DC",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:width*0.3,
        alignItems:"center"
    },
    search:{
        marginTop:width*0.05,
        fontSize: width*0.07,
        
        fontFamily:"OpenSans-SemiBold",
        textAlign:"center",
        
        
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
    },
    boton:{
        fontSize:width*0.055,
        fontFamily:"OpenSans-Regular",
        
        marginHorizontal:width*0.03    
        
    },
    card:{
        marginBottom:width*0.11,
    }
})
