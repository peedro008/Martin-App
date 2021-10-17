import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Button,ImageBackground} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { plusQuantity,lessQuantity,deleteProduct,postOrder} from '../../actions.js'

export default function clientCart() {
    const order= useSelector(state=> state.PreOrder) 
    const user= useSelector(state=> state.User) 
    const dispatch= useDispatch()
    
    const handlePlus=()=>{    //resto cant de un producto en cart 
        dispatch(plusQuantity())
    }
    const handleLess=(quantity)=>{   //sumo cant de un producto en cart
        if(quantity>1){
            dispatch(lessQuantity())
        }
    }

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
        <View>
            {
                order?.map(el=>
                    
                        <View key={el.id}>
                            
                            <Text>{el.name}</Text>
                            <ImageBackground source={{uri: el.img}} style={{width: 150,
                            height: 150}}>
                                <Button title="X" onPress={()=>handleDelete(el.id)}/>
                            </ImageBackground>
                            <Button title="+" onPress={()=>handlePlus()}/>
                              <Text>{el.quantity}</Text>
                             <Button title="-" onPress={()=> handleLess(el.quantity)} disabled={el.quantity>1 ? false : true} />
                            <Text> TOTAL: USD{el.total}</Text>
                        </View>
                    
                )
            }
            {order.length>0 ? <Button title="Confirm the purchase" onPress={()=>handlePostOrder()}/> :
             <Text>EMPTY</Text>
            }
        </View>
        )
}

const styles = StyleSheet.create({
  
})