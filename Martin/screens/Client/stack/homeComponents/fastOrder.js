import React, { useState, useEffect,useLayoutEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions,} from 'react-native'
import { IP } from '../../../../env';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Card, Image, SearchBar, Button } from 'react-native-elements';
import { addOrder } from "../../../../actions"
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../clientCartComponents/loading'

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default  function  Products ({route, navigation}) {
    let orderItems = route.params.order.orderItems
    let date = route.params.order.createdAt.substring(0,10)
    const dispatch= useDispatch();
    
    const [name, setName]= useState("")
    const [product,setProduct] = useState([])
    const [count, setCount] = useState({});
    const [final, setFinal] = useState([]);
    const preOrder= useSelector(state=>state.PreOrder)






    
    const handleSearch=(name)=>{
        
        setName(name)
       console.log(final)
        setProduct(final.filter(e=>e.name.toLowerCase().includes(name.toLowerCase())))
        
     
 }
 const pes=()=>{
     let tob=[]
     for(let i=0;i<orderItems.length;i++){
            axios.get(`${IP}/products?name=${orderItems[i].name}`)
            .then(res=> tob.push(res.data[0]))
         }

         setTimeout(()=>{
             setFinal(tob)       
        },500)
    }
    useEffect(() => {
        
        pes ()
    }, [])


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
        for(let i=0;i<orderItems.length;i++){
        pes[i]=0    
       
        }
        setCount(pes)
        
}
  
    useEffect(() => {
         let pes = {}
        for(let i=0;i<orderItems.length;i++){
        pes[i]=0    
      
        }
        setCount(pes) 
       
    }, [])
    
   
   return (
        <View style={styles.container}>
           { 
            final.length ?
           <View>
            <View style={{marginTop:width*0.044}}>
                <View
                    style={{alignItems:"center",marginVertical:width*0.04, marginBottom:width*-0.001, backgroundColor:"#FFF"}}>
                        <Text style={styles.products}>Fast Order</Text>
                        
                </View>
                <View style={{alignSelf:"center", fontFamily:"OpenSans-Regular", marginBottom:width*0.06 }}><Text>{date}</Text></View>
                <SearchBar 
                    inputContainerStyle={{backgroundColor:"#fff",height:width*0.1}}
                    inputStyle={{height:width*0.1,backgroundColor: 'white'}}
                    containerStyle={styles.searchBar}
                    onChangeText={handleSearch}
                    placeholder="Search..."
                    value={name}/>
            </View>
                <View style={{alignItems:"center",justifyContent:"center", width:width*0.9, flexDirection:"row"}}>  
                    
                    <View style={{position:"absolute", right:0}}>
                    
                   </View> 
                </View>
            {  !name ?
             
                
              <View style={{flex:1}}>
                 
                <FlatList
                keyExtractor={item => final.indexOf(item)}
                numColumns={1}
                contentContainerStyle={{paddingBottom:width*0.1}}
                data={final}
                renderItem={({item})=>{
                   
                    let id=final.indexOf(item)
                    
                    {
                        return(
                         


                            <Card  key={item.id} containerStyle={styles.card}>
                              
                              
                                <View style={{flexDirection:"row"}}>
                               
                               
                                    <TouchableOpacity
                                    onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                                        <Image 
                                            source={{uri: item.img}}
                                            style={styles.image}/>
                                    </TouchableOpacity>
                            
                                  
                                    <View >
                                        <View style={{marginLeft:width*0.03, marginTop:-width*0.02}}>
                                            <TouchableOpacity
                                            onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                
                                        <View style={{marginLeft:width*0.03,}}>
                                        
                                            <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034,}}>Price: $ {!item.salePercent ? item.price.toFixed(2) : ((item.price*(100-item.salePercent))/100).toFixed(2)}</Text>
                                            <View style={{flexDirection:"row"}}>
                                                <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034}}>Quantity:</Text>
                                                <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.034, color:"gray"}}> x{count[id]}</Text>
                                            </View>
                                            <Text style={{fontSize:width*0.034}}>Total: $ { (((item.price*(100-item.salePercent))/100)*count[id]).toFixed(2) }</Text>
                                    
                                            <View style={{flexDirection:"row", marginTop:width*0.01}}>
                                            
                                            <TouchableOpacity
                                             style={{marginRight:width*0.02}}
                                                
                                                onPress={()=>handleAddProduct(item, count[id])} ><Icon type="feather" name="shopping-cart" size={width*0.052} color={count[id]>0?"#40D3A8":"#8a8a8a"}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                style={{alignSelf:"center"}}
                                                onPress={()=>handleAddProduct(item, count[id])} ><Text style={{fontFamily:"OpenSans-Bold", fontSize:width*0.033, color:count[id]>0?"#40D3A8":"#8a8a8a",textDecorationLine: 'underline'}}>Add to Cart</Text>
                                                </TouchableOpacity>
                                                
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{position:"absolute", display:"flex", right:0, marginTop:-width*0.01}}> 
                                        <TouchableOpacity 
                                        onPress={() => setCount({...count, [id]:count[id]+1  }) }
                                        style={ styles.minibutton  }>
                                            <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#8a8a8a", fontWeight:"600"}}>+</Text>
                                        </TouchableOpacity>
                                        
                                        <View style={styles.count}>
                                            <Text style={{fontSize:width*0.04}}>{count[id]}</Text>
                                        </View>

                                        <TouchableOpacity
                                        onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                                        style={ styles.minibutton  }
                                        >
                                            <Text
                                            style={{fontSize: width*0.06, alignSelf:"center", color:"#8a8a8a", fontWeight:"bold"}}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>

                    )}
                }}
                /> 
            </View> 
            :
                product.length ?
                <FlatList
                keyExtractor={item => product.indexOf(item)}
                numColumns={1}
                data={product}
                renderItem={({item})=>{
                   
                    let id=product.indexOf(item)
                return(
                         
                   
                    <Card  key={item.id} containerStyle={styles.card}>
                              
                                <View style={{flexDirection:"row"}}>
                               
                               
                                    <TouchableOpacity
                                    onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                                        <Image 
                                            source={{uri: item.img}}
                                            style={styles.image}/>
                                    </TouchableOpacity>
                            
                                  
                                    <View>
                                        <View style={{marginLeft:width*0.03, marginTop:-width*0.02}}>
                                            <TouchableOpacity
                                            onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.name}</Text>
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
                                        style={ styles.minibutton  }>
                                            <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#8a8a8a", fontWeight:"600"}}>+</Text>
                                        </TouchableOpacity>
                                        
                                        <View style={styles.count}>
                                            <Text style={{fontSize:width*0.04}}>{count[id]}</Text>
                                        </View>

                                        <TouchableOpacity
                                        onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                                        style={ styles.minibutton  }
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
            : <Text style={{fontSize:width*0.035,alignSelf:"center",fontFamily:"OpenSans-Regular"}}>No results</Text>

            }

            </View>
            :
            <Loading/>
            }
        </View>
    )
        }
          
       
      


const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flex:1,
        backgroundColor:"#FFF",
          
    },
    search:{
        marginTop:width*0.018,
        fontSize: width*0.07,
        fontWeight: "600",
        fontFamily:"OpenSans-Regular"
        
    },
    searchBar:{
        marginVertical:width*0.01,
       
        marginBottom: width*0.005,
        alignSelf:"center", 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        justifyContent:"center",
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width*0.9,
        height:width*0.11
    },
    products:{
        textAlign:"center",
        marginTop:width*0.05,
        marginBottom:width*0.005,
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
    
    },

    contPrice:{
        position:"absolute",
        bottom:0,
        width:"100%"
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
 
    image:{
       
        marginVertical:width*0.0008,
        marginHorizontal:width*0.0008,
        borderRadius:5,
        height:width*0.236,
        width:width*0.236,
        shadowRadius:45,
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
        height: width*0.075,
        width: width*0.075,
        justifyContent: 'center',
        alignItems: 'center',
      
       
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
    title:{
        fontFamily:"OpenSans-SemiBold",
        marginTop: width*0.005, 
        fontSize:width*0.045, 
        fontWeight:"600", 
        width:width*0.4 }

   
})
