import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card,Icon } from 'react-native-elements'
import {addOrder} from "../../../../actions"
import axios from 'axios'
import React,{useEffect,  useState} from 'react'
import { IP } from '../../../../env'

const width=Dimensions.get("window").width

// const handleCompare=(item,compare)=>{
//     var result=[];
//     for(let i=0; i<compare.length; i++){
//         for(let j=0; j<item.length; j++){
//             if(compare[i].name===item[j].name){
//                 result.push(item[j])
//             }
//         }
//     }
//     return result.length == item.length ? true : false;
        
    
// }


export default function orders({navigation}) {
    const [orders,setOrders]= useState([]) 
    const email =  useSelector(state=> state.User)
    const compare=useSelector(state=> state.PreOrder)
    const dispatch=useDispatch()
 
    useEffect(()=>{
        axios.get(`${IP}/orderuser?email=${email}`)    //traigo los ultimos pedidos del usuario 
            .then(function(response){
            setOrders(response.data.reverse())
            })
            .catch(error=>{
                console.log(error)  
                })
    },[])

    let handleAddProduct=(order)=>{
        order.map(e=>{
           dispatch(addOrder(e))
        }) }

      
        return (
            <View
            style={{  marginTop:width*.06,      height:300}}>
            <Text style={styles.OrderHeader} >Last Orders</Text> 

            {orders.length>0?
            <FlatList
            showsHorizontalScrollIndicator={false}
            
          bounces={false}
            horizontal={true}
            data={orders}
            renderItem={({item})=> 
            <View>
                <Card  
                style={{width:325, height:180, backgroundColor:"grey",}}>
                <View style={{flexDirection: 'row', marginBottom:13}}>

                        <Text style={{color:item.status == "Pending" ? "orange" : item.status=="Received" ? "#6979F8" : "#00bb2d" , fontSize:20}}>{item.status}</Text>
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
                           {
                              
                        <TouchableOpacity 
                        onPress={() => handleAddProduct(item.orderItems)}
                        style={{borderRadius:5, width:80, height:25, backgroundColor:"green", marginLeft:90}}>
                           <Text
                            style={{fontSize:10, alignSelf:"center",fontWeight:"bold", color:"#fff", marginTop:4}}>
                            ADD TO CART
                            </Text>
                            </TouchableOpacity>
                         
                            
                            }
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
                        }/>
                      :
                      <View>
                      <Icon name="file-text" type="feather" size= {width*0.2} />
          
                      </View>}
        </View>
        )
}

const styles = StyleSheet.create({
        OrderHeader:{
       
          alignSelf:"center",
          fontSize: width*0.07,
          fontWeight: "600",
          marginBottom:40,
          
          
        },})
