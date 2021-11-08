import React from 'react'
import { StyleSheet, Text,Dimensions, View, Image } from 'react-native'
import { Card, Divider } from 'react-native-elements'


const width=Dimensions.get("window").width
const heigth=Dimensions.get("window").height
let card=width*0.87
export default function balanceCard() {
    return (
        <View>
       
            <View>
                <Card
                containerStyle={styles.balanceCard}>
                    <Text style={{fontFamily:"OpenSans-Regular",color:"#999999", fontSize:width*0.034}}>Last Month's Balance</Text>
                    <Text style={{fontFamily:"OpenSans-SemiBold",fontSize:width*0.057,}}>$25.325,55</Text>
                    <View style={styles.graphic}>
                        <View style={{backgroundColor:"#BE52F2", width:card*0.16, height:width*0.027, borderTopLeftRadius:16, borderBottomLeftRadius:16}}/>
                        <View style={{backgroundColor:"#6979F8", width:card*0.16, height:width*0.027}}/>
                        <View style={{backgroundColor:"#FFCF5C", width:card*0.13, height:width*0.027}}/>
                        <View style={{backgroundColor:"#F2994A", width:card*0.12, height:width*0.027}}/>
                        <View style={{backgroundColor:"#0084F4", width:card*0.16, height:width*0.027}}/>
                        <View style={{backgroundColor:"#00C48C", width:card*0.13, height:width*0.027, borderTopRightRadius:16, borderBottomRightRadius:16}}/>
                    </View>
                    <View style={{flexDirection:"row", flexWrap:"wrap", marginTop:width*0.07,}}>
                        <View style={{ flexDirection:"row", marginRight:width*0.09}}>
                            <View style={{backgroundColor:"#BE52F2", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 1</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", marginRight:width*0.09}}>
                            <View style={{backgroundColor:"#6979F8", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 2</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",marginRight:width*0.09}}>
                            <View style={{backgroundColor:"#FFCF5C", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 3</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", marginRight:width*0.09, marginTop:width*0.079}}>
                            <View style={{backgroundColor:"#F2994A", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 4</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",marginRight:width*0.09, marginTop:width*0.079}}>
                            <View style={{backgroundColor:"#0084F4", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 5</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", marginTop:width*0.079}}>
                            <View style={{backgroundColor:"#00C48C", width:width*0.018, height:width*0.068, borderRadius:40, marginTop:width*0.01}}/>
                            <View style={{marginLeft:width*0.024}}>
                                <Text style={styles.city}>City 6</Text>
                                <Text style={styles.price}>$320</Text>
                            </View>
                        </View>
                    </View>   
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
 
   balanceCard:{
       width:width*0.87,
       alignSelf:"center",
       borderRadius:10,
       //borderStyle:"none",
       shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,
   },
   graphic:{
       flexDirection:"row",
       marginTop:width*0.04
   },
   city:{
       color:"#6979F8",
       fontSize:width*0.034,
       fontFamily:"OpenSans-Bold",
       fontWeight:"400"
   },
   price:{
    fontFamily:"OpenSans-SemiBold",
       color:"#151522",
       fontWeight:"500",
       fontSize:width*0.038,
   }
})
