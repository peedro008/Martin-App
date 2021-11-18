import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,ImageBackground,Dimensions, } from 'react-native'
import { Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { IP } from '../../../env';

const width=Dimensions.get("window").width

export default function AdminCategories({navigation}) {
    const [name,setName] = useState("")
    const [product,setProduct] = useState([])
    const [categories, setCategories]= useState([])

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
                    setProduct(response.data)
                })
                .catch(error=>{
                  console.log(error)  
                })
            
     }

    

    return (
    
        <View
        style={{backgroundColor:"#fff", alignItems:"center", flex: 1}}>
            <View>
                
                    <Text style={Styles.header}>
                        Categories
                    </Text>
                   
                
                
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
             
             <FlatList
                keyExtractor={item => item.id.toString()}
                
                numColumns={2}
                data={categories}
                renderItem={({item})=>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate("Catalog Screen", {params: item})}
>
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
                /> :  
                    
                product.length ?
              
                <FlatList
                key={"_"}
                keyExtractor={item => "_" + item.id.toString()}
                numColumns={1}
                data={product}
                renderItem={({item})=>{
                    return(
                        <View style={Styles.containerProduct}>
                            <View style={Styles.circle}>
                                <Icon size={width*0.06} name="edit-3" type="feather" color="#fff"/>
                            </View>
                            <View  style={{marginLeft:width*0.05, width:width*0.41}}>
                                <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{textTransform:"capitalize",fontWeight: "600",fontSize: width*0.05,color:"#151522", fontFamily:"OpenSans-Regular"}}>{item.name}</Text>
                                </TouchableOpacity>
                                <Text style={{fontWeight:"600",fontSize:width*0.04, color:"#999999",fontFamily:"OpenSans-Regular"}}>{item.sale ? item.salePercent+"% Off" : "No Offer" }</Text>
                            </View>
                            <View style={{position:"absolute",right:0, flexDirection:"row", justifyContent:"flex-end",marginRight:width*0.065}}>
                                <Text style={{fontSize:width*0.045, color:"#00C48C", marginRight:width*0.03,fontFamily:"OpenSans-SemiBold"}}>{"$"+item.price.toFixed(2)}</Text>
                                <TouchableOpacity  onPress={() => navigation.navigate("Edit Product",{id:item.id})}>
                                <Icon size={width*0.06} name="chevron-right" type="feather" color="#999999"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
                    
                /> : <Text style={{fontSize:width*0.035,alignSelf:"center",fontFamily:"OpenSans-Regular"}}>No results</Text>
                
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
        // lineHeight:32
    },
    image:{
      
        height:Dimensions.get('window').width /2,
        width:Dimensions.get('window').width /2,
    },
    searchBar:{
        marginVertical:width*0.01,
        marginBottom: width*0.05,
        alignSelf:"center", 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        justifyContent:"center",
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width-10,
        height:width*0.09
    },

    header:{
        textAlign:"center",
        marginTop:width*0.09,
        marginBottom:width*0.05,
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
    },
    containerProduct:{
        width:width,
        marginVertical:width*0.035,
        flexDirection:"row",
        alignItems:"center",  
        flex:1 
    },
    
    circle:{
        width:width*0.15,
        height:width*0.15,
        backgroundColor:"rgba(61, 99, 157,0.7)",
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:width*0.065
    }
})        