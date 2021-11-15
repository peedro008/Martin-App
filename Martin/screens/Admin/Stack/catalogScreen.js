import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View,TouchableOpacity, ImageBackground, Dimensions,} from 'react-native'
import { IP } from '../../../env';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Card, Image, SearchBar, Button } from 'react-native-elements'
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

 
  
    
   
  
    return (
        <View style={styles.container}>
            <View style={{marginTop:width*0.044}}>
                <View
                    style={{alignItems:"center",marginVertical:width*0.04, backgroundColor:"white"}}>
                        <Text style={styles.products}>{category.name}</Text>
                        <View style={{position:"absolute", right:0}}>
                            <Icon 
                            name='edit'
                            type="feather"
                            color='gray'
                            size={width*0.07 }
                            style={{marginTop:width*0.025, marginRight:width*0.03}}
                            />
                        </View>
                </View>
                <SearchBar 
                    inputContainerStyle={{backgroundColor:"#fff",height:width*0.08}}
                    inputStyle={{backgroundColor: 'white',height:width*0.08}}
                    containerStyle={styles.searchBar}
                    onChangeText={handleSearch}
                    placeholder="Search..."
                    value={name}/>
            </View>
                <View style={{alignItems:"center",justifyContent:"center", width:width*0.9, flexDirection:"row"}}>  
                    
                    <View style={{position:"absolute", right:0}}>
                    
                   </View> 
                </View>
                {
                    !name ?
                    <FlatList
                    keyExtractor={item => item.id.toString()}
                    numColumns={1}
                    data={cate}
                    renderItem={({item})=>{
                        return(
                            <View style={styles.containerProduct}>
                                <View style={styles.circle}>
                                    <Icon name="edit-3" type="feather" color="#fff"/>
                                </View>
                                <View  style={{marginLeft:18.35, width:width*0.41}}>
                                    <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{textTransform:"capitalize",fontWeight: "600",fontSize: width*0.05,color:"#151522"}}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontWeight:"600",fontSize:width*0.04, color:"#999999"}}>{item.sale ? item.salePercent+"% Off" : "No Offer" }</Text>
                                </View>
                                <View style={{position:"absolute",right:0, flexDirection:"row", justifyContent:"flex-end",marginRight:25}}>
                                    <Text style={{fontSize:width*0.045, color:"#00C48C", fontWeight:"300", marginRight:16.14}}>{"$"+item.price}</Text>
                                    <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                    <Icon name="chevron-right" type="feather" color="#999999"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                        
                    /> : 
                        product.length ?
                    <FlatList
                    key={"_"}
                    keyExtractor={item => "_" + item.id.toString()}
                    numColumns={1}
                    data={product}
                    renderItem={({item})=>{
                        return(
                            <View style={styles.containerProduct}>
                                <View style={styles.circle}>
                                    <Icon name="edit-3" type="feather" color="#fff"/>
                                </View>
                                <View  style={{marginLeft:18.35, width:width*0.41}}>
                                    <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{textTransform:"capitalize",fontWeight: "600",fontSize: width*0.05,color:"#151522"}}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontWeight:"600",fontSize:width*0.04, color:"#999999"}}>{item.sale ? item.salePercent+"% Off" : "No Offer" }</Text>
                                </View>
                                <View style={{position:"absolute",right:0, flexDirection:"row", justifyContent:"flex-end",marginRight:25}}>
                                    <Text style={{fontSize:width*0.045, color:"#00C48C", fontWeight:"300", marginRight:16.14}}>{"$"+item.price}</Text>
                                    <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                    <Icon name="chevron-right" type="feather" color="#999999"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                        
                    />
                  :  <Text style={{fontSize:width*0.035,alignSelf:"center",fontFamily:"OpenSans-Regular"}}>No results</Text>
                }

            
       </View>
    
        )

}
          
       


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
        
    },
    searchBar:{
        marginVertical:width*0.01,
        marginBottom: width*0.05,
        alignSelf:"center", 
        backgroundColor: 'white', 
        justifyContent:"center",
        borderWidth: 1, 
        borderRadius: 5,
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width-10,
        height:width*0.09
    },
    products:{
        marginVertical:width*0.01,
        marginBottom:-width*0.001,
        fontSize:width*0.07,
        fontWeight: "600",
        alignSelf:"center",
        textAlign:"center",
        textTransform:"capitalize"
    },
    containerProduct:{
        width:width,
        height:88,
        flexDirection:"row",
        alignItems:"center",
          
    },
    
    circle:{
        width:60,
        height:60,
        backgroundColor:"rgba(61, 99, 157,0.7)",
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:25
    }
   
})