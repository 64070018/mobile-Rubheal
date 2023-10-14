import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { firebase } from "../database";

const UpdateScreen = (props) => {
    const { navigation } = props;
    const data = props.route.params
    const [name, setName] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [amount, setAomunt] = useState(data.amount);
    const [category, setCategory] = useState(data.catagory);
    const [condition, setCondition] = useState(data.condition);
    const [detail, setDetail] = useState(data.detail);

    const user = firebase.auth().currentUser;

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
    const updatedData = {
        name: name,
        price: price,
        detail: detail,
        amount: amount,
        condition: condition,
        category: category,
        owner: user.uid,
        image: "https://picsum.photos/200"

    };





    return (
        <View style={styles.container}>

            <ScrollView scrollVerticalIndicatorInsets={false}>
                <View style={styles.content}>
                    {/* <Text style={styles.title}> Update {'\n'}</Text> */}

                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={(val) => setName(val)} />

                    <Text style={styles.label}>Detail Product</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={[styles.input,]}
                        placeholder='Detail Product'
                        value={detail}
                        onChangeText={(val) => setDetail(val)}
                    />

                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} keyboardType='numeric' onChangeText={(val) => setPrice(val)} />

                    <Text style={styles.label}>Amount</Text>
                    <TextInput style={styles.input} value={amount} keyboardType='numeric' onChangeText={(val) => setAomunt(val)} />

                    <Text style={styles.label}>Condition</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        value={condition}
                        onChangeText={(val) => setCondition(val)}
                    />
                    <Text style={styles.label}>Catagory {category}</Text>
                    <Text style={styles.label}> Image </Text>

                    <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}>
                        <Text style={styles.buttonText} onPress={() => {
                            updateProduct(productId, updatedData);
                        }}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        marginVertical: '20%'
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
        fontSize: 20,
        textAlign: 'left',
        width: '80%',
        marginTop: 10

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '20%'
    },
    button: {
        backgroundColor: '#465067',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20%'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 3,
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


export default UpdateScreen;

