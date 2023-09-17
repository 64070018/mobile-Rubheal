
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const showProduct = (props) => {
    return (
        <View style={{ maxWidth: '50%', minWidth: '50%' }}>

            <ScrollView>
                <TouchableOpacity style={{ height: 400,}}>
                    <Image source={{ uri: props.item.pic }} style={styles.product} />
                    <View>
                        <Text style={styles.catTitle} numberOfLines={1}>{props.item.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, }}>
                            <AntDesign name="star" size={25} color='#E4A70A' />
                            <AntDesign name="star" size={25} color='#E4A70A' />
                            <AntDesign name="star" size={25} color='#E4A70A' />
                            <AntDesign name="star" size={25} color='#E4A70A' />
                            <AntDesign name="star" size={25} color='#E4A70A' />
                            <Text style={{ fontSize: 16, bottom: 0 }}> {props.item.rate} (5.0) </Text>
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "red", }}> {props.item.price} บาท </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
        fontWeight: 'bold',
    },
    product: {
        width: "95%",
        height: responsiveHeight(30),
        borderRadius: 10,

    }
});


export default showProduct;