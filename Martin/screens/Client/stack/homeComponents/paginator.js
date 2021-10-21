import React from "react"
import {View,Text,StyleSheet,Animated,useWindowDimensions} from 'react-native'


export default function Paginator({data,}){
    const {width}=useWindowDimensions()
    return(
        <View style={{flexDirection:"row", height:64, alignSelf:"center"}}>
          {
            data.map((_,i)=>{
                const imputRange=[(i-1)*width,i*width,(i+1)*width];
                
              return <Animated.View style={[styles.dot, {width:10}]} key={i.toString()}/>
            })
          }
        </View>
    )
}

const styles= StyleSheet.create({
    dot:{
        height:10,
        borderRadius:5,
        backgroundColor:"gray",
        marginHorizontal:8,
        marginTop:10
      }
})