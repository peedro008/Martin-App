import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions,} from 'react-native'
import { IP } from '../../../env';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Card, Image, SearchBar, Button } from 'react-native-elements';
import { addOrder } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux'


const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default  function  Products ({route, navigation}) {
    let category = route.params.params
    let iconName = "shopping-bag" 
    const dispatch= useDispatch();
    const [cate, setCate]= useState([])
    const [name, setName]= useState("")
    const [product,setProduct] = useState([])
    const [count, setCount] = useState({});
    const preOrder= useSelector(state=>state.PreOrder)



    useEffect(()=>{
        axios.get(`${IP}/productsCat?id=${category.id}`)
            .then(function(response){
                setCate(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    

    },[])

    const handleSearch=(name)=>{
        setName(name)
       
            axios.get(`${IP}/products?name=${name}`)
            .then(function(response){
                setProduct(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
        
 }

 let handleAddProduct=(product, count)=>{
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
           
            
        }else if( count===0){
            alert("Select the quantity")
        }
}
  
    useEffect(() => {
         let pes = {}
        for(let i=0;i<cate.length;i++){
        pes[i]=0    
       
        }
        setCount(pes)
    }, [cate])
   
  
    return (
        <View style={styles.container}>
            <View style={{marginTop:width*0.044}}>
                <View
                    style={{alignItems:"center",marginVertical:width*0.04, backgroundColor:"white"}}>
                        <Text style={styles.products}>{category.name}</Text>
                        <View style={{position:"absolute", right:0}}>
                            <Icon 
                            name='shopping-bag'
                            type="feather"
                            color='gray'
                            size={width*0.07 }
                            style={{marginTop:width*0.025, marginRight:width*0.03}}
                            />
                        </View>
                </View>
                <SearchBar 
                    inputContainerStyle={{backgroundColor:"white"}}
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={styles.searchBar}
                    onChangeText={handleSearch}
                    value={name}/>
            </View>
                <View style={{alignItems:"center",justifyContent:"center", width:width*0.9, flexDirection:"row"}}>  
                    
                    <View style={{position:"absolute", right:0}}>
                    
                   </View> 
                </View>
            {  
                !name ?

              <View style={styles.contProduct}>
                <FlatList
                keyExtractor={item => cate.indexOf(item)}
                numColumns={1}
                data={cate}
                renderItem={({item})=>{
                   
                    let id=cate.indexOf(item)

                    return(
                         
                    
                         <Card
                        key={item.id}
                        containerStyle={{elevation: 10,width:width*0.9, height:width*0.35, borderRadius:8 }}>
                          <View
                          style={{flexDirection:"row"}}>
                            
                            
                            
                            
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:item.categories.name})}>
                               
                            
                            <Image 
                            source={{uri: item.img}}
                            style={styles.image}
                            />

                            </TouchableOpacity>
                            <View style={{marginLeft:width*0.04, marginVertical:-3}}>
                                <TouchableOpacity
                                onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:item.categories.name})}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily:"OpenSans-Regular",marginBottom: width*0.01, fontSize:20, fontWeight:"600", width:width*0.4 }}>{item.name}</Text>
                                </TouchableOpacity>
                              
                                <Text style={{fontFamily:"OpenSans-Regular",marginTop:height*0.001}}>Price: $ {!item.salePercent ? item.price.toFixed(2) : ((item.price*(100-item.salePercent))/100).toFixed(2)}</Text>
                                <Text style={{fontFamily:"OpenSans-Regular",}}>Quantity: {count[id]}</Text>
                                <Text style={{fontFamily:"OpenSans-Regular",}}>Total: ${ (((item.price*(100-item.salePercent))/100)*count[id]).toFixed(2) }</Text>
                                
                                <View style={{flexDirection:"row"}}>
                                <TouchableOpacity
                                onPress={()=>handleAddProduct(item, count[id])} ><Text style={{fontFamily:"OpenSans-Bold",marginTop:width*0.01, fontSize:15, color:"green",textDecorationLine: 'underline'}}>Add to Cart</Text></TouchableOpacity>
                                </View>
                            </View>
                            <View style={{position:"absolute", display:"flex", right:0, marginTop:height*0.01}}> 
                                <TouchableOpacity 
                                onPress={() => setCount({...count, [id]:count[id]+1  }) }
                                style={ styles.minibutton  }>
                                    <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>+</Text>
                                </TouchableOpacity>
                                
                                <View style={styles.count}>
                                    <Text style={styles.countText}>{count[id]}</Text>
                                </View>
                                <TouchableOpacity
                                 onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                                style={ styles.minibutton  }
                                >
                                    <Text
                                    style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"bold"}}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                            </View>
                                        
                            </View>
                        </Card>
               
                    )
                }}
                /> 
            </View> 
            :
            
                <FlatList
                keyExtractor={item => product.indexOf(item)}
                numColumns={1}
                data={product}
                renderItem={({item})=>{
                   
                    let id=product.indexOf(item)
                return(
                         
                   
                    <Card
                    key={item.id}
                    containerStyle={{elevation: 10,width:width*0.9, height:width*0.35, borderRadius:8 }}>
                      <View
                      style={{flexDirection:"row"}}>
                        
                        
                        
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:item.categories.name})}>
                           
                        
                        <Image 
                        source={{uri: item.img}}
                        style={styles.image}
                        />

                        </TouchableOpacity>
                        <View style={{marginLeft:width*0.04, marginVertical:-3}}
                        >
                            <TouchableOpacity
                            onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:item.categories.name})}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily:"OpenSans-Regular",marginBottom: width*0.01, fontSize:20, fontWeight:"600", width:width*0.4,  }}>{item.name}</Text>
                            </TouchableOpacity>
                          
                            <Text style={{fontFamily:"OpenSans-Regular",marginTop:height*0.001,}}>Price: $ {!item.salePercent ? item.price.toFixed(2) : ((item.price*(100-item.salePercent))/100).toFixed(2)}</Text>
                            <Text style={{fontFamily:"OpenSans-Regular"}}>Quantity: {count[id]}</Text>
                            <Text style={{fontFamily:"OpenSans-Regular"}}>Total: ${ (((item.price*(100-item.salePercent))/100)*count[id]).toFixed(2) }</Text>
                            
                            
                            <TouchableOpacity
                            onPress={()=>handleAddProduct(item, count[id])} ><Text style={{fontFamily:"OpenSans-Bold",marginTop:width*0.01, fontSize:15, color:"green",textDecorationLine: 'underline'}}>Add to Cart</Text></TouchableOpacity>
                        </View>
                        <View style={{position:"absolute", display:"flex", right:0, marginTop:height*0.01}}> 
                            <TouchableOpacity 
                            onPress={() => setCount({...count, [id]:count[id]+1  }) }
                            style={ styles.minibutton  }>
                                <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>+</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.count}>
                                <Text style={styles.countText}>{count[id]}</Text>
                            </View>
                            <TouchableOpacity
                             onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                            style={ styles.minibutton  }
                            >
                                <Text
                                style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"bold"}}>
                                    -
                                </Text>
                            </TouchableOpacity>
                        </View>
                                    
                        </View>
                    </Card>

               )
            }}
            />
            
            
           

            }

            
        </View>
    )
        }
          
       
      
//      return  (
//         <View>
//             <Button
//         title="product detail"
//         onPress={() => navigation.navigate("ProductDetail")}
//       />
            
//         </View>
//     )
// }

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flex:1,
        backgroundColor:"#fff",
          
    },
    search:{
        marginTop:width*0.018,
        fontSize: width*0.07,
        fontWeight: "600",
        fontFamily:"OpenSans-Regular"
        
    },
    searchBar:{
        marginVertical:width*0.01,
        marginBottom: width*0.05,
        alignSelf:"center", 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width-10
    },
    products:{
        marginVertical:width*0.01,
        marginBottom:-width*0.001,
        fontSize:width*0.07,
        fontWeight: "600",
        alignSelf:"center",
        textAlign:"center",
        fontFamily:"OpenSans-Regular"
    
    },
    nombre:{
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: width*0.05,
        marginTop:15,
        marginBottom:15,
        alignSelf:"center",
        fontFamily:"OpenSans-Regular"
    },
    contPrice:{
        position:"absolute",
        bottom:0,
        width:"100%"
    },
    count:{
        //marginLeft:9,
       // marginRight:9,
       marginVertical:6, 
       borderRadius:8,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 2,
        height:width*0.07,
        width:width*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    price:{
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        paddingVertical:10,
        textAlign:"center",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: width*0.05, 
       color:"white",
       fontFamily:"OpenSans-Regular"
    },
    image:{
        marginHorizontal:5,
        marginVertical:5, 
        borderRadius:10,
        height:width*0.245,
        width:width*0.245,
      //  shadowRadius:45,
        position:"relative"
    },
    product:{
       elevation:100
    },
    buttonContainer:{
       
        paddingRight:1,
        
        flexDirection:"column", 
       
       
     
    },
    minibutton:{
        borderRadius:8,
        shadowColor: 'rgba(0,0,0, .2)',
        position:"relative",
        display:"flex",
        
        shadowOffset: { 
        height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 4,
        height: width*0.07,
        width: width*0.07,
        justifyContent: 'center',
        alignItems: 'center',
      
       
    },
   
})
