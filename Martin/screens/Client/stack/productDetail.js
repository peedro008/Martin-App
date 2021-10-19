import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, Image, Button,TouchableOpacity } from 'react-native'
import {addOrder} from '../../../actions.js'
import { IP } from '../../../env.js'
import { useDispatch, useSelector } from 'react-redux'

export default function ProductDetail({route,navigation}) {
    let {id} = route.params;
    const [product, setProduct]= useState([]);
    const [count, setCount] = useState(0);
    const [added,setAdded] = useState(false)
    const dispatch= useDispatch();
    const preOrder= useSelector(state=>state.PreOrder)

    useEffect(()=>{
        axios.get(`${IP}/products?id=${id}`)
            .then(function(response){
                setProduct(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
             
        },[])

        const handleCount=()=>{
            if(count>0){
                setCount(count - 1);
            } 
        }

       let handleAddProduct=()=>{
            let order={
                name:product.name,
                id:product.id,
                price: product.price -(product.price * product.salePercent / 100),
                sale:product.sale,
                salePercent: product.salePercent,
                img: product.img,
                quantity:count,
                total: product.price * count
            }
                let aux= preOrder.filter(el=> el.name == order.name)
                if(aux.length <1 && count>0){
                    dispatch(addOrder(order))
                    setAdded(true)
                    
                }else if( count===0){
                    alert("Select the quantity")
                }
       }
        
       

    return (
        <View>
            <Text>{product.name}</Text>
          <Image  source={{uri: product.img}} />
            <Text>{product.description}</Text>
            <View> 
                <Button title="+" onPress={()=> setCount(count + 1)}/>
                <Text>{count}</Text>
                <Button title="-" onPress={()=> handleCount()}/>
            </View>

            <Text>Price: ${(product.price -(product.price * product.salePercent / 100)).toFixed(2)} {product.sale && "(On sale)"+ "$"+ product.price + " " + "%"+product.salePercent}</Text>
            <Text>TOTAL: ${((product.price -(product.price * product.salePercent / 100))*count).toFixed(2)}</Text>
            {!added ? <Button title="Add to cart" onPress={()=>handleAddProduct()}/>
            
            :             <View>
                            <View>
                                <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                                
                                    <Text> Go to cart </Text>
                                </TouchableOpacity>
                            </View>
                          </View>
            }
        </View>
    )
}

// const styles = StyleSheet.create({
//     count:{
//         display: 'flex',
//         justifyContent:'center'
//     },
//     goToCart:{
//         display:'flex',
//         justifyContent:'center',
//         marginLeft:'38%'
//     },
    // cart:{
    //     display:'flex',
    //     justifyContent:'center',
    //     borderRadius:'10px',
    //     color: "#fff",
    //     backgroundColor: "green",
    //     width: "40%",
    //     height:"5",
    //     fontWeight:"500"
    // }

// })
