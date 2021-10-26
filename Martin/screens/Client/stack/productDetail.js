import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { StyleSheet,ScrollView, Text, View, Image, Button,TouchableOpacity,Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import {addOrder} from '../../../actions.js'
import { IP } from '../../../env.js'
import { useDispatch, useSelector } from 'react-redux'

const width=Dimensions.get("window").width

const height=Dimensions.get("window").height

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
                price: product.price-(product.price * product.salePercent / 100),
                sale:product.sale,
                salePercent: product.salePercent,
                img: product.img,
                quantity:count,
                total: (product.price-(product.price * product.salePercent / 100)) * count
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
       
        <View
         style={{flex:1}}>
            <View style={{flex:1, }}> 
              <View style={{flexDirection:"row", width:width*0.9, alignItems:"center", justifyContent:"center", marginTop:width*0.06, alignSelf:"center",}}>
                <Text style={styles.products}>
                    Product Card
                </Text>
                <View style={{position:"absolute", right:0}}>
                <Icon
                name='shopping-bag'
                type="feather"
                color='gray'
                size={width*0.07 }
                />
               </View>
            </View>
                <Image  
                source={{uri: product.img}}
                style={styles.image}/>
                <View style={styles.contPrice}>
                    {  
                        product.sale   && <Text style={styles.discount}>{ "$" + product.price}</Text>
                    }
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.price}>
                            ${product.sale ? ((product.price*(100-product.salePercent))/100).toFixed(2) : product.price} 
                        </Text>
                       {product.sale && <View style={{justifyContent:"center", marginLeft:width*0.04}}>
                            <Text style={styles.salePercent}>{product.salePercent + "% OFF"}</Text>
                        </View>}    
                    </View>  
                </View>
                <View style={styles.category}>
                    <Text style={{fontSize:width*0.06, fontWeight:"600", color:"#6979F8"}}>
                        {category}
                    </Text>
                </View>
                
                
                <Text style={styles.name}>
                    {product.name}
                </Text>
               <ScrollView>
                    <Text style={styles.desc }>
                        {product.description}
                    </Text>
                
                </ScrollView>
                
                <View style={styles.buttonContainer}> 
                    <TouchableOpacity
                    onPress={()=>handleCount() }
                    style={ styles.minibutton  }>
                        <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>-</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.count}>
                        <Text style={styles.countText}>{count}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={()=>setCount(count + 1) }
                    style={ styles.minibutton  }
                    >
                        <Text
                        style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>
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
                    <View style={[styles.buttonView,{backgroundColor:"#00bb2d"}]}>
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
        )
}

const styles = StyleSheet.create({
    
    minibutton:{
        borderRadius:8,
        shadowColor: 'rgba(0,0,0, .2)',
        //marginTop:5, 
        shadowOffset: { 
        height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 4,
        height: width*0.08,
        width: width*0.08,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
       
    },
    products:{
        alignSelf:"center",
        fontSize:width*0.07,
        fontWeight: "600",
        marginVertical:width*0.04,
    },
    count:{
        marginLeft:9,
        marginRight:9,
        borderRadius:8,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 2,
        height:width*0.08,
        width:width*0.08,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    category:{
        marginLeft:width*0.05,
        marginTop:8,
        marginBottom:8,
        
        
    },
    contPrice:{
      
    },
    price:{
        fontSize:width*0.13,
        marginLeft:width*0.05,
        fontWeight:"600"
    },
    discount:{
        textAlign:"center",
        fontSize:width*0.06,
        marginLeft:width*0.01,
        marginBottom:- width*0.04,
        fontWeight:"400",
        width:width*0.29,
        textDecorationLine:"line-through",
        color:"gray"
    },
    salePercent:{
        fontSize:width*0.06,
        color:"#00bb2d",
        fontWeight:"400",
        height:width*0.08,
        // backgroundColor:"#F15A4D",
        borderRadius:5
    },
    image:{
        height:height*0.4,
        width:width,
        alignSelf:"center"
    },
    name:{
        fontWeight:"600", 
        fontSize:width*0.10,
        marginLeft:width*0.05, 
        marginBottom:10,
        textTransform:"uppercase"
    },
    desc:{
        fontSize:width*0.04,
        marginLeft:width*0.05,
        marginRight:width*0.05,
        textAlign:"justify",
        overflow: "visible",
      
      
       
    },
    buttonContainer:{
       
       
        display:"flex", 
        flexDirection:"row", 
        alignSelf:"center",
        justifyContent:"center",
       
        marginVertical:20        
    },
    countText:{
        color:"#6979F8",
        fontWeight:"600",
        alignSelf:"center",
        fontSize:width*0.05
    },
    buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.05,
        


    },
    buttonView:{
        
        width:width, 
        height: width*0.12, 
        borderRadius:5, 
        backgroundColor:"#F15A4D", 
        justifyContent:"center"
    }
   
})

{/* <Text>Price: ${(product.price -(product.price * product.salePercent / 100)).toFixed(2)} {product.sale && "(On sale)"+ "$"+ product.price + " " + "%"+product.salePercent}</Text>
            <Text>TOTAL: ${((product.price -(product.price * product.salePercent / 100))*count).toFixed(2)}</Text> */}