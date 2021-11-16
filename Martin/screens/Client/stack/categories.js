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
        style={{backgroundColor:"#FFF", alignItems:"center", flex: 1, paddingBottom:width*0.5}}>
            <View style={{marginTop:width*0.044}}>
                <View
                style={{alignItems:"center",marginVertical:width*0.04, backgroundColor:"white"}}>
                    <Text style={Styles.search}>
                        Categories
                    </Text>
                    
                </View>
                
                <SearchBar 
                inputContainerStyle={{backgroundColor:"#fff",height:width*0.08}}
                inputStyle={{height:width*0.08,backgroundColor: 'white'}}
                containerStyle={Styles.searchBar}
                onChangeText={handleSearch}
                placeholder="Search..."
                value={name}/> 
            </View >
           
            {
             !name? 
             <View style={{marginTop:-10}}>
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
            
                            <View style={{width:Dimensions.get('window').width /2,height:Dimensions.get('window').width /2,backgroundColor:"rgba(81, 90, 90 ,0.35)",justifyContent:"center"}}>
                                <View style={{alignItems:"center",alignSelf:"center", height:width*0.3,width:width*0.42}}>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.cardText}>
                                    {item.name}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    
                }
                />
                
                   
                     </View>
                    
                    
                
                : 
                products.length ?
             
                <FlatList
                key={"_"}
                keyExtractor={item => "_" + products.indexOf(item)}
                numColumns={1}
                data={products}
                renderItem={({item})=>{
                   
                    let id=products.indexOf(item)
                return(
                         
                   
                    <Card  key={item.id} containerStyle={Styles.card}>
                              
                    <View style={{flexDirection:"row"}}>
                   
                   
                        <TouchableOpacity
                        onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                            <Image 
                                source={{uri: item.img}}
                                style={Styles.imageSearch}/>
                        </TouchableOpacity>
                
                      
                        <View>
                            <View style={{marginLeft:width*0.03, marginTop:-width*0.02}}>
                                <TouchableOpacity
                                onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.title}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                    
                            <View style={{marginLeft:width*0.03,}}>
                            
                                <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034,}}>Price: $ {!item.salePercent ? item.price.toFixed(2) : ((item.price*(100-item.salePercent))/100).toFixed(2)}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034}}>Quantity:</Text>
                                    <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034, color:"gray"}}> x{count[id]}</Text>
                                </View>
                                <Text style={{fontSize:width*0.034}}>Total: $ { (((item.price*(100-item.salePercent))/100)*count[id]).toFixed(2) }</Text>
                        
                                <View style={{flexDirection:"row", }}>
                                
                                    <TouchableOpacity
                                    onPress={()=>handleAddProduct(item, count[id])} ><Text style={{fontFamily:"OpenSans-Bold", fontSize:width*0.04, color:"#40D3A8",textDecorationLine: 'underline'}}>Add to Cart</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </View>
                        <View style={{position:"absolute", display:"flex", right:0, marginTop:-width*0.01}}> 
                            <TouchableOpacity 
                            onPress={() => setCount({...count, [id]:count[id]+1  }) }
                            style={ Styles.minibutton  }>
                                <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#8a8a8a", fontWeight:"600"}}>+</Text>
                            </TouchableOpacity>
                            
                            <View style={Styles.count}>
                                <Text style={{fontSize:width*0.04}}>{count[id]}</Text>
                            </View>

                            <TouchableOpacity
                            onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                            style={ Styles.minibutton  }
                            >
                                <Text
                                style={{fontSize: width*0.06, alignSelf:"center", color:"#8a8a8a", fontWeight:"bold"}}>
                                    -
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

               )
            }}
            />
            :<Text style={{fontSize:width*0.035,alignSelf:"center",fontFamily:"OpenSans-Regular"}}>No results</Text>
            
                
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
                flex:1,
                textAlign:"center",
                marginTop:width*0.08,
                width:width*0.42,
                fontFamily:"OpenSans-Bold",
                // lineHeight:32s
                
    },
    image:{
        height:Dimensions.get('window').width /2,
        width:Dimensions.get('window').width /2,
    
    },
    searchBar:{
        marginVertical:width*0.01,
        marginBottom: width*0.05,
        alignSelf:"center", 
        backgroundColor: '#fff', 
        borderWidth: 1, 
        borderRadius: 5,
        justifyContent:"center",
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width-10,
        height:width*0.09
    },
    // imageProduct:{
    //     marginHorizontal:5,
    //     marginVertical:5, 
    //     borderRadius:15,
    //     overflow: 'hidden', 
    //     height:width*0.4,
    //     width:(width /2)-10,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 5,
    //     elevation: 1,
    //     position:"relative"
    // },
    search:{
        textAlign:"center",
        marginTop:width*0.047,
        marginBottom:width*0.01,
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
    },
    categories:{
        marginVertical:width*0.04,
        fontSize:width*0.07,
        fontWeight: "600",
        alignSelf:"center",
        textAlign:"center",
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
    card:{ 
        width:width*0.9,
        height:width*0.315,
        marginVertical:width*0.035,
        elevation:8,
        shadowColor: "grey",
       shadowOffset: {
             width: 0,
             height: 5,
        },
         shadowOpacity: 0.34,
         shadowRadius: 6.27,
         borderRadius:8 
    },
    imageSearch:{
       
        marginVertical:width*0.0008,
        marginHorizontal:width*0.0008,
        borderRadius:5,
        height:width*0.236,
        width:width*0.236,
        shadowRadius:45,
        position:"relative"
    },
    count:{
      
        marginVertical:width*0.017, 
        borderRadius:8,
         shadowColor: 'rgba(0,0,0, .4)',
         shadowOffset: { height: 1, width: 1 },
         shadowOpacity: 1,
         shadowRadius: 1,
         backgroundColor: '#fff',
         elevation: 2,
         height:width*0.075,
         width:width*0.075,
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
        height: width*0.075,
        width: width*0.075,
        justifyContent: 'center',
        alignItems: 'center',
      
       
    },
    title:{
        fontFamily:"OpenSans-SemiBold",
        marginTop: width*0.005, 
        fontSize:width*0.045, 
        fontWeight:"600", 
        width:width*0.4 }

})        