import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';

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
    if(result.assets == null){
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
        setName("");
        setPrice("");
        setAomunt("");
        setCategory(null);
        setCondition("");
        setDetail("");
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
    price: Yup.number("Please Enter your number").required("Please Enter your price"),
    amount: Yup.number("Please Enter your number").required("Please Enter your amount"),
    condition: Yup.string().required("Please Enter your condition"),
    category: Yup.string().required("Please selected your category")


  })







  return (

    <Formik
      initialValues={{
        name: '',
        detail: '',
        price: 0,
        amount: 0,
        condition: '',
        category: ''
      }}
      validationSchema={createProductSchema}>

      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, setFieldValue }) => (


        <ScrollView>

          <View style={styles.container}>




            {/* <Text style={styles.title}> Create </Text> */}
            {/* <Text style={styles.label}>Name</Text> */}
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


            {/* <Text style={styles.label}>Address</Text> */}
            <TextInput style={styles.input} placeholder='price' keyboardType='numeric'
              value={values.price}
              onChangeText={handleChange('price')}
              onBlur={() => setFieldTouched('price')} />

            {touched.price && errors.price && (
              <Text style={{ color: 'red' }}>{errors.price}</Text>
            )}


            {/* <Text style={styles.label}>Name</Text> */}
            <TextInput style={styles.input} placeholder='amount' keyboardType='numeric'
              value={values.amount}
              onChangeText={handleChange('amount')}
              onBlur={() => setFieldTouched('amount')} />

            {touched.amount && errors.amount && (
              <Text style={{ color: 'red' }}>{errors.amount}</Text>
            )}


            <Text style={styles.label}>Description</Text>
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
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setIsFocus(false);
                setFieldTouched('category', true); // Set the "category" field as touched to trigger validation
              }}

              onChange={item => {
                // setCategory(item.value);
                setFieldValue("category", item.value)
                // setIsFocus(false);
              }}
            />
        {touched.category && values.category === "" && errors.category && (
  <Text style={{ color: 'red' }}>{errors.category}</Text>
)}

            {/* {values.category === "" && errors.category && isFocus &&(
              <Text style={{ color: 'red' }}>{errors.category}</Text>
            )} */}



            <Text style={styles.label}> Image </Text>

            <Button title='Upload Image' onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 50, height: 50 }} />}
            {!image &&isImageError  &&(
              <Text style={{ color: 'red' }}>กรุณาใส่รูป</Text>

            )}

            <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]} onPress={() => createProduct(values.name, values.detail, values.price, values.amount, values.condition, values.category)}>
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
    // margin: 5,
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    borderRadius: 100,
  },
  input: {
    fontSize: 16,
    borderBottomColor: "#262B46",
    backgroundColor: '#eee',
    width: "80%",
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
    width: '80%',
    marginTop: 10

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    width: '80%',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#9276F2',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
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
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


export default CreateScreen;

