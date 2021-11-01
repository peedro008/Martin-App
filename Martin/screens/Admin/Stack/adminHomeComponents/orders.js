import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'


const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function orders({orders}) {
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
          <FlatList
            //  keyExtractor={item => item.id.toString()}
            //  numColumns={2}
            //  data={categories}
            //  renderItem={({item})=>{
            //      return(

            //      )
            //  }}
          
          />
        </View>
    )
}

const styles = StyleSheet.create({
  
})
