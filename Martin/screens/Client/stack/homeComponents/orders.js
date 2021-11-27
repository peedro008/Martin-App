import { StyleSheet, Text,Button, View,FlatList,ImageBackground,TouchableOpacity, useWindowDimensions, Image, Dimensions, Animated, ScrollView, SafeAreaView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card,Icon } from 'react-native-elements'
import {addOrder} from "../../../../actions"
import axios from 'axios'
import React,{useEffect,  useState} from 'react'


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


export default function orders({navigation, data}) {

    const email =  useSelector(state=> state.User)
    const preOrder=useSelector(state=> state.PreOrder)
    const [last, setLast] = useState([])
    const [card, setCard] = useState()

    const dispatch=useDispatch()

    
    const toCart=()=>{
        navigation.navigate("Cart")
    }
    
    
    useEffect(()=>{
        setLast(data.slice(0,2))
    }, [data])  
    
    useEffect(() => {
        let pes = {}
       for(let i=0;i<data.length;i++){
       pes[i]=false    
      
       }
       setCard(pes)
      
   }, [data])

    let handleAddProduct=(order, id)=>{
        let pes = card
        pes[id] = true
  
        setCard(pes)
        order.map(e=>{
            let aux= true
            for(let i=0; i<preOrder.length;i++){
                if(preOrder[i].name == e.name) aux=false
            }
            if(aux){
                dispatch(addOrder(e))
            }
        }) 
     
    
    }

      
        return (
            <SafeAreaView
            style={{marginTop:width*.06,marginBottom:width*0.02, alignItems:'center', flex:1}}>
                <View style={{width:width*0.9}}>   
                    <Text style={styles.OrderHeader} >Fast order</Text> 
                </View>

               
            {data.length>0?
           
            <FlatList
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingBottom:width*0.1}}
            bounces={false}
            horizontal={true}
            data={last}
            renderItem={({item})=>{
             return(
                <View >
                
                <Card containerStyle={styles.card}><TouchableOpacity
                onPress={()=>navigation.navigate("fast Order", {order:item})}
                >
                
                      <View>
                        <View>
                            
                                <Image style={styles.image} source={require("../../../../assets/Check.png")}/>
                            
                        </View> 
                        <View style={styles.textContainer}>
                    <Text style={{fontFamily:"OpenSans-Regular"}}>{item.createdAt.substring(0,10)}</Text>
                   
                    <Text style={{color:"#666666", fontFamily:"OpenSans-Regular"}}>$ {item.total.toFixed(2)}</Text></View>
                </View></TouchableOpacity></Card>
                </View>
                
                )} 
            }/>
                      :
                      <View
                      style={{paddingTop:-30}}>
                      <Text style={{color:"grey", fontStyle:"OpenSans-Regular"}}>NOT ORDERS YET</Text>
          
                      </View>}
          </SafeAreaView>
        )}


const styles = StyleSheet.create({
        OrderHeader:{
            textAlign:"center",
            marginVertical:width*0.08,
            fontSize: width*0.06,
        
            fontFamily:"OpenSans-SemiBold"
        },
        image:{
            height:60,
            width:60,
            alignSelf:"center"
        },
        card:{
            
           height:width*0.32,
            width:width*0.413,
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
            flexDirection:"column"
        
            
        },
        textContainer:{
            alignItems:"center",
            marginTop:width*0.02
        }
    })
