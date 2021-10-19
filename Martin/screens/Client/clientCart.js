import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder} from '../../actions.js'

export default function clientCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const totalPrice= useSelector(state=> state.TotalPrice) 
    const dispatch= useDispatch()
    
    
    // const handlePlus=()=>{    //resto cant de un producto en cart 
    //     dispatch(plusQuantity())
    // }
    // const handleLess=(quantity)=>{   //sumo cant de un producto en cart
    //     if(quantity>1){
    //         dispatch(lessQuantity())
    //     }
    // }

    const handleDelete=(id)=>{     //elimino producto del carrito de compras
        dispatch(deleteProduct(id))
    }

    const handlePostOrder=()=>{
    //    let msj=  confirm("Are you sure?")
    //    if(msj === true){
           dispatch(postOrder(order,user))
    //    }
    }

    
    return (
        <View
        style={{flex:1}}>
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
                                        title="X"
                                        color="#F15A4D"
                                        />
                                    </View>
                                   
                                </ImageBackground>
                            </View>
                            {/* <Button title="+" onPress={()=>handlePlus()}/>
                              <Text>{el.quantity}</Text>
                            <Button title="-" onPress={()=> handleLess(el.quantity)} disabled={el.quantity>1 ? false : true} /> */}
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                                <View style={styles.contQuantity}>
                                    <Text>Quantity:</Text>
                                    <Text style={{color:"#777777"}}> x{item.quantity}</Text>
                                </View>
                            </View>
                        </View>
                } 
            /> 
                    
            }
            {order.length>0 ? (
            <View style={styles.contTotalOrder}>
                <Text style={styles.totalOrder}>
                    Total order ${totalPrice.toFixed(2)}  
                </Text> 
            <View style={styles.buttonOrder}>
                <Button color="#F15A4D" title="place order" onPress={()=>handlePostOrder()}/>
            </View> 
            </View>)
             :
             <Text>EMPTY</Text>
            }
           
        </View>
        )
}

const styles = StyleSheet.create({
  container:{
      display:"flex",
      flexDirection:"row",
      marginBottom:15,
      marginTop:10
  },
  buttonX:{
      padding:5,
      width:10,
      height:10,
      justifyContent:"center",
      alignItems:"center",
      position:"absolute",
      top:12,  
      right:7,
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
      width:325,
      height:50,
      alignSelf:"center"
  }
})