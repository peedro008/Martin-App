import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated} from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { IP } from '../../../env'
import Paginator from './homeComponents/paginator'

const width=Dimensions.get("window").width


export default function Home({navigation}) {
    const email =  useSelector(state=> state.User)
    const [sales,setSales]= useState([])
    const [orders,setOrders]= useState([])
    
   

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
 
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
          <View>
          <View style={{display:"flex", flexDirection:"row",width:Dimensions.get("window").width}}>
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
        
      },
      buttonSale:{
        width:(width -50)/2,
        height:width*0.11,
        alignSelf:"center",
        marginTop:-5,
        backgroundColor:"#F15A4D",
        justifyContent:"center"
      },
      buttonStyle:{
        color:"#FFFFFF" ,
        alignSelf:"center", 
        fontSize:width*0.05
      }
    
})
