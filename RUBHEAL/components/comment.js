import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const comment = (props) => {
    return (
        <View style={{ borderBottomColor: '#aaa', borderBottomWidth: 1, paddingVertical: 10 }}>
            <View style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 10 }}>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={[styles.account, { marginTop: 10 }]} />
                <Text style={{ fontSize: 20, fontWeight: '600', }}> {props.item.name}{'\n'}
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                        <AntDesign name="star" size={20} color='orange' />
                        <AntDesign name="star" size={20} color='orange' />
                        <AntDesign name="star" size={20} color='orange' />
                        <AntDesign name="star" size={20} color='orange' />
                        <AntDesign name="star" size={20} color='orange' />
                        <Text style={{ fontSize: 16, bottom: 0 }}> {props.item.timestamp} </Text>
                    </View>
                </Text>

            </View>
            <Text style={styles.content}>
                {props.item.content}
            </Text>
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


export default comment;