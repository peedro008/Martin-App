import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated} from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { IP } from '../../../env'
import Paginator from './homeComponents/paginator'




export default function Home({navigation}) {
    const email =  useSelector(state=> state.User)
    const [sales,setSales]= useState([])
    const [orders,setOrders]= useState([])
    const {width}=useWindowDimensions()
   

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
          <View style={{display:"flex", flexDirection:"row",width:Dimensions.get("window").width}}>
            <Text style={styles.header} >Deals Of The Week</Text>
            <View style={{position:"absolute", right:25, top:35}}>
              <Icon
              name='shopping-bag'
              type="feather"
              color='gray'
              size={25 }
              />
            </View>
          </View>         
        <FlatList
         keyExtractor={item => item.id.toString()}
          horizontal
          data={sales}
          pagingEnabled
          bounces={false}
          renderItem={({item})=>
            <View style={styles.container, {width:width}}>
              
              <Image  style={styles.image} source={{uri:item.img}}/>
                <View style={styles.footer}>
                  <Text style={ item.name.length<15 ? styles.title : styles.title2}>{item.name}</Text>
                  
                    <Text  style={styles.price}>${item.price}</Text>
                    <Text  style={ styles.prevPrice}>${((item.price*100)/(100 - item.salePercent)).toFixed(2) }</Text>
            
                </View>
                <View style={styles.buttonSale}>
                  <Button title="Shop now" color="#F15A4D"  onPress={() => navigation.navigate("ProductDetail",{id:item.id})}/>
                </View>
            </View>
          }
          
        />
        <Paginator data={sales}/>
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
        fontSize: 25,
        fontWeight: "bold",
        marginBottom:15,
        marginTop:30,
        paddingLeft: Dimensions.get("window").width*0.22
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
        width:Dimensions.get("window").width -50,
        height:250 ,
        justifyContent:"center",
        resizeMode:"cover",
        alignSelf:"center",
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        
      },
      title:{
        fontWeight:"bold",
        fontSize:18,
       
        
      },
      title2:{
        fontWeight:"bold",
        fontSize:15,
      },
//       text:{
//         display:"flex",
//         textAlign:"center",
//         fontWeight:"500",
//         fontSize:"20px"
//       },
      price:{
        fontWeight:"bold",
        fontSize:22,
        color:"#00bb2d"
        //color:"#FF0808"
      },
      prevPrice:{
        fontWeight:"bold",
        fontSize:18,
        color:"red",
        textDecorationLine:"line-through"
      },
      footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:50,
        paddingHorizontal:40,
        alignItems:"center",
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        width:Dimensions.get("window").width -50,
        alignSelf:"center",
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15
      },
      buttonSale:{
        width:(Dimensions.get("window").width -50)/2,
        alignSelf:"center",
        marginTop:3
      },
    
})
