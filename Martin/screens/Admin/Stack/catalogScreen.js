import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,FlatList } from 'react-native'
import {useState} from "react"
import axios from 'axios';
import { IP } from '../../../env';

export default function ProductCatalog({navigation}) {
    const [name,setName] = useState("")
    const [product,setProduct] = useState([])

    useEffect(()=>{
        axios.get(`${IP}/products?name=${name}`)
            .then(function(response){
                setProduct(response.data)
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
        style={{alignContent:"center",  marginVertical: 8,
        marginHorizontal: 100,}}>
            
            <TextInput 
            placeholder="Search product"
            onChangeText={handleSearch}
            value={name}/>
            
                <FlatList
               
                keyExtractor={item => item.id.toString()}
                data={product}
                renderItem={({item})=>
                    <View 
                    style={{margin: 10}}>
                        <TouchableOpacity
                        key={item.id} onPress={() => navigation.navigate("Edit Product",{id:item.id})}> 
                        <ImageBackground
                        key={item.id}
                        source={{ uri:item.img}}
                        style={{height: 200, width:200}}
                        >
                            
                          <Text>{item.name}</Text>
                       
                          </ImageBackground>
                          </TouchableOpacity>
                    </View>
                }
                />
            
                
            
        </View>
    )
}

// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//       },
//       image:{
//         width:"100px",
//         height:"120px",
//         marginRight:" 25px",
//         marginTop:"0px",
//         marginBottom:"0px",
//         boxShadow: "10px 5px 5px black",
//       },
//       product:{
         
//           justifyContent:"center",
      
//           marginVertical:"5px"
//       }
// })
