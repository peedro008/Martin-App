import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView} from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { IP } from '../../../env'
import Paginator from './homeComponents/paginator'
import { Card } from 'react-native-elements'
import {addOrder} from "../../../actions"

const width=Dimensions.get("window").width


export default function Home({navigation}) {
    const email =  useSelector(state=> state.User)
    const [sales,setSales]= useState([])
    const [orders,setOrders]= useState([]) 
    const dispatch= useDispatch();  
    
    
    
    
    useEffect(()=>{
      axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
          .then(function(response){
          setOrders(response.data)
          })
          .catch(error=>{
              console.log(error)  
              })
  },[])
  
  let handleAddProduct=(order)=>{
       order.map(e=>{
          dispatch(addOrder(e))
       }) 
          
   
    
}

   

     useEffect(()=>{    //traigo los productos en ofertas
         axios.get(`${IP}/productsSale`)
             .then(function(response){
                 console.log(response.data)
                 setSales(response.data)
                  
 
             })
             .catch(error=>{
               console.log( "Error in Home get ProductSales : " + error)  
             })
              
                axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
                .then(function(response){
                setOrders(response.data)
              

             })
            .catch(error=>{
                 console.log( "Error in clientHome get OrdersUser : " + error)  
            })
           
            

         },[email])



         let orr
         if(orders.length>0){
         orr=orders.reverse()}
    return (
        <ScrollView style={{flex:1, backgroundColor:"#fff"}}>
          <View>
          <View style={{display:"flex", flexDirection:"row",width:Dimensions.get("window").width, marginTop:width*0.018}}>
            <Text style={styles.header} >Deals Of The Week</Text>
            <View style={{position:"absolute", right:25, top:35}}>
              <Icon
              name='shopping-bag'
              type="feather"
              color='gray'
              size={width*0.07 }
              />
            </View>
          </View>         
        <FlatList  
         keyExtractor={item => item.id.toString()}
         showsHorizontalScrollIndicator={false}
          horizontal
          data={sales}
          pagingEnabled
          bounces={false}
          renderItem={({item})=>
            <View style={styles.container, {width:width}}>
              
              <Image  style={styles.image} source={{uri:item.img}}/>
                <View style={styles.footer}>
                  <View style={{width:width*0.45, flexWrap:"wrap"}}>
                    <Text style={ styles.title }>{item.name}</Text>
                  </View>
                    <View style={{ alignItems:"center", alignSelf:"flex-end"}}>
                        <Text  style={ styles.prevPrice}>${item.price.toFixed(2) }</Text>
                      <View style={{flexDirection:"row",alignItems:"flex-start", paddingVertical:0}}>
                        <Text  style={styles.price}>${item.sale ? ((item.price*(100-item.salePercent))/100).toFixed(2) : item.price}</Text>
                        <View style={{flexDirection:"row",alignItems:"flex-end"}}>
                          <Text style={{color:"#00bb2d", fontSize:width*0.05}}>{item.salePercent}</Text>
                          <Text style={{color:"#00bb2d", fontSize:width*0.05}}>"% OFF </Text>
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
        <Paginator data={sales}/>
        
       <View
        style={{  height:300}}>
        <Text style={styles.OrderHeader} >Last Orders</Text> 

        {orders.length>0?
        <FlatList
        
        horizontal={true}
        data={orr}
        renderItem={({item})=> 
          <View>
            <Card  
            style={{width:325, height:180, backgroundColor:"grey",}}>
              <View style={{flexDirection: 'row', marginBottom:13}}>

                    <Text style={{color:"orange", fontSize:20}}>{item.status}</Text>
                      <Text style={{ fontWeight:"bold",paddingLeft:100,fontSize:16 }}>{item.createdAt.substring(0,9)} | {item.createdAt.substring(11,16)}</Text>
                    </View>
                    <Card.Divider/>
                    <View
                    style={{flexDirection: 'row'}}>
                      <Text style={{margin:10, fontSize:22, color:"blue"}}>
                      Order N° {item.id} 
                      </Text>
                      
                      <View
                      style={{marginBottom:15}}>
                      <TouchableOpacity
                      onPress={() => handleAddProduct(item.orderItems)}
                      style={{borderRadius:5, width:80, height:25, backgroundColor:"green", marginLeft:90}}>
                        <Text
                        style={{fontSize:10, alignSelf:"center",fontWeight:"bold", color:"#fff", marginTop:4}}>
                          ADD TO CART
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => navigation.navigate("order detail",{id:item.id})}
                      style={{borderRadius:5, width:80, height:25, marginTop:2, backgroundColor:"#F15A4D", marginLeft:90}}>
                        <Text
                        style={{fontSize:10, alignSelf:"center",fontWeight:"bold", color:"#fff", marginTop:4,}}>
                          DETAILS
                        </Text>
                      </TouchableOpacity>
                      </View>
                      
                      
                      </View>
                      <Card.Divider/>
                      <View
                       style={{flexDirection: 'row'}}>
                        <Text
                        style={{fontWeight:"bold"}}>VALUE OF ITEMS: ${item.total.toFixed(2)}         QUANTITY: {item.orderItems.length}</Text>
                        
                      </View>
                    
                  </Card> 
                </View>
                    }>
                </FlatList>:
                <View>
                  <Icon name="file-text" type="feather" size= {width*0.2} />
      
                  </View>}
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
      header:{
        textAlign:"center",
        alignSelf:"center",
        fontSize: width*0.07,
        fontWeight: "600",
        marginBottom:15,
        marginTop:30,
        paddingLeft: Dimensions.get("window").width*0.17
      },
      OrderHeader:{
     
        alignSelf:"center",
        fontSize: width*0.07,
        fontWeight: "600",
        marginBottom:15,
        
        
      },

      image:{
        width:width*0.9,
        height:width*0.8  ,
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
      
      },
      title2:{
        fontWeight:"600",
        fontSize:width*0.04,
        marginLeft: width*0.03,
      
      },
      price:{
        fontWeight:"600",
        fontSize:width*0.07,
        marginRight:width*0.03
        //color:"#FF0808"
      },
      prevPrice:{
        fontWeight:"400",
        alignSelf:"flex-start",
        fontSize:width*0.05,
        color:"#F15A4D",
        textDecorationLine:"line-through"
      },
      footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:width*0.16,
        alignItems:"center",
        backgroundColor:'rgba(255,255,255, 0.4)',
        width:width*0.9,
        alignSelf:"center",
        marginTop:-width*0.16,
        marginBottom:4,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
        
      },
      buttonSale:{
        width:(width -50)/2,
        height: width*0.12 ,
        alignSelf:"center",
        marginBottom:width*0.03,
        backgroundColor:"#F15A4D",
        justifyContent:"center",
        borderRadius:5,
        marginTop:-width*0.015,
        shadowColor:"black",
        shadowOffset: { width: 0, height: 12},
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation:15,
      },
      buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.05
      }
    
})
