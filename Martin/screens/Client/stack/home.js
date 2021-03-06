import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView} from 'react-native'
import { Icon, Divider } from 'react-native-elements'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { IP } from '../../../env'
import {addOrder} from "../../../actions"
import  Orders from './homeComponents/orders'
import {ExpandingDot} from "react-native-animated-pagination-dots"
const width=Dimensions.get("window").width


export default function Home({navigation}) {
    const email =  useSelector(state=> state.User)
    const [sales,setSales]= useState([])
    const [orders,setOrders]= useState([]) 
    const dispatch= useDispatch(); 
    const [saleState, setSaleState] = useState(false)
    
    
    
    
    useEffect(()=>{
      axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
          .then(function(response){
          setOrders(response.data.reverse())
          })
          .catch(error=>{
              console.log(error)  
              })
  },[email])
  
  let handleAddProduct=(order)=>{
       order.map(e=>{
          dispatch(addOrder(e))
       }) 
          
   
    
}

   

     useEffect(()=>{    //traigo los productos en ofertas
         axios.get(`${IP}/productsSale`)
             .then(function(response){
                 
                 setSales(response.data)
                  
 
             })
             .catch(error=>{
               console.log( "Error in Home get ProductSales : " + error)  
             })
              
          
           
            

         },[])



         const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <ScrollView style={{flex:1, backgroundColor:"#FFF"}}>
          <View>
          <View style={{justifyContent:"center", alignSelf:"center", flexDirection:"row",width:width*0.9, marginTop:width*0.06}}>
            <Text style={styles.header} >Deals Of The Week</Text>
            
          </View>
          <Divider style={{marginBottom:width*0.08}} orientation="horizontal" />
          
          
          {/* {saleState==false?
            <View style={{marginBottom:width*0.12}}>  
              <Text style={styles.saleheader}>Only today</Text>
              <Text style={styles.saleheader}>-40%- OFF</Text>
            <Image style={styles.imageSale} source={{uri:"http://ecuafruver.azurewebsites.net/wp-content/uploads/2020/09/canasta-verduras.png"}} />
              <View style={styles.shopBotton}>
             <TouchableOpacity
          onPress={()=>setSaleState(true)}>
            <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.05, alignSelf:"center", marginVertical:width*0.01,fontWeight:"500", color:"#fff", }}>See more</Text>
            </TouchableOpacity></View>
            </View>  :     */}








        <View>
        <FlatList  
         keyExtractor={item => item.id.toString()}
         showsHorizontalScrollIndicator={false}
          horizontal
          data={sales}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({item})=>
            
            <View style={styles.container, {width:width}}>
              
              <Image  style={styles.image} source={{uri:item.img}}/>
                <View style={styles.footer}>
                  <View style={{width:width*0.46,}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={ styles.title }>{item.name}</Text>
                  </View>
                    <View style={{ alignItems:"center", alignSelf:"flex-end", }}>
                       
                        <Text  style={ styles.prevPrice}>${item.price.toFixed(2) }</Text>
                      
                      <View style={{flexDirection:"row",alignItems:"flex-start", marginTop:-width*0.01}}>
                        <Text  style={styles.price}>${item.sale ? ((item.price*(100-item.salePercent))/100).toFixed(2) : item.price}</Text>
                        <View style={{flexDirection:"row",alignItems:"flex-end", marginTop:width*0.03, marginLeft:-width*0.01}}>
                          <Text style={{color:"#40D3A8", fontSize:width*0.04}}>{item.salePercent}</Text>
                          <Text style={{color:"#40D3A8",fontFamily:"OpenSans-SemiBold", fontSize:width*0.04}}>% off </Text>
                        </View>
                      </View>
                    </View>
                </View>
                <View style={styles.buttonSale}>
                        <TouchableOpacity onPress={()=>navigation.navigate("ProductDetail",{id:item.id})}>
                            <Text style={styles.buttonStyle}>
                            Shop now
                            </Text>
                        </TouchableOpacity>
                
                </View>
            </View>
          }
          
        /> 
        <View style={{paddingBottom:width*0.08}}>
                <ExpandingDot
            data={sales}
            expandingDotWidth={10}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            inActiveDotColor="#eecece"
            activeDotColor="#F15A4D"
            dotStyle={{
                width: 10,
                height: 10,
               
                borderRadius: 5,
                marginHorizontal: 5
            }}
            
        />
       </View>
        </View>
        
       {/* } */}
 
         
         <View style={styles.orders}>
          <Orders navigation={navigation} data={orders}/>
         </View>
      
        </View>
      </ScrollView>
    )
}


const styles = StyleSheet.create({
  container:{
        justifyContent:"center",
        alignItems:"center",
      

      },
      orders:{
        marginTop:-width*0.08
      },
      header:{
        textAlign:"center",
        marginTop:width*0.07,
        marginBottom:width*0.05,
        fontSize: width*0.06,
       
        fontFamily:"OpenSans-SemiBold"
      },
     

      image:{
        width:width*0.8,
        height:width*0.65  ,
        justifyContent:"center",
        // resizeMode:"cover",
        alignSelf:"center",
        borderRadius:5,
        
      },
      title:{
        fontWeight:"600",
        fontSize:width*0.05,
        textAlign:"justify",
        marginLeft: width*0.03,
        fontFamily:"OpenSans-SemiBold"
      
      },
      title2:{
        fontWeight:"600",
        fontSize:width*0.04,
        marginLeft: width*0.03,
        fontFamily:"OpenSans-Regular"
      
      },
      price:{
        fontWeight:"600",
        fontSize:width*0.07,
        marginRight:width*0.03,
        fontFamily:"OpenSans-SemiBold"
        //color:"#FF0808"
      },
      prevPrice:{
        fontWeight:"400",
        alignSelf:"flex-start",
        fontSize:width*0.04,
        color:"#F15A4D",
        textDecorationLine:"line-through",
        fontFamily:"OpenSans-SemiBold",
        
        
      },
      footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:width*0.148,
        alignItems:"center",
        backgroundColor:'rgba(255,255,255, 0.7)',
        width:width*0.9,
        alignSelf:"center",
        marginTop:-width*0.65,
        marginBottom:width*0.6,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
        
      },
      buttonSale:{
        width:width*0.36,
        height: width*0.1 ,
        alignSelf:"center",
        marginBottom:width*0.05,
        backgroundColor:"#F15A4D",
        justifyContent:"center",
        borderRadius:5,
        marginTop:-width*0.08,
        shadowColor:"black",
        shadowOffset: { width: 0, height: 12},
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation:15,
      },
      buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.0471,
        fontFamily:"OpenSans-Regular",
      },
      shopBotton:{
        backgroundColor:"#F15A4D",
        width:width*0.4,
        height:width*0.1,
        alignSelf:"center",
        borderRadius:8,
        elevation:16,
        
      },
      imageSale:{
        width:width*0.9,
        height:width*0.5  ,
        justifyContent:"center",
        // resizeMode:"cover",
        alignSelf:"center",
        borderRadius:5,
      },
      saleheader:{
        color:"#F15A4D", 
        fontFamily:"OpenSans-SemiBold",
        fontSize:width*0.08,
        alignSelf:"center",
       
      }
    
})