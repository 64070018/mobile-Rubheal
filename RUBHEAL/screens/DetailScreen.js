import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, React, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";

import { COMMENT } from "../data/dummy-data";
import comment from '../components/comment';

const DetailScreen = ({ navigation, route })=> {
    // const {title, pic} = route.params;
    // console.log('params')
    // console.log(route.params)
    // console.log(title)
    // console.log(route)
    // console.log(props)
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={{ uri: route.params.pic }} style={{ width: '100%', height: responsiveHeight(40) }} />
            <View style={{ margin: 10 }}>
                <Text style={styles.title}>{route.params.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    {/* <Text style={{ fontSize: 16, bottom: 0 }}> prop.item.rate (5.0) </Text> */}
                </View>
                <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold', marginTop: 5 }}> 999 บาท </Text>

                <TouchableOpacity style={[styles.button]} onPress={() => {
                    navigation.navigate('Cart')
                }}>
                    <Text style={styles.buttonText}>BUY</Text>
                </TouchableOpacity>

                {/* store account */}
                <View style={{ borderBottomColor: '#aaa', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 10 }}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200' }}
                        style={[styles.account, { marginTop: 10 }]} />
                    <Text style={{ fontSize: 20, fontWeight: '600', }}> Store Name </Text>
                </View>

                {/* Detail Product */}

                <View>
                    <Text style={styles.header}>Description Product</Text>
                    <Text style={styles.content}>

                        {route.params.detail}
                    </Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20 }}>
                    <Text style={[styles.header, { color: 'red' }]}>Policy</Text>
                    <Text style={[styles.content, { color: 'red' }]}>

                        {route.params.policy}
                    </Text>
                </View>


                {/* comments */}

                <View style={{ marginTop: 30 }}>
                    <Text style={styles.header}>Comments</Text>
                    <TextInput style={styles.input}
                        multiline
                        numberOfLines={3}
                        maxLength={40} placeholder='Feedback'></TextInput>
                </View>

                <FlatList
                    data={COMMENT}
                    renderItem={comment}
                    numColumns={1}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 5,
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#BBAEF5',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'

    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        fontSize: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 20
    },
    content: {
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20

    },
    account: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: 50,
    },
});


export default DetailScreen;