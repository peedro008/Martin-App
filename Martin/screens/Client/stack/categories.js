import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,ImageBackground } from 'react-native'
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
        style={{ alignItems:"center", flex: 1}}>
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
                   
                     
                    
                    
                
                : product.map(el=>{
                    return(
                        <TouchableOpacity
                        key={el.id} onPress={() => navigation.navigate("ProductDetail",{id:el.id})}>
                        <View>
                        <ImageBackground
                        key={el.id}
                        source={{ uri:el.img}}
                        style={{ width: 100, height: 100 }}     
                        >
                            
                          <Text>{el.name}</Text>
                       
                          </ImageBackground>
                            </View>
                      </TouchableOpacity>
                    )
                })
                
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
        width: 206,
         height:200
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
    }
})        