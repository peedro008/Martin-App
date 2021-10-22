import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder,postDelete} from '../../actions.js'
import axios from 'axios'
import { IP } from '../../env.js'

const width=Dimensions.get("window").width

export default function clientCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const dispatch= useDispatch()
    
    
    
    
    
    
    
    
    
    

    const handleDelete=(id)=>{     //elimino producto del carrito de compras
        dispatch(deleteProduct(id))
    }

    const handlePostOrder=()=>{
        axios.post(`${IP}/orderItems`,[order,user])
        .then(response=>{
          console.log(response.data)
        })
        dispatch(postDelete())
    }
    

    
    return (
        <View
        style={{flex:1, backgroundColor: "white"}}>
            {  <FlatList
                keyExtractor={item => item.id.toString()}
                data={order}
                renderItem={({item})=>
                        <View style={styles.container}>
                            <View style={styles.contImage}>
                                <ImageBackground source={{uri: item.img}} style={styles.image}>
                                    <View style={styles.buttonX}>
                                        <Button
                                        onPress={() => handleDelete(item.id)} 
                                        title="x"
                                        color="#F15A4D"
                                        />
                                    </View>
                                   
                                </ImageBackground>
                            </View>
                            
                             
                            
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                                <View style={styles.contQuantity}>
                                    <Text>Quantity:</Text>
                                    <Text style={{color:"#777777"}}> x{item.quantity} </Text>
                                </View>
                                
                            </View>
                        </View>
                } 
            /> 
                    
            }
            {order.length>0 ? (
            <View style={styles.contTotalOrder}>
                <Text style={styles.totalOrder}>
                    Total order: ${totalPrice.toFixed(2)}  
                </Text>
            <View style={styles.buttonOrder}>
                <TouchableOpacity onPress={()=>handlePostOrder()}> 
                  <Text style={{color:"#FFFFFF",alignSelf:"center",fontSize:width*0.05}}>Place order</Text>
                 </TouchableOpacity> 
            </View> 
            </View>)
             :
             <View style={{justifyContent:"center", alignItems:"center", position:"absolute", top:50, left:Dimensions.get("screen").width*0.25}}>
                <Icon name="shopping-cart" color="gray" size={Dimensions.get("screen").width/2}/>
             </View>
            }
           
        </View>
        )
}

const styles = StyleSheet.create({
  container:{
      display:"flex",
      flexDirection:"row",
      marginBottom:15,
      marginTop:10,
      borderBottomWidth:1,
      borderBottomColor:"#E0E0E0",
      
  },
  buttonX:{
      width:25,
      position:"absolute",
      top:0,  
      right:0,
      borderRadius:3
  },
  contImage:{
      width: 100,
      height: 100,
      flexGrow:1,
      margin:0,

  },
  image:{
      width: "100%",
      height: "100%",
      flexGrow:1,
      margin:0
      
},
  info:{
      display:"flex",
      position:"relative",
      flexGrow:10,
  },
  name:{
      display:"flex",
      position:"absolute",
      top:0,
      left:5,
      color:"#151522",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 15,
     // lineheight: 20,
      
  },
  price:{
    display:"flex",
    position:"absolute",
    top:0,
    right:0,
    color:"#151522",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    //lineheight: 20,
    
  },
  contQuantity:{
      display:"flex",
      alignSelf:"flex-end",
      position:"absolute",
      bottom:30,
      left:5,
      flexDirection:"row",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 11,
      paddingBottom:5
     // lineheight: 13,
  },
  contTotalOrder:{
    marginTop:15,
    backgroundColor:"beige"
  },
  totalOrder:{
    color:"#151522",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf:"center"
    //lineheight: 20,

  },
  buttonOrder:{
      width:width,
      height:width*0.11,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:5,
      backgroundColor:"#F15A4D"

  }
})