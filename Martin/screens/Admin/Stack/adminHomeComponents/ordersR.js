import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView, SafeAreaView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card,Icon } from 'react-native-elements'
import {addOrder} from "../../../../actions"
import axios from 'axios'
import React,{useEffect,  useState} from 'react'
import { IP } from '../../../../env'
import { useNavigation } from '@react-navigation/native';

const width=Dimensions.get("window").width
const height=Dimensions.get("window").height

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


export default function ordersR(data) {
    const navigation = useNavigation();
    const [orders,setOrders]= useState([]) 
    const preOrder=useSelector(state=> state.PreOrder)
    const [msj,setMsj]=useState(false)
    
    const dispatch=useDispatch()
    
    
    useEffect(() => {
        setOrders(data.data)
    }, [data]) 
    

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
            style={{ flex:1, marginTop:width*0.03, alignItems:'center' }}>
                
               
            {orders?
           
            <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:width*0.1}}
            bounces={false}
            data={orders}
            renderItem={({item})=> 
                <View style={{marginVertical:width/1000, display:"flex", flex:1,}}>
                <Card containerStyle={styles.card} >
                <View style={{margin:width*0.03, alignSelf:"center"}}>
                   
                   <View style={{flexDirection: 'row', marginBottom:width*0.03, marginTop:-width*0.03, alignItems:'center'}}>
                    
                        <Text style={{color:item.status == "Pending" ? "#FFCF5C" : item.status=="Received" ? "#40D3A8" : "#0084F4" , fontSize:width*0.04,fontFamily:"OpenSans-Regular", textTransform:"uppercase"}}>{item.status}</Text>
                        <Text style={{fontFamily:"OpenSans-Regular",color:"#999999", fontWeight:"300",position:"absolute",right:0,fontSize:width*0.04 }}>{item.createdAt.substring(0,10)} | {item.createdAt.substring(11,16)}</Text>
                    </View>
                    <Card.Divider/>
                    <View
                        style={{flexDirection: 'row',marginVertical:width*0.035, alignContent:'center'}}>
                        <Text style={{fontFamily:"OpenSans-Regular", fontSize:width*0.065, color:"#40D3A8", fontWeight:"600"}}>
                        Order N?? {item.id} 
                        </Text>
                        
                        <View
                        style={{marginBottom:width*0.04}}>
                           
                           




                    
                        <TouchableOpacity
                        onPress={() => navigation.navigate("Order Details",{id:item.id})}
                        style={{borderRadius:5, width:width*0.2, height:width*0.065, marginTop:width*0.008,justifyContent:"center", backgroundColor:"#F15A4D", marginLeft:width*0.23}}>
                            <Text
                            style={{fontFamily:"OpenSans-Regular",fontSize:width*0.026, alignSelf:"center",fontWeight:"500", color:"#fff", }}>
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
                                style={{fontFamily:"OpenSans-Regular", fontSize: width*0.035, color:"#999999"}}>VALUE OF ITEMS: </Text>
                                <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.04, fontWeight:"600", color:"#151522"}}>$ {item.total.toFixed(2)}</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems:'center', position:"absolute", right:0}}>
                                <Text
                                style={{fontFamily:"OpenSans-Regular", fontWeight:"400", fontSize: width*0.035, color:"#999999"}}>QUANTITY: </Text>
                                <Text style={{fontFamily:"OpenSans-Regular",fontSize:width*0.04, fontWeight:"600", color:"#151522"}}>x{item.orderItems.length}</Text>
                            </View>
                        </View>
                     </View>   
                    </Card> 
                    </View>
         
                        }/>
                      :
                      <View
                      style={{paddingTop:-30}}>
                      <Text style={{color:"grey", fontStyle:"OpenSans-Regular"}}>NOT ORDERS YET</Text>
          
                      </View>}
          </View>
        )
}

const styles = StyleSheet.create({
   
    card:{
        height:width*0.47,
        width:width*0.9,
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
