import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,ImageBackground } from 'react-native'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler'
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
        <View>
            <TextInput 
            placeholder="Search product"
          
            onChangeText={handleSearch}
            value={name}/>
            
            
            {
             !name ? categories?.map(el=>{
                    return(
                    <Button
                        key={el.id}
                        title={el.name}
                        onPress={() => navigation.navigate("Products", {params: el})}
                    />
                    )
                })
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



// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//       },
// })