import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView} from 'react-native';
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





async function selectImage() {
  try {
    const options = {
      mediaType: 'photo',
      // includeBase64: false,
    };

    const response = await launchImageLibrary(options);
    // await new Promise(resolve => setTimeout(resolve, 2000));

    if (response.didCancel) {
      console.log('Image selection was canceled');
    } else if (response.error) {
      console.error('Image picker error:', response.error);
    } else {
      console.log("response same but else")
      console.log(response)
      const { uri } = response.assets[0];
      // const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const filename = uri.substring(uri.lastIndexOf('/') + 1);

      console.log("filename", filename)


      // Create a root reference
      const storage = getStorage();

      // Create a reference to 'mountains.jpg'
      const mountainsRef = ref(storage, `${filename}`);

      // Create a reference to 'images/mountains.jpg'
      const mountainImagesRef = ref(storage, `images/${filename}`);

      // While the file names are the same, the references point to different files
      mountainsRef.name === mountainImagesRef.name;           // true
      mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 


      // Use the putFile method to upload the selected image to Firebase Storage
      const snapshot = await uploadBytesResumable(mountainsRef, "gs://rubhiw-8f5b8.appspot.com");

      console.log('Image uploaded successfully');

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('Download URL:', downloadURL);


      // // Create a reference to the Firebase Storage location where you want to store the image
      // const storageRef = firebase.storage().ref().child(`images/${filename}`);
      // // const storageRef = storage.ref().child(`images/${filename}`);

      // // Put the image in Firebase Storage
      // const response2 = await storageRef.putFile(uri);

      // if (response2.state === 'success') {
      //   console.log('Image uploaded successfully');
      //   const imageUrl = await storageRef.getDownloadURL();
      //   console.log('Image URL:', imageUrl);
      // }
    }
  } catch (error) {
    console.error('Error while selecting/uploading an image:', error);
  }
}




const CreateScreen = ({ navigation, route }) => {
  // const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAomunt] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  
  const [detail, setDetail] = useState("");
  // const [rating, setRating] = useState("");
  // const [image, setImage] = useState("https://picsum.photos/200");
  // const [owner, setOwner] = useState("");
  const [image, setImage] = useState(null);

const [uploading, setUploading] = useState(false);
  const user = firebase.auth().currentUser;

  const [selectedValue, setSelectedValue] = useState(null);
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
  
  const uploadImage = async () => {
    if (image) {
      setUploading(true);
      const blob = await fetch(image.uri).then((response) => response.blob());
      const filename =  Date.now() + '.jpg';
      const imageRef = ref(storage, filename);
  
      try {
        await uploadBytes(imageRef, blob);
  
        const downloadURL = await getDownloadURL(imageRef);
  
      // Now, add the downloadURL to Firestore along with any other data you want to associate with the image
      const db = getFirestore();
      const imageCollection = collection(db, 'images'); // Replace 'images' with your Firestore collection name
      const docRef = await addDoc(imageCollection, {
        imageUrl: downloadURL,
        // Add any additional fields you want to associate with the image
      });
      
        setUploading(false);
        Alert.alert('Photo uploaded!');
        setImage(null);
      } catch (e) {
        console.error(e);
        setUploading(false);
        Alert.alert('Failed to upload photo.');
      }
    } else {
      Alert.alert('No image selected.');
    }
  }
  



  // เก็บ owner in product table
  const createProduct = async () => {

    const blob = await fetch(image.uri).then((response) => response.blob());
    const filename =  Date.now() + '.jpg';
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
        rating : 0
      })
      .then(() => {
        setName("");
        setPrice("");
        setAomunt("");
        setCategory(null);
        setCondition("");
        setDetail("");
        setImage(null);
        // Alert.alert("Create Success", "New Product was added!!");
        Alert.alert(
          "Create Success",
          "New Product was added!!",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to the admin page
                navigation.navigate('AdminMange'); // Replace 'Admin' with the correct screen name
              },
            },
          ]
        );


      });
  }






  // Now, image cann't use
  const handleImagePicker = async () => {

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      storageOptions: {
        path: 'image',
      },

    };

    // const permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

    // if (permissionStatus === RESULTS.GRANTED) {
    // Permission granted, you can now use launchImageLibrary
    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Image selection was canceled');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        console.log('Selected image:', response.assets[0]);
        // Handle the selected image here
      }
    });
    // } else {
    //   console.log("ประสิดเสดทำไม่ไอ้สาส")
    // }


  };
   







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

