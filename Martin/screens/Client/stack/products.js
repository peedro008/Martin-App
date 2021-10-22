import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions,} from 'react-native'
import { IP } from '../../../env';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const width=Dimensions.get("window").width

export default  function  Products ({route, navigation}) {
    let category = route.params.params
    let iconName = "shopping-bag"
    const [cate, setCate]= useState([])
    const [name, setName]= useState("")
    const [product,setProduct] = useState([])

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
            <View style={{marginTop:30}}>
                <View
                    style={{alignItems:"center",height:50, width:400, backgroundColor:"white"}}>
                        <Text style={styles.search}>
                            Search
                        </Text>
                </View>
                <SearchBar 
                    inputContainerStyle={{backgroundColor:"white"}}
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{marginTop:20, alignSelf:"center", backgroundColor: 'white', borderWidth: 1, borderRadius: 5, width:width-10}}
                    onChangeText={handleSearch}
                    value={name}/>
            </View>
                <View style={{display:"flex", width:Dimensions.get("window").width, flexDirection:"row"}}>  
                    <Text style={styles.products}>{category.name}</Text>
                    <View style={{position:"absolute", right:18, top:19}}>
                    <Icon
                    name='shopping-bag'
                    type="feather"
                    color='gray'
                    size={width*0.07}
                    />
                   </View> 
                </View>
            {  
                !name ?

              <View style={styles.contProduct}>
                <FlatList
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                data={cate}
                renderItem={({item})=>{
                    return(
                        
                         
                        <TouchableOpacity
                        key={item.id} onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:category.name})}>
                        <View style={styles.product}>
                        <ImageBackground
                        key={item.id}
                        source={{ uri:item.img}}
                        
                        style={styles.image}     
                        >
                            
                          <Text style={ styles.nombre}>{item.name}</Text>
                          <View style={styles.contPrice}>
                            <Text style={ styles.price}> ${item.price}</Text>
                          </View>
                          </ImageBackground>
                          </View> 
                      </TouchableOpacity>
                  
                    )
                }}
                /> 
            </View> 
            :
            <FlatList
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            data={product}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity
                    key={item.id} onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
                    <View >
                    <ImageBackground
                    key={item.id}
                    source={{ uri:item.img}}
                    style={styles.image}      
                    >
                        
                      <Text  style={ styles.nombre}>{item.name}</Text>
                      <View style={styles.contPrice}>
                            <Text style={ styles.price}> ${item.price}</Text>
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
          
       
      
//      return  (
//         <View>
//             <Button
//         title="product detail"
//         onPress={() => navigation.navigate("ProductDetail")}
//       />
            
//         </View>
//     )
// }

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flex:1,
        backgroundColor:"#fff",
          
    },
    search:{
        marginTop:5,
        fontSize: width*0.07,
        fontWeight: "bold",
        
    },
    products:{
        paddingLeft:20,
        marginTop:15,
        marginBottom:15,
        fontSize:width*0.07,
        fontWeight: "bold",
        alignSelf:"center",
        textAlign:"center"
    
    },
    nombre:{
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: width*0.05,
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
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        paddingVertical:10,
        textAlign:"center",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: width*0.05, 
       color:"white"
    },
    image:{
        marginHorizontal:5,
        marginVertical:5, 
        borderRadius:15,
        overflow: 'hidden', 
        height:width*0.5,
        width:(width /2)-10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 1,
        position:"relative"
    },
    product:{
       elevation:100
    }
   
})
