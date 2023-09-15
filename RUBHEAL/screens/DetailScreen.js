import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, React } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";

import { COMMENT } from "../data/dummy-data";
import comment from '../components/comment';

const DetailScreen = (props) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={{ uri: 'https://picsum.photos/400' }} style={{ width: '100%', height: responsiveHeight(40) }} />
            <View style={{ margin: 10 }}>
                <Text style={styles.title}>Product name</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    <AntDesign name="star" size={25} color='orange' />
                    {/* <Text style={{ fontSize: 16, bottom: 0 }}> prop.item.rate (5.0) </Text> */}
                </View>
                <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold', marginTop: 5 }}> 999 บาท </Text>


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
                    <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta blandit arcu nec porttitor. Fusce volutpat lectus vel lacus rhoncus efficitur. Phasellus a condimentum ex. Pellentesque non aliquet orci. Phasellus viverra mauris eget erat laoreet dignissim. Integer tellus magna, eleifend eu urna vel, ornare sollicitudin nibh. Maecenas eu efficitur quam, ut convallis dolor. Donec ut dignissim diam, et rutrum nunc. Mauris pulvinar, ipsum et viverra molestie, nibh dui condimentum sapien, non dapibus mauris neque ut velit. Morbi turpis libero, sodales vel enim id, placerat tristique diam. Fusce eu justo egestas, porttitor eros id, gravida sapien. Quisque id luctus dui, cursus gravida augue.</Text>
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