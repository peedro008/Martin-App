import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,ImageBackground,Dimensions, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { SearchBar, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { IP } from '../../../env';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../../actions';

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default function Categories({navigation}) {
    const [name,setName] = useState("")
    const [products,setProducts] = useState([])
    const [categories, setCategories]= useState([])
    const [count, setCount] = useState({});
    const preOrder= useSelector(state=>state.PreOrder)

    const dispatch= useDispatch();

    useEffect(()=>{
        axios.get(`${IP}/categories`)
            .then(function(response){
                setCategories(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
            
             

    },[])
    
     const handleSearch=(name)=>{
            setName(name)
           
                axios.get(`${IP}/products?name=${name}`)
                .then(function(response){
                    setProducts(response.data)
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
        let pes = {}
        for(let i=0;i<products.length;i++){
        pes[i]=0    
        }
        setCount(pes)
 }
 useEffect(() => {
    let pes = {}
   for(let i=0;i<products.length;i++){
   pes[i]=0    
  
   }
   setCount(pes)
}, [products])

    

    return (
    
        <View
        style={{backgroundColor:"#fff", alignItems:"center", flex: 1}}>
            <View style={{marginTop:width*0.044}}>
                <View
                style={{alignItems:"center",marginVertical:width*0.04, backgroundColor:"white"}}>
                    <Text style={Styles.search}>
                        Categories
                    </Text>
                    <View style={{position:"absolute", right:0}}>

                        <Icon 
                        name='shopping-bag'
                        type="feather"
                        color='gray'
                        size={width*0.07 }
                        style={{marginTop:width*0.035, marginRight:width*0.04}}
                        />
                    </View>
                </View>
                
                <SearchBar 
                inputContainerStyle={{backgroundColor:"white"}}
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={Styles.searchBar}
                onChangeText={handleSearch}
                placeholder="Search..."
                value={name}/> 
            </View >
            <View style={{alignItems:"center",justifyContent:"center", width:width*0.9, flexDirection:"row"}}>
               
               
            </View>
            {
             !name? 
             
             <FlatList
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                data={categories}
                renderItem={({item})=>
                    <View>
                        <TouchableOpacity  onPress={() => navigation.navigate("Products", {params: item})}>
                            <ImageBackground 
                            source={{uri:item.img}}
                            style={Styles.image}>
                            <Text style={Styles.cardText}>
                            {item.name}
                            </Text>
                        </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    
                }
                />
                
                   
                     
                    
                    
                
                : <FlatList
                key={"_"}
                keyExtractor={item => "_" + products.indexOf(item)}
                numColumns={1}
                data={products}
                renderItem={({item})=>{
                   
                    let id=products.indexOf(item)
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
                        style={Styles.imageCard}
                        />

                        </TouchableOpacity>
                        <View style={{marginLeft:width*0.04, marginVertical:-3}}
                        >
                            <TouchableOpacity
                            onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:item.name})}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{marginBottom: width*0.01, fontSize:20, fontWeight:"600", width:width*0.4 }}>{item.name}</Text>
                            </TouchableOpacity>
                          
                            <Text style={{marginTop:height*0.001}}>Price: $ {item.price}</Text>
                            <Text>Quantity: {count[id]}</Text>
                            <Text>Total: {(item.price*count[id]).toFixed(2)}</Text>
                            
                            
                            <TouchableOpacity
                            onPress={()=>handleAddProduct(item, count[id])} ><Text style={{marginTop:width*0.01, fontSize:15, color:"green",textDecorationLine: 'underline'}}>Add to Cart</Text></TouchableOpacity>
                        </View>
                        <View style={{position:"absolute", display:"flex", right:0, marginTop:height*0.01}}> 
                            <TouchableOpacity 
                            onPress={() => setCount({...count, [id]:count[id]+1  }) }
                            style={ Styles.minibutton  }>
                                <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>+</Text>
                            </TouchableOpacity>
                            
                            <View style={Styles.count}>
                                <Text>{count[id]}</Text>
                            </View>
                            <TouchableOpacity
                             onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                            style={ Styles.minibutton  }
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



// // const styles = StyleSheet.create({
// //     input: {
// //         height: 40,
// //         margin: 12,
// //         borderWidth: 1,
// //         padding: 10,
// //       },
// // })
// {/* <View>
                        
const Styles= StyleSheet.create({
    cardText:{
                fontSize:width*0.07,
                color: "white",
                marginTop: 80,
                flex:1,
                alignSelf:"center",
                fontWeight: "bold",
                fontFamily:"OpenSans-Bold"
    },
    image:{
      
        height:200,
        width:Dimensions.get('window').width /2,
    
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
    imageProduct:{
        marginHorizontal:5,
        marginVertical:5, 
        borderRadius:15,
        overflow: 'hidden', 
        height:width*0.4,
        width:(width /2)-10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 1,
        position:"relative"
    },
    search:{
        marginTop:width*0.018,
        fontSize: width*0.07,
        fontWeight: "600",
        fontFamily:"OpenSans-Regular"
    },
    categories:{
        marginVertical:width*0.04,
        fontSize:width*0.07,
        fontWeight: "600",
        alignSelf:"center",
        textAlign:"center",
        fontFamily:"OpenSans-Regular"
        
    },
    nombre:{
        fontStyle: "normal",
       fontWeight: "500",
        fontSize: 20,
        marginTop:15,
        marginBottom:15,
        alignSelf:"center",
        fontFamily:"OpenSans-Regular"
    },
    contPrice:{
        position:"absolute",
        bottom:0,
        width:"100%",
        fontFamily:"OpenSans-Regular"
    },
    price:{
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        paddingVertical:10,
        textAlign:"center",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20, 
       color:"white",
       fontFamily:"OpenSans-Regular"
    },
    imageCard:{
        marginHorizontal:5,
        marginVertical:5, 
        borderRadius:10,
        height:width*0.245,
        width:width*0.245,
      //  shadowRadius:45,
        position:"relative"
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