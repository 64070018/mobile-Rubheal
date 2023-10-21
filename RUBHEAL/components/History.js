import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, FlatList, } from "react-native";
import React, { useEffect, useState } from 'react';

const History = (props) => {
    console.log("props", props)
    return (
        <View
            style={{
                flexDirection: "row",
                padding: 10,
                margin: 10,
            }}
        >
            <Image
                source={{ uri: props.image }}
                style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.text}>ราคาสินค้า :  {props.price} </Text>
                <Text style={styles.text}>ซื้อเมื่อ :  {props.date} </Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignItems: "center",
        // justifyContent: "center",
    },
    text: {
        fontSize: 18
    }

});

export default History;
