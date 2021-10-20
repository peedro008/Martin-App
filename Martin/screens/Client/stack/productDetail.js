import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { StyleSheet,TouchableHighlight, Text, View, Image, Button,TouchableOpacity } from 'react-native'
import {addOrder} from '../../../actions.js'
import { IP } from '../../../env.js'
import { useDispatch, useSelector } from 'react-redux'

export default function ProductDetail({route,navigation}) {
    let {id} = route.params
    
    let {category} = route.params
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
        <Image  
          source={{uri: product.img}}
          style={{height:"50%", width:"95%", alignSelf:"center"}} />
            <Text
            style={{fontSize:48, marginLeft:15}}>${product.price}</Text>
            <Text
            style={{fontSize:17}}
            >{category}</Text>
            <Text
            style={{fontSize:34}}
            >{product.name}</Text>
            <Text
            style={{fontSize:15}}
            >{product.description}</Text>
            
            <View
            style={{marginTop:50,display:"flex", flexDirection:"row", alignSelf:"center"}}> 
                <TouchableOpacity
                onPress={()=> handleCount()}
                style={{backgroundColor: "#FFFFE8", width:20, height:20}}
                >
                  <Text
                    style={{alignSelf:"center"}}>-</Text>
                </TouchableOpacity>
                

                    <Text
                    style={{width:20, alignSelf:"center"}}>  {count}</Text>
                <TouchableOpacity
                onPress={()=> setCount(count + 1)}
                style={{backgroundColor: "#FFFFE8", width:20, height:20}}
                >
                  <Text
                    style={{alignSelf:"center"}}>+</Text>
                </TouchableOpacity>
                
                
                
                
            </View>

            {/* <Text>Price: ${(product.price -(product.price * product.salePercent / 100)).toFixed(2)} {product.sale && "(On sale)"+ "$"+ product.price + " " + "%"+product.salePercent}</Text>
            <Text>TOTAL: ${((product.price -(product.price * product.salePercent / 100))*count).toFixed(2)}</Text> */}
            {!added ? 
            <View style={{marginTop:35,width:380, height:50, borderRadius:5, backgroundColor:"#F15A4D", alignSelf:"center"}}>
                
                <TouchableOpacity onPress={()=>handleAddProduct()}>
                                
                                    <Text style={{color:"#FFFFFF" ,alignSelf:"center", marginTop:13}}> ADD TO CART </Text>
                                </TouchableOpacity>
                
                
                
                </View>
            
            :             <View>
                            <View
                            style={{marginTop:35,width:380, height:50, borderRadius:5, backgroundColor:"#F15A4D", alignSelf:"center"}}>
                                <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                                
                                    <Text style={{color:"#FFFFFF" ,alignSelf:"center", marginTop:13}}> Go to cart </Text>
                                </TouchableOpacity>
                            </View>
                          </View>
            }
        </View>
    )
}

