import React,{useState,useEffect}from 'react'
import { StyleSheet, Text, View, Image, Button,Dimensions,ScrollView,TouchableOpacity, Touchable, EdgeInsetsPropType} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import {updateProduct} from '../../../actions'
import { useDispatch } from 'react-redux';
import { IP } from '../../../env';
import { set } from 'react-native-reanimated';
import { Divider } from 'react-native-elements/dist/divider/Divider';

const width=Dimensions.get("window").width


export default function editProduct({route}) {
    const {id}=route.params
    const [product, setProduct]= useState({});
    const [categoryID,setCategoryID]=useState()
    const [categories,setCategories]=useState([])
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState(0)
    const [sale,setSale]=useState(true)
    const [category,setCategory] = useState("")
    const [salePercent,setSalePercent]=useState(0)
    const [saved,setSaved]=useState(false)



    const dispatch= useDispatch()

    useEffect(()=>{
        axios.get(`${IP}/products?id=${id}`)
            .then((response)=>{
                setProduct(response.data)
                setName(response.data.name)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setSale(response.data.sale)
                setSalePercent(response.data.salePercent)
                setCategoryID(response.data.categoryId)
                
            })
            .catch(error=>{
              console.log(error)  
            })
            axios.get(`${IP}/categories`)
            .then((response)=>{
                setCategories(response.data)
            })
            .catch(error=>{
                console.log(error)  
              })
             
        },[])

        useEffect(()=>{
            axios.get(`${IP}/category?id=${categoryID}`)
            .then((response)=>{
                console.log(response.data)
                setCategory(response.data.name)
            })
            .catch(error=>{
                console.log(error)  
              })
        },[categoryID])
        
        const handleDefault=()=>{
            setSale(!sale)
        }
      
        const handlePicker=(value)=>{
            setCategoryID(value)
        }

        const handleSave=()=>{
                dispatch(updateProduct(price, product.id,parseInt(salePercent),sale, name,description,categoryID))
              
                setSaved(true)

                setTimeout(()=>{
                    setSaved(false)
                },2000)
        }
    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
        <ScrollView style={{flex:1, backgroundColor:"#fff", width:width*0.88, alignSelf:"center",}}>
                 <Text style={styles.header}>Product Detail</Text>
                 <Divider/>
              
            <View>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.id}>Product number is #{product.id}</Text>
            </View>
            <Text style={[styles.textInput,{marginTop:width*0.06}]}>Name</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 1)" placeholder={"  "+product.name} style={styles.input} value={name} onChangeText={(value)=>setName(value)}/>
            </View>
            <Text  style={styles.textInput}>Category</Text>
           
            <Picker  selectedValue={categoryID} onValueChange={(value)=> handlePicker(value)} style={Platform.OS === 'ios'?{}:{height:width*0.15,marginBottom:width*0.06, borderRadius:5}}>
                
                {
                    categories?.map(e=>{
                        return(
                         <Picker.Item  key={e.id} style={{fontSize:width*0.05}} fontFamily="OpenSans-SemiBold" label={e.name} value={e.id}/>
                        )
                    })
                }
            </Picker>
            <Text style={styles.textInput}>Description</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 1)" placeholder={"  "+product.description} multiline={true} numberOfLines={4} value={description} onChangeText={(value)=>setDescription(value)} />
            </View>   
            <Text  style={styles.textInput}>Price</Text>
            <View style={styles.contInput}>
                <TextInput placeholderTextColor="rgba(228, 228, 228, 1)" placeholder={"   $"+product.price} style={styles.input} value={price} onChangeText={(value)=>setPrice(value)} />
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

                { sale ?<TextInput placeholderTextColor="rgba(228, 228, 228, 1)" placeholder={"  "+product.salePercent+"% discount"} style={styles.input} value={salePercent} onChangeText={(value)=>setSalePercent(value)} /> :
                <TextInput  editable={false} selectTextOnFocus={false} placeholderTextColor="rgba(228, 228, 228,1)" placeholder={"  "+product.salePercent+"% discount"} style={styles.input} value={salePercent} onChangeText={(value)=>setSalePercent(value)} />}
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
        textAlign:"center",
        marginTop:width*0.08,
        marginBottom:width*0.02,
        fontSize: width*0.06,
    
        fontFamily:"OpenSans-SemiBold"
  },
  name:{
      fontSize: width*0.07,
      fontFamily:"OpenSans-SemiBold",
      color:"#222222",
      textTransform:"capitalize"
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
  },
   contInput:{
        borderWidth:0.5,
        borderColor:"gray",
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
