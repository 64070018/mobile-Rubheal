
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const TopTank = (props) => {
    return (
        <ScrollView>
            <TouchableOpacity style={{ height: 350, }}>
                <Image source={{ uri: props.item.pic }} style={styles.product} />
                <View>
                    <Text style={styles.catTitle} numberOfLines={1}>{props.item.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                        <AntDesign name="star" size={16} color='#FFC400' />
                        <AntDesign name="star" size={16} color='#FFC400' />
                        <AntDesign name="star" size={16} color='#FFC400' />
                        <AntDesign name="star" size={16} color='#FFC400' />
                        <AntDesign name="star" size={16} color='#FFC400' />
                        <Text style={{ fontSize: 16, bottom: 0 }}> {props.item.rate} (5.0) </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", }}> {props.item.price} บาท </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 10,
        paddingTop: 30
    },
    catTitle: {
        fontSize: 20,
        fontWeight: 'light',
    },
    product: {
        width: "95%",
        height: responsiveHeight(30),
        borderRadius: 10,

    }
});


export default TopTank;