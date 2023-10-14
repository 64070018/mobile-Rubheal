
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const ShowProduct = (props) => {
    // console.log("-----")
    // console.log(props)
    // console.log("-----")

   
    // console.log
    return (
        <View style={{ maxWidth: '50%', minWidth: '50%' }}>
            <ScrollView>
                {/* <TouchableOpacity style={{ height: 400, }}> */}
                <TouchableOpacity style={{ height: 260, }} onPress={props.onSelectProduct}>
                    <Image source={{ uri: props.pic }} style={styles.product} />
                    <View>
                        <Text style={styles.catTitle} numberOfLines={1}> {props.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <AntDesign name="star" size={16} color='#FFC400' />
                            <AntDesign name="star" size={16} color='#FFC400' />
                            <AntDesign name="star" size={16} color='#FFC400' />
                            <AntDesign name="star" size={16} color='#FFC400' />
                            <AntDesign name="star" size={16} color='#FFC400' />
                            <Text style={{ fontSize: 16, bottom: 0 }}> {props.rate} (5.0) </Text>
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", }}> {props.price} บาท </Text>
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
        fontWeight: 'light',
    },
    product: {
        width: "95%",
        height: responsiveHeight(20),
        borderRadius: 10,

    }
});


export default ShowProduct;