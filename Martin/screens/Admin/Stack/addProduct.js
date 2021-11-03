import React,{useState,useEffect, createFactory}from 'react'
import { StyleSheet, Text, View, Image, Button,Dimensions,ScrollView,TouchableOpacity, Touchable, EdgeInsetsPropType} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import {createProduct} from '../../../actions'
import { useDispatch } from 'react-redux';
import { IP } from '../../../env';
import { set } from 'react-native-reanimated';

const width=Dimensions.get("window").width


export default function addProduct() {
    
    const [categoryID,setCategoryID]=useState(0)
    const [categories,setCategories]=useState([])
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState(0)
    const [sale,setSale]=useState(false)
    const [salePercent,setSalePercent]=useState(0)
    const [saved,setSaved]=useState(false)



    const dispatch= useDispatch()

    useEffect(()=>{
    
            axios.get(`${IP}/categories`)
            .then((response)=>{
                setCategories(response.data)
                console.log(response.data)
            })
             
        },[])

        const handleDefault=()=>{
            setSale(!sale)
        }
      
        const handlePicker=(value)=>{
            if(value === "select") return;
            else setCategoryID(value)
        }

        const handleSave=()=>{
                dispatch(createProduct(categoryID,parseInt(price),description,name,sale,salePercent))
                setSaved(true)

                setTimeout(()=>{
                    setSaved(false)
                },2000)
        }
        
    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
        <ScrollView style={{flex:1, backgroundColor:"#fff", width:width*0.88, alignSelf:"center",}}>
                 <Text style={styles.header}>Product Detail</Text>
            <Text style={[styles.textInput,{marginTop:width*0.06}]}>Name</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 0.6)" placeholder={"  Name"} style={styles.input} value={name} onChangeText={(value)=>setName(value)}/>
            </View>
            <Text  style={styles.textInput}>Category</Text>

            <Picker onValueChange={(value)=> handlePicker(value)} style={{height:width*0.1 ,marginBottom:width*0.04, borderRadius:5}}>
                <Picker.Item  fontFamily="OpenSans-SemiBold" label="SELECT" value="select"/>
                {
                    categories?.map(e=>{
                        return(
                         <Picker.Item key={e.id} fontFamily="OpenSans-SemiBold" label={e.name} value={e.id}/>
                        )
                    })
                }
            </Picker>
            <Text style={styles.textInput}>Description</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 0.6)" placeholder={"  Description"} multiline={true} numberOfLines={10} style={{textTransform:"capitalize",height:width*0.36}} value={description} onChangeText={(value)=>setDescription(value)} />
            </View>   
            <Text  style={styles.textInput}>Price</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 0.6)" placeholder={"  Price"} style={styles.input} value={price} onChangeText={(value)=>setPrice(value)} />
            </View>
            <Text style={styles.textInput}>Sale</Text>
            <View style={styles.containerButtonDefault}>
                <TouchableOpacity onPress={()=>handleDefault()}>
                <View style={styles.contButtonDefault}>
                    <View style={sale ? styles.buttonDefault1 : styles.buttonDefault2}></View>
                </View>
                </TouchableOpacity>
                <Text style={styles.defaultText}>Activate discount</Text>
            </View>
            <Text  style={styles.textInput}>Sale Percent</Text>
            <View style={styles.contInput}>

                { sale ?<TextInput placeholderTextColor="rgba(228, 228, 228, 0.6)" placeholder={"  % discount"} style={styles.input} value={salePercent} onChangeText={(value)=>setSalePercent(value)} /> :
                <TextInput  editable={false} selectTextOnFocus={false} placeholderTextColor="rgba(228, 228, 228, 0.6)" placeholder={"  % discount"}  style={styles.input} value={salePercent} onChangeText={(value)=>setSalePercent(value)} />}
            </View>
                {
                    saved && <Text style={{alignSelf:"center", color:"#00bb2d",fontFamily:"OpenSans-Regular",fontSize:width*0.04}}>Successfully saved</Text>
                }
            <View style={styles.butttonSave}>
                <TouchableOpacity onPress={()=>handleSave()}>
                    <Text style={styles.buttonSaveText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  header:{
      marginTop:width*0.1,
      fontSize:width*0.07,
      fontFamily:"OpenSans-Bold",
      alignSelf:"center",
      textAlign:"center",
      marginBottom:width*0.09,
      color:"#222222"
  },
  name:{
      fontSize: width*0.07,
      fontFamily:"OpenSans-Bold",
      color:"#222222"
  },
  id:{
      fontSize:width*0.04,
      fontFamily:"OpenSans-SemiBold"
  },
  textInput:{
    fontSize:width*0.05,
    fontFamily:"OpenSans-SemiBold",
    color:"#222222",
    marginBottom:width*0.04
  },
  input:{
      height:width*0.12,
      textTransform:"capitalize"
  },
   contInput:{
        borderWidth:0.5,
        borderColor:"rgba(228, 228, 228, 0.6)",
        marginBottom:width*0.04,
        borderRadius:5
  },
  containerButtonDefault:{
    flexDirection:"row", 
    alignItems:"center",
    width:width-50, 
    alignSelf:"center",
},
contButtonDefault:{
    width:width*0.13,
    height:width*0.075,
    borderRadius:16, 
    borderColor:"rgba(228, 228, 228, 0.6)",
    borderTopWidth:0.5,
    shadowColor:"black",
    shadowOffset: { width: 3, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation:1,
    justifyContent:"center",
    marginBottom:width*0.04,
},
buttonDefault1:{
    height:width*0.06,
    width:width*0.06,
    backgroundColor:"#6979F8",
    borderRadius:100,
    alignSelf:"flex-end"
},
buttonDefault2:{
    height:width*0.06,
    width:width*0.06,
    backgroundColor:"#E4E4E4",
    borderRadius:100,
},
defaultText:{
    fontSize:width*0.035,
    marginLeft:width*0.03,
    fontFamily:"OpenSans-Regular"
},
butttonSave:{
  height:width*0.12,
  width:"100%",
  backgroundColor:"#F15A4D",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:5
},
buttonSaveText:{
    color:"#fff",
    fontSize:width*0.05,
    fontFamily:"OpenSans-Regular"
}

})
