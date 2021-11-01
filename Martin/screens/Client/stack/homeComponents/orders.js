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
    const preOrder=useSelector(state=> state.PreOrder)
    const [msj,setMsj]=useState(false)
    
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
            let aux= true
            for(let i=0; i<preOrder.length;i++){
                if(preOrder[i].name == e.name) aux=false
            }
            if(aux){
                dispatch(addOrder(e))
            }
        }) 
        setMsj(true)
        setTimeout(()=>{ setMsj(false)},1000)
    
    }

      
        return (
            <View
            style={{  marginTop:width*.06, alignItems:'center'}}>
                <View style={{width:width*0.9}}>   
                    <Text style={styles.OrderHeader} >Last Orders</Text> 
                </View>
            {orders.length>0?
            <FlatList
            showsHorizontalScrollIndicator={false}
            
          bounces={false}
            horizontal={true}
            data={orders}
            renderItem={({item})=> 
          
                <View style={styles.card} >
                <View style={{margin:width*0.03}}>
                   <View style={{flexDirection: 'row', marginBottom:13, alignItems:'center'}}>
                    
                        <Text style={{color:item.status == "Pending" ? "orange" : item.status=="Received" ? "#6979F8" : "#00bb2d" , fontSize:width*0.04, textTransform:"uppercase"}}>{item.status}</Text>
                        <Text style={{color:"#999999", fontWeight:"300",paddingLeft:100,fontSize:width*0.05 }}>{item.createdAt.substring(0,9)} | {item.createdAt.substring(11,16)}</Text>
                    </View>
                    <Card.Divider/>
                    <View
                        style={{flexDirection: 'row'}}>
                        <Text style={{margin:10, fontSize:width*0.07, color:"#6979F8", fontWeight:"600"}}>
                        Order N° {item.id} 
                        </Text>
                        
                        <View
                        style={{marginBottom:15}}>
                           
                        <View style={{flexDirection:"row"}}>  
                            {msj && <View style={{alignSelf:'center', position:"absolute", right:width*0.24}}><Icon name="check" type="feather" color="#00bb2d" size={14}/></View>
                            }   
                            <TouchableOpacity 
                            onPress={() => handleAddProduct(item.orderItems)}
                            style={{borderRadius:5, width:80, height:25, backgroundColor:"#00bb2d", marginLeft:90}}>
                            <Text
                            style={{fontSize:10, alignSelf:"center",fontWeight:"500", color:"#fff", marginTop:4}}>
                            ADD TO CART
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        onPress={() => navigation.navigate("order detail",{id:item.id})}
                        style={{borderRadius:5, width:80, height:25, marginTop:2, backgroundColor:"#F15A4D", marginLeft:90}}>
                            <Text
                            style={{fontSize:10, alignSelf:"center",fontWeight:"500", color:"#fff", marginTop:4,}}>
                            DETAILS
                            </Text>
                        </TouchableOpacity>
                        </View>
                      
                    </View>
                        <Card.Divider/>
                        <View
                        style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text
                                style={{fontWeight:"400", fontSize: width*0.04, color:"#999999"}}>VALUE OF ITEMS: </Text>
                                <Text style={{fontSize:width*0.05, fontWeight:"600", color:"#151522"}}>${item.total.toFixed(2)}</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems:'center', position:"absolute", right:0}}>
                                <Text
                                style={{fontWeight:"400", fontSize: width*0.04, color:"#999999"}}>QUANTITY: </Text>
                                <Text style={{fontSize:width*0.05, fontWeight:"600", color:"#151522"}}>{item.orderItems.length}</Text>
                            </View>
                        </View>
                     </View>   
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
          alignSelf:"flex-start",
          fontSize: width*0.07,
          fontWeight: "600",
          marginBottom:33,
          
          
        },
        card:{
            borderRadius:5, 
            borderWidth:1, 
            borderColor:"rgba(228, 228, 228, 0.6)",
            shadowColor: "#000",
            shadowOffset: {
	            width: 0,
	            height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
        }
    })
