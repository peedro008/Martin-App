import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { StyleSheet,ScrollView, Text, View, Image, Button,TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
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
       <ScrollView>
        <View>
            <View style={{flex:1, backgroundColor:"#fff"}}> 

                <Text style={styles.products}>
                    Product Card
                </Text>
                <View style={{position:"absolute", right:25, top:35}}>
                <Icon
                name='shopping-bag'
                type="feather"
                color='gray'
                size={25 }
                />
            </View>
                <Image  
                source={{uri: product.img}}
                style={styles.image}/>

                <Text style={styles.price}>
                    ${product.price}
                </Text>

                <View style={styles.category}>
                    <Text style={{fontSize:17}}>
                        {category}
                    </Text>
                </View>
                
                
                <Text style={styles.name}>
                    {product.name}
                </Text>
                <Text style={styles.desc}>
                    {product.description}
                </Text>
                
                <View style={styles.buttonContainer}> 
                    <TouchableOpacity
                    onPress={()=> handleCount()}
                    style={ styles.minibutton  }>
                        <Text style={{alignSelf:"center"}}>
                            -
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={styles.count}>
                        <Text style={styles.countText}>  {count}
                        </Text>
                    </View>
                    <TouchableOpacity
                    onPress={()=> setCount(count + 1)}
                    style={ styles.minibutton  }
                    >
                        <Text
                        style={{alignSelf:"center"}}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            {!added ? 
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={()=>handleAddProduct()}>
                        <Text style={styles.buttonStyle}>
                            ADD TO CART 
                        </Text>
                    </TouchableOpacity>
                </View>
            : 
                <View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                            <Text style={styles.buttonStyle}>
                                GO TO CART 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
        </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    
    minibutton:{
         
        shadowColor: 'rgba(0,0,0, .4)',
        marginTop:5, 
        shadowOffset: { 
        height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 4,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    products:{
        alignSelf:"center",
        marginTop:30,
        marginBottom:15,
        fontSize:25,
        fontWeight: "bold"
    },
    count:{
        marginLeft:9,
        marginRight:9,
        borderRadius:5,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 4,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    category:{
        marginLeft:17,
        marginTop:8,
        marginBottom:8,
        width: 47, 
        height: 22
    },
    price:{
        fontSize:48,
        marginLeft:15,
        fontWeight:"bold"
    },
    image:{
        height:375,
        width:439,
        alignSelf:"center"
    },
    name:{
        fontWeight:"600", 
        fontSize:34,
        marginLeft:15, 
        marginBottom:10
    },
    desc:{
        fontSize:15,
        marginLeft:15
    },
    buttonContainer:{
        marginTop:50,
        display:"flex", 
        flexDirection:"row", 
        alignSelf:"center"
    },
    countText:{
        color:"blue",
        width:20, 
        alignSelf:"center",
        
    },
    buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        marginTop:13
    },
    buttonView:{
        marginTop:35,
        width:380, 
        height:50, 
        borderRadius:5, 
        backgroundColor:"#F15A4D", 
        alignSelf:"center"
    }
   
})

{/* <Text>Price: ${(product.price -(product.price * product.salePercent / 100)).toFixed(2)} {product.sale && "(On sale)"+ "$"+ product.price + " " + "%"+product.salePercent}</Text>
            <Text>TOTAL: ${((product.price -(product.price * product.salePercent / 100))*count).toFixed(2)}</Text> */}