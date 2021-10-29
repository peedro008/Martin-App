import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card } from 'react-native-elements'

const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height

export default function adminHome() {
    return (
        <View>
           
            <Text style={styles.header}>Welcome Admin</Text>
        
        <View>
            <Card
            containerStyle={styles.balanceCard}>
                <Text style={{color:"grey",fontWeight:"bold"}}>Last Month's Balance</Text>
                <Text style={{fontSize:25, fontWeight:"bold"}}>$25.325,55</Text>

            </Card>
        </View></View>
    )
}

const styles = StyleSheet.create({
   header:{
       fontSize:30,
       textAlign:"center",
       marginTop:width*0.1
   },
   balanceCard:{
       width:width*0.95,
       alignSelf:"center",
       height:heigth*0.3,
       elevation:15
   }
})
