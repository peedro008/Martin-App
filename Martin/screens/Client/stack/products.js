import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions,} from 'react-native'
import { IP } from '../../../env';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Card, Image, SearchBar } from 'react-native-elements';
import { set } from 'react-native-reanimated';


const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

export default  function  Products ({route, navigation}) {
    let category = route.params.params
    let iconName = "shopping-bag" 
    const [cate, setCate]= useState([])
    const [name, setName]= useState("")
    const [product,setProduct] = useState([])
    const [count, setCount] = useState({});

    const handleCount=(id)=>{
        if(count[id]>0){
            setCount(count[id] - 1);
        } 
    }

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
  
    useEffect(() => {
         let pes = {}
        for(let i=0;i<cate.length;i++){
        pes[i]=0     
        }
        setCount(pes)
    }, [cate])
   
  
    return (
        <View style={styles.container}>
            <View style={{marginTop:width*0.044}}>
                <View
                    style={{alignItems:"center",marginVertical:width*0.04, backgroundColor:"white"}}>
                        <Text style={styles.products}>{category.name}</Text>
                        <View style={{position:"absolute", right:0}}>
                            <Icon 
                            name='shopping-bag'
                            type="feather"
                            color='gray'
                            size={width*0.07 }
                            style={{marginTop:width*0.025, marginRight:width*0.03}}
                            />
                        </View>
                </View>
                <SearchBar 
                    inputContainerStyle={{backgroundColor:"white"}}
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={styles.searchBar}
                    onChangeText={handleSearch}
                    value={name}/>
            </View>
                <View style={{alignItems:"center",justifyContent:"center", width:width*0.9, flexDirection:"row"}}>  
                    
                    <View style={{position:"absolute", right:0}}>
                    
                   </View> 
                </View>
            {  
                !name ?

              <View style={styles.contProduct}>
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                data={cate}
                renderItem={({item})=>{
                   
                    let id=item.id-1

                    return(
                         
                    
                         <Card
                        key={item.id}
                        containerStyle={{elevation: 10,width:width*0.9, height:width*0.33 }}>
                          <View
                          style={{flexDirection:"row"}}>
                            <Image 
                            source={{uri: item.img}}
                            style={styles.image}
                            />
                            <View style={{marginLeft:width*0.04}}
                            >
                                <Text style={{fontSize:22, fontWeight:"bold"}}>{item.name}</Text>
                                <Text style={{marginTop:height*0.001}}>Price: $ {item.price}</Text>
                                <Text>Quantity: 1</Text>
                                <Text>Total: {(item.price*count[id]).toFixed(2)}</Text>
                            </View>
                            <View style={{position:"absolute", display:"flex", right:0}}> 
                                <TouchableOpacity 
                                onPress={() => setCount({...count, [id]:count[id]+1  }) }
                                style={ styles.minibutton  }>
                                    <Text style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"600"}}>+</Text>
                                </TouchableOpacity>
                                
                                <View style={styles.count}>
                                    <Text style={styles.countText}>{count[id]}</Text>
                                </View>
                                <TouchableOpacity
                                 onPress={() =>count[id]>0&& setCount({...count, [id]:count[id]-1  })  }
                                style={ styles.minibutton  }
                                >
                                    <Text
                                    style={{fontSize: width*0.06, alignSelf:"center", color:"#6979F8", fontWeight:"bold"}}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                            </View>
                                        
                            </View>
                        </Card>




                    //     <TouchableOpacity
                    //     key={item.id} onPress={() => navigation.navigate("ProductDetail",{id:item.id, category:category.name})}>
                    //     <View style={styles.product}>
                    //     <ImageBackground
                    //     key={item.id}
                    //     source={{ uri:item.img}}
                        
                    //     style={styles.image}     
                    //     >
                            
                    //       <Text style={ styles.nombre}>{item.name}</Text>
                    //       <View style={styles.contPrice}>
                    //         <Text style={ styles.price}> ${item.price}</Text>
                    //       </View>
                    //       </ImageBackground>
                    //       </View> 
                    //   </TouchableOpacity>
                  
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
        marginTop:width*0.018,
        fontSize: width*0.07,
        fontWeight: "600",
        
    },
    searchBar:{
        marginVertical:width*0.01,
        marginBottom: width*0.05,
        alignSelf:"center", 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        borderColor:"rgba(228, 228, 228, 0.6)", 
        borderTopColor:"rgba(228, 228, 228, 0.6)",
        borderBottomColor:"rgba(228, 228, 228, 0.6)",
        width:width-10
    },
    products:{
        marginVertical:width*0.01,
        marginBottom:-width*0.001,
        fontSize:width*0.07,
        fontWeight: "600",
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
    count:{
        //marginLeft:9,
       // marginRight:9,
       marginVertical:6, 
       borderRadius:8,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 2,
        height:width*0.07,
        width:width*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        
        
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
        borderRadius:10,
        overflow: 'hidden', 
        height:width*0.223,
        width:width*0.223,
  
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
        //marginTop:5, 
        shadowOffset: { 
        height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 4,
        height: width*0.07,
        width: width*0.07,
        justifyContent: 'center',
        alignItems: 'center',
      
       
    },
   
})
