import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';

import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import DocumentPicker from 'react-native-document-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { firebase, config, storage } from '../database';
import { uploadBytesResumable, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// Import storage functions




const CreateScreen = ({ navigation, route }) => {
  // const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAomunt] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);

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

    const source = { uri: result.assets[0].uri };
    setImage(source);
  }

  // เก็บ owner in product table
  const createProduct = async () => {

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

  return (


    <ScrollView>

      <View style={styles.container}>




        {/* <Text style={styles.title}> Create </Text> */}
        {/* <Text style={styles.label}>Name</Text> */}
        <TextInput style={styles.input} placeholder='Product Name'
          value={name}
          onChangeText={(val) => setName(val)} />

        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.input,]}
          placeholder='Detail Product'
          value={detail}
          onChangeText={(val) => setDetail(val)} />

        {/* <Text style={styles.label}>Address</Text> */}
        <TextInput style={styles.input} placeholder='price' keyboardType='numeric'
          value={price}
          onChangeText={(val) => setPrice(val)} />

        {/* <Text style={styles.label}>Name</Text> */}
        <TextInput style={styles.input} placeholder='amount' keyboardType='numeric'
          value={amount}
          onChangeText={(val) => setAomunt(val)} />

        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.input}
          placeholder='Condition'
          value={condition}
          onChangeText={(val) => setCondition(val)} />

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
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategory(item.value);
            setIsFocus(false);
          }}
        />




        <Text style={styles.label}> Image </Text>

        <Button title='test' onPress={pickImage}></Button>
        {image && <Image source={{ uri: image.uri }} style={{ width: 50, height: 50 }} />}

        <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]} onPress={createProduct}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

