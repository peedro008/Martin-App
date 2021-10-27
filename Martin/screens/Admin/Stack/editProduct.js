import React,{useState,useEffect}from 'react'
import { StyleSheet, Text, View, Image, Button,} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import {updateProduct} from '../../../actions'
import { useDispatch } from 'react-redux';
import { IP } from '../../../env';


export default function editProduct({route}) {
    const {id}=route.params
    const [product, setProduct]= useState({});
    const dispatch= useDispatch()

    useEffect(()=>{
        axios.get(`${IP}/products?id=${id}`)
            .then(function(response){
                setProduct(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
             
        },[])

        const handleDescription=(description)=>{
            setProduct(
               {
                   ...product,
                   description
               }
            )
        }
        const handlePrice=(price)=>{
            setProduct(
               {
                   ...product,
                   price
               }
            )
        }

      
        
        const handleSale=(value)=>{  
            setProduct(
                {
                    ...product,
                    sale:!product.sale
                }
             )
             console.log(product.sale)
        }

        const handleUpdate=()=>{
                dispatch(updateProduct(product.price, product.id))
        }
    return (
        <View>
            <View>
                 <Text>{product.name}</Text>
                 <Image  source={{uri: product.img}} style={{width: 150,
                 height: 150}}/>
                <TextInput multiline={true} numberOfLines={6}   value={product.description} onChangeText={handleDescription}/>
                <hr/>
                <View style={styles.editProduct}>
                    <Text><b>Price:</b> USD </Text>
                    <TextInput  style={styles.textInput} value={product.price} onChangeText={handlePrice}/> 
                </View>
                <hr></hr> 
                <View style={styles.editProduct}>
                    <Text><b> On sale:</b> </Text>
                    <Picker  onValueChange={(value)=>handleSale(value)}>
                        <Picker.Item label="Yes" value={product.sale ? "yes": "no"}></Picker.Item>
                        <Picker.Item label="No" value={!product.sale ? "yes": "no"}></Picker.Item>
                    </Picker>                
                </View>
                <Button title="Update Product" onPress={()=>handleUpdate()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput:{
       borderBottomWidth:1,
       borderColor: 'gray'
    },
    editProduct:{
        display:"flex",
        flexDirection:"row"
    }
})
