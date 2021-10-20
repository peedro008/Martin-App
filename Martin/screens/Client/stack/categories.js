import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { IP } from '../../../env';


export default function Categories({navigation}) {
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
            <View style={{marginTop:30}}>
                <View
                style={{alignItems:"center",height:50, width:400, backgroundColor:"white"}}>
                    <Text style={Styles.search}>
                        Search
                    </Text>
                </View>
                <SearchBar 
                inputContainerStyle={{backgroundColor:"white"}}
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                onChangeText={handleSearch}
                value={name}/>
            </View >
            <Text style={Styles.categories}>
            Categories
            </Text>
            
            
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
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                data={product}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity
                        key={item.id} onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                        <View>
                        <ImageBackground
                        key={item.id}
                        source={{ uri:item.img}}
                        style={Styles.imageProduct}      
                        >
                            
                          <Text style={Styles.nombre}>{item.name}</Text>
                          <View style={Styles.contPrice}>
                            <Text style={ Styles.price}> ${item.price}</Text>
                          </View>
                          </ImageBackground>
                            </View>
                      </TouchableOpacity>
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
               fontSize:25,
                color: "white",
                marginTop: 80,
                flex:1,
                alignSelf:"center",
                fontWeight: "bold"
    },
    image:{
      
        height:200,
        width:Dimensions.get('window').width /2,
    
    },
    imageProduct:{
        marginHorizontal:5,
        marginVertical:5, 
        borderRadius:15,
        overflow: 'hidden', 
        height:200,
        width:(Dimensions.get('window').width /2)-10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 1,
        position:"relative"
    },
    search:{
        marginTop:5,
        fontSize: 25,
        fontWeight: "bold"
    },
    categories:{
        marginTop:15,
        marginBottom:15,
        fontSize:25,
        fontWeight: "bold"
    },
    nombre:{
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 20,
        marginTop:15,
        marginBottom:15,
        alignSelf:"center"
    },
    contPrice:{
        position:"absolute",
        bottom:0,
        width:"100%"
    },
    price:{
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        paddingVertical:10,
        textAlign:"center",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 20, 
       color:"white"
    },
})        