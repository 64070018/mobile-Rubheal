import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';

import { firebase, config, storage } from '../database';
import { uploadBytesResumable, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import * as ImagePicker from 'expo-image-picker';



import { Formik } from 'formik';
import * as Yup from 'yup'

const UpdateScreen = (props) => {
    const { navigation } = props;
    const data = props.route.params
    console.log("###DATA###")
    console.log(data)
    const [name, setName] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [amount, setAomunt] = useState(data.amount);
    const [category, setCategory] = useState(data.catagory);
    const [condition, setCondition] = useState(data.condition);
    const [detail, setDetail] = useState(data.detail);
    const [rating, setRating] = useState(data.rating)

    const [image, setImage] = useState(data.image);

    const [fileImage, setFileImage] = useState(null)

    const user = firebase.auth().currentUser;
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        const source = { uri: result.assets[0].uri };
        
    


        const blob = await fetch(source.uri).then((response) => response.blob());
        const filename = Date.now() + '.jpg';
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);
    

        setImage(downloadURL)
        setFileImage(downloadURL)

        




    }

    const updateProduct = (productId, updatedData) => {
        const productRef = firebase.firestore().collection('products').doc(productId);
        // Use the update method to update the document with the new data
        productRef.set(updatedData)
            .then(() => {
                console.log('Product updated successfully.');
                Alert.alert(
                    "Update Success",
                    "Please check your product",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                // Navigate to the admin page
                                navigation.navigate('AdminMange');
                            },
                        },
                    ]
                );
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const productId = data.id;
    console.log(productId)
    // const updatedData = {
    //     name: name,
    //     price: price,
    //     detail: detail,
    //     amount: amount,
    //     condition: condition,
    //     category: category,
    //     owner: user.uid,
    //     image: "https://picsum.photos/200"

    // };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        detail: Yup.string().required('Detail is required'),
        price: Yup.number().typeError('Price must be a number') // Custom type error message
        .positive('Price must be a positive number').required("Please Enter your price"),
        amount: Yup.number().typeError('Price must be a number') // Custom type error message
        .positive('Price must be a positive number').required("Please Enter your price"),
        condition: Yup.string().required('Condition is required'),
    });





    return (


        <ScrollView scrollVerticalIndicatorInsets={false} style={styles.container}>
            <Formik
                initialValues={{
                    name: name,
                    detail: detail,
                    price: price,
                    amount: amount,
                    condition: condition,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("###IMAGE###")
                    console.log(fileImage)

                    if(fileImage === null){
                        setFileImage(data.image)
                        console.log(fileImage)
                    }

                    if(fileImage === null){
                        updateProduct(productId, {
                            name: values.name,
                            price: values.price,
                            detail: values.detail,
                            amount: values.amount,
                            condition: values.condition,
                            category: category,
                            owner: user.uid,
                            image: data.image,
                            rating : rating
                        });
                    }

                    else{
                        updateProduct(productId, {
                            name: values.name,
                            price: values.price,
                            detail: values.detail,
                            amount: values.amount,
                            condition: values.condition,
                            category: category,
                            owner: user.uid,
                            image: fileImage,
                            rating : rating
                        });
                    }

                    // Handle form submission here, e.g., call the updateProduct function
                   
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                    <View style={styles.content}>
                        {/* <Text style={styles.title}> Update {'\n'}</Text> */}

                        <Text style={styles.label}>Name </Text>
                        <TextInput style={styles.input} value={values.name} onBlur={() => setFieldTouched('name')} onChangeText={handleChange('name')} />
                        {touched.name && errors.name && (
                            <Text style={{ color: 'red' }}>{errors.name}</Text>
                        )}

                        <Text style={styles.label}>Detail Product</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={[styles.input,]}
                            placeholder='Detail Product'
                            value={values.detail}
                            onBlur={() => setFieldTouched('detail')}
                            onChangeText={handleChange('detail')}
                        />
                        {touched.detail && errors.detail && (
                            <Text style={{ color: 'red' }}>{errors.detail}</Text>
                        )}

                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={values.price} keyboardType='numeric' onBlur={() => setFieldTouched('price')} onChangeText={handleChange('price')} />
                        {touched.price && errors.price && (
                            <Text style={{ color: 'red' }}>{errors.price}</Text>
                        )}

                        <Text style={styles.label}>Amount</Text>
                        <TextInput style={styles.input} value={values.amount} keyboardType='numeric' onBlur={() => setFieldTouched('amount')} onChangeText={handleChange('amount')} />
                        {touched.amount && errors.amount && (
                            <Text style={{ color: 'red' }}>{errors.amount}</Text>
                        )}

                        <Text style={styles.label}>Condition</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                            value={values.condition}
                            onBlur={() => setFieldTouched('condition')}
                            onChangeText={handleChange('condition')}
                        />

                        {touched.condition && errors.condition && (
                            <Text style={{ color: 'red' }}>{errors.condition}</Text>
                        )}
                        <Text style={styles.label}>Catagory {category}</Text>
                        <ImageBackground
                            source={image ? { uri: image } : require('../assets/upload.png')}
                            style={styles.backgroundImage}
                        >
                            <TouchableOpacity style={[styles.selectImage, { marginTop: 20, marginBottom: 10, width: '80%', }]}
                                onPress={pickImage}>
                                {/* <Text style={{ color: '#000', textAlign: 'center', fontSize: 20, }}>Select Image</Text> */}

                            </TouchableOpacity>
                        </ImageBackground>

                        <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%', backgroundColor : !isValid ? '#666' : '#9276F2', }]} disabled={!isValid} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </Formik>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: '15%',
    },
    content: {
        marginVertical: '20%',
        fontFamily: 'Anuphan'
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
        fontFamily: 'Anuphan'
    },
    label: {
        fontSize: 18,
        textAlign: 'left',
        width: '80%',
        marginTop: 10,
        fontFamily: 'Anuphan'

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '20%',
        fontFamily: 'Anuphan'
    },
    button: {
        // backgroundColor: '#9276F2',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20%',
        fontFamily: 'Anuphan'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Anuphan'
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
        fontFamily: 'Anuphan'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Anuphan'
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
        fontFamily: 'Anuphan'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    backgroundImage: {
        flex: 1,
        width: responsiveWidth(80),
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    selectImage: {
        // borderWidth: 2,
        // borderRadius: 10,
        padding: 50,
        marginBottom: 15,
        justifyContent: "center",
    },
});


export default UpdateScreen;

