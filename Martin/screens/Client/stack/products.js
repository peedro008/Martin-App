import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import { IP } from '../../../env';




export default  function  Products ({route, navigation}) {
    let category = route.params.params
    
    const [cate, setCate]= useState([])
    useEffect(()=>{
        axios.get(`${IP}/productsCat?id=${category.id}`)
            .then(function(response){
                setCate(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    

    },[])

    
  
    return (
        <View>
            {
                cate?.map(el=>{
                    
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
  
       
      
//      return  (
//         <View>
//             <Button
//         title="product detail"
//         onPress={() => navigation.navigate("ProductDetail")}
//       />
            
//         </View>
//     )
// }

const styles = StyleSheet.create({})
