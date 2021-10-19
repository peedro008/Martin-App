import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,FlatList,ImageBackground,TouchableOpacity} from 'react-native'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { IP } from '../../../env'





export default function Home({navigation}) {
    const email =  useSelector(state=> state.User)
    const [sales,setSales]= useState([])
    const [orders,setOrders]= useState([])
    console.log(email)
    
   

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
        <View >
          <Text >Sales</Text>
        <FlatList
         keyExtractor={item => item.id.toString()}
          horizontal
          data={sales}
          renderItem={({item})=>
            <View>
              <TouchableOpacity  onPress={() => navigation.navigate("ProductDetail",{id:item.id})}>
              <ImageBackground source={{uri:item.img}}
              style={{width: 80, height:80}}>
               <Text >{item.name}</Text>
               </ImageBackground>
               </TouchableOpacity>
                <Text >${item.price}</Text>
            </View>
          }
        />
      </View>
    )
}

// const styles = StyleSheet.create({
//     // container:{
//     //     border:"0px 1px solid black",
//     //     backgroundColor:"#9E9E9E"
//     //   },
//       title:{
//         display:"flex",
//         fontWeight:"500",
//         //fontSize:"25px",
//         backgroundColor:"#4F505E",
//         justifyContent:"center",
//         color:"fff"
//       },
//       image:{
//         width:"100px",
//         height:"120px",
//         marginRight:" 25px",
//         marginTop:"0px",
//         marginBottom:"0px",
//         boxShadow: "10px 5px 5px black",
//       },
//       text:{
//         display:"flex",
//         textAlign:"center",
//         fontWeight:"500",
//         fontSize:"20px"
//       },
//       price:{
//         textAlign:"justify",
//         fontSize:"15px",
//         //color:"#FF0808"
//       }
// })
