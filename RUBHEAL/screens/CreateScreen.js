import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';

import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import DocumentPicker from 'react-native-document-picker';
// import * as ImagePicker from 'react-native-image-picker';

import { firebase, config, storage } from '../database';
import { uploadBytesResumable, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Formik } from 'formik';
import * as Yup from 'yup'


// Import storage functions


const CreateScreen = ({ navigation, route }) => {
  // const [id, setid] = useState("");

  const [image, setImage] = useState(null);
  const [isImageError, setIsImageError] = useState(false);


  const user = firebase.auth().currentUser;

  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: 'Food', value: 'food' },
    { label: 'Clothes', value: 'clothes' },
    { label: 'Accessory', value: 'accessory' },
    { label: 'Model', value: 'model' },
    { label: 'Other', value: 'other' },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Folk")
    console.log(result.assets)
    if (result.assets == null) {
      setIsImageError(true)
    }

    const source = { uri: result.assets[0].uri };

    setImage(source);
    // if(source == ""){
    //   setIsImageError(true)
    // }
  }





  // เก็บ owner in product table
  const createProduct = async (name, detail, price, amount, condition, category) => {
    console.log(category)
    const blob = await fetch(image.uri).then((response) => response.blob());
    const filename = Date.now() + '.jpg';
    const imageRef = ref(storage, filename);

    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);

    firebase
      .firestore()
      .collection("products")
      .add({
        name: name,
        price: price,
        amount: amount,
        category: category,
        condition: condition,
        detail: detail,
        image: downloadURL,
        owner: user.uid,
        rating: 0
      })
      .then(() => {
        setImage(null);
        Alert.alert(
          "Create Success",
          "New Product was added!!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate('AdminMange');
              },
            },
          ]
        );


      });
  }





  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Please Enter your name"),
    detail: Yup.string().required("Please Enter your detail"),
    price: Yup.number().typeError('Price must be a number')
      .positive('Price must be a positive number').required("Please Enter your price"),
    amount: Yup.number("Please Enter your number").typeError('Price must be a number')
      .positive('Price must be a positive number').required("Please Enter your price"),
    condition: Yup.string().required("Please Enter your condition"),
    category: Yup.string().required("Please selected your category")


  })







  const [loaded] = useFonts({
    Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
  });
  if (!loaded) {
    return null;
  }

  return (

    <Formik
      initialValues={{
        name: '',
        detail: '',
        price: '',
        amount: '',
        condition: '',
        category: ''
      }}
      validationSchema={createProductSchema}>

      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue, handleBlur }) => (


        <ScrollView>

          <View style={styles.container}>




            {/* <Text style={styles.title}> Create </Text> */}
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder='Product Name'
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')} />

            {touched.name && errors.name && (
              <Text style={{ color: 'red' }}>{errors.name}</Text>
            )}


            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input,]}
              placeholder='Detail Product'
              value={values.detail}
              onChangeText={handleChange('detail')}
              onBlur={() => setFieldTouched('detail')} />

            {touched.detail && errors.detail && (
              <Text style={{ color: 'red' }}>{errors.detail}</Text>
            )}



            <Text style={styles.label}>Condition</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.input}
              placeholder='Condition'
              value={values.condition}
              onChangeText={handleChange('condition')}
              onBlur={() => setFieldTouched('condition')} />
            {touched.condition && errors.condition && (
              <Text style={{ color: 'red' }}>{errors.condition}</Text>
            )}




            <View style={{ flexDirection: 'row', width: '80%' }}>
              <View style={{flex:1}}>

                <Text style={styles.label}>Price</Text>

                <TextInput style={styles.input} value={values.price} keyboardType='numeric' onBlur={() => setFieldTouched('price')} onChangeText={handleChange('price')} placeholder='Price' />
                {touched.price && errors.price && (
                  <Text style={{ color: 'red' }}>{errors.price}</Text>
                )}

              </View>

              <View style={{flex:1}}>

                <Text style={styles.label}>Amount</Text>
                <TextInput style={styles.input} placeholder='amount' keyboardType='numeric'
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={() => setFieldTouched('amount')} />

                {touched.amount && errors.amount && (
                  <Text style={{ color: 'red' }}>{errors.amount}</Text>
                )}
              </View>

            </View>

            <Text style={styles.label}>Catagory</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="select catagory"
              value={values.category}



              onChange={item => {
                setFieldValue("category", item.value)
              }}
            />

            <Text style={styles.label}> Image </Text>
            <ImageBackground
              source={image ? { uri: image.uri } : require('../assets/upload.png')}
              style={styles.backgroundImage}
            >
              <TouchableOpacity style={[styles.selectImage, { marginTop: 20, marginBottom: 10 }]}
                onPress={pickImage}>

              </TouchableOpacity>
            </ImageBackground>

            {/* <Button title='Upload Image' onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 50, height: 50 }} />}
            {!image && isImageError && (
              <Text style={{ color: 'red' }}>กรุณาใส่รูป</Text>

            )} */}

            <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%', backgroundColor: !isValid || values.name == "" || values.detail == "" || values.price == "" || values.amount == "" || values.condition == "" || values.category == "" || image == null ? '#666' : '#9276F2', }]} disabled={!isValid || values.name == "" || values.detail == "" || values.price == "" || values.condition == "" || values.category == "" || image == null} onPress={() => createProduct(values.name, values.detail, values.price, values.amount, values.condition, values.category)}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    borderRadius: 100,
  },
  input: {
    fontSize: 16,
    borderColor: "#262B46",
    backgroundColor: '#fff',
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'Anuphan',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Anuphan',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    width: '80%',
    marginBottom: 5,
    marginTop: 20,
    fontFamily: 'Anuphan',
  },
  button: {
    // backgroundColor: '#9276F2',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Anuphan',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Anuphan',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Anuphan',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Anuphan',
  },
  selectImage: {
    padding: 50,
    marginBottom: 15,
    justifyContent: "center",
    // width: responsiveWidth(30),
    // height: responsiveHeight(30)
  },
  backgroundImage: {
    flex: 1,
    width: responsiveWidth(80),
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});


export default CreateScreen;

