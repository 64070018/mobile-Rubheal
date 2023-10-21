
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const TopTank = (props) => {
    const starIcons = [];


    for (let i = 0; i < 5; i++) {


        if(i < props.rating){
            starIcons.push(
              <AntDesign key={i} name="star" size={16} color="orange" />
              
            );

        }

        else{
            starIcons.push(
              <AntDesign key={i} name="star" size={16} color="grey" />

            )
        }
    }
    return (
        <ScrollView >
            <TouchableOpacity style={{ height: 350, }} onPress={props.onSelectProduct}>
                <Image source={{ uri: props.pic }} style={styles.product} />
                <View>
                    <Text style={styles.catTitle} numberOfLines={1}>{props.title }</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                    {starIcons}
                        <Text style={{ fontSize: 16, bottom: 0 }}> {props.rating} </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", }}> {props.price} บาท </Text>
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