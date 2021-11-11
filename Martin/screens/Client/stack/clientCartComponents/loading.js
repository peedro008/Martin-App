import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

export default function loading({nWavigation}) {
    return (
        <View>
            <Image style={styles.loading} source={{uri: "https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    loading:{
        alignSelf:"center",
        width:200,
        height:300,
        marginVertical:200
        
    }
})
