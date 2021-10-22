import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated} from 'react-native'
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
  },[orders])
  
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
        <View style={{flex:1, backgroundColor:"#fff"}}>
          <View>
          <View style={{display:"flex", flexDirection:"row",width:Dimensions.get("window").width, marginTop:20}}>
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
                  <Text style={ item.name.length<15 ? styles.title : styles.title2}>{item.name}</Text>
                    <View style={{ flexDirection:"row" , alignItems:"center"}}>
                        <Text  style={styles.price}>${item.price}</Text>
                        <Text  style={ styles.prevPrice}>${((item.price*100)/(100 - item.salePercent)).toFixed(2) }</Text>
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
                        style={{fontWeight:"bold"}}>VALUE OF ITEMS: ${item.total}         QUANTITY: {item.orderItems.length}</Text>
                        
                      </View>
                    
                  </Card> 
                </View>
                    }>
                </FlatList>:
                <View>
                  <ImageBackground source={{uri:"https://icons.iconarchive.com/icons/iconsmind/outline/512/Inbox-Empty-icon.png"}}
                  style={{width:300, height:250, alignSelf:"center"}}/>
                  </View>}
      </View>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
  container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
      },
      header:{
        textAlign:"center",
        alignSelf:"center",
        fontSize: width*0.07,
        fontWeight: "bold",
        marginBottom:15,
        marginTop:30,
        paddingLeft: Dimensions.get("window").width*0.17
      },
      OrderHeader:{
        textAlign:"center",
        alignSelf:"center",
        fontSize: width*0.07,
        fontWeight: "bold",
        marginBottom:15,
        
        
      },
//       title:{
//         display:"flex",
//         fontWeight:"500",
//         //fontSize:"25px",
//         backgroundColor:"#4F505E",
//         justifyContent:"center",
//         color:"fff"
//       },
      image:{
        width:width -50,
        height:width -40 ,
        justifyContent:"center",
        resizeMode:"cover",
        alignSelf:"center",
        borderRadius:5,
        
      },
      title:{
        fontWeight:"bold",
        fontSize:width*0.05,
        textAlign:"justify"
        
      },
      title2:{
        fontWeight:"bold",
        fontSize:width*0.04,
        
    
      },
//       text:{
//         display:"flex",
//         textAlign:"center",
//         fontWeight:"500",
//         fontSize:"20px"
//       },
      price:{
        fontWeight:"bold",
        fontSize:width*0.07,
        color:"#00bb2d",
        marginHorizontal:8
        //color:"#FF0808"
      },
      prevPrice:{
        fontWeight:"bold",
        fontSize:width*0.05,
        color:"red",
        textDecorationLine:"line-through"
      },
      footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:width*0.14,
        paddingHorizontal:40,
        alignItems:"center",
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        width:width -50,
        alignSelf:"center",
        marginTop:-110,
        marginBottom:4
        
      },
      buttonSale:{
        width:(width -50)/2,
        height:width*0.08 ,
        alignSelf:"center",
        marginTop:-4,
        marginBottom:10,
        backgroundColor:"#F15A4D",
        justifyContent:"center",
        borderRadius:5
      },
      buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.05
      }
    
})
