import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React from "react";
const ChatScreen = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.nav}>
        <Text style={styles.navText}>Folk</Text>
      </View> */}
      <View style={styles.backgroundChat}>
        <ScrollView>
          {/* <FlatList data={CHAT} renderItem={renderItem} /> */}
          <View style={styles.box}>
            <View style={styles.personRight}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
                }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            </View>

            <View>
              <View style={styles.boxContent}>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
              </View>
              <View style={styles.boxTimeRight}>
                <Text>16:00</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.personRight}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
                }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            </View>

            <View style={{flex : 4}}>
              <View style={{flex: 1, borderRadius: 10, padding: 10}}>
                {/* <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text> */}
                <Image source={require("../assets/vase.png")} style={{width : 250, height : 250}}/>
              </View>
              <View style={styles.boxTimeRight}>
                <Text>16:04</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <View>
              <View style={styles.boxContent}>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
                <Text>
                  This is a black to sdkfls sdklfsdl sdflk sdfsdf sdf
                  asdfsdfasdfasdf sdfasdfsdfsdsdsdsdsdsdsdsdsdsdsdsdsdsd
                </Text>
              </View>
              <View style={styles.boxTimeLeft}>
                <Text>17:00</Text>
              </View>
            </View>
            <View style={styles.personLeft}>
              <Image
                source={{
                  uri: "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top",
                }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            </View>
          </View>
        </ScrollView>

        <View style={{ margin: 15, flexDirection: "row" }}>
          <TextInput style={styles.input} placeholder="Text" />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection : 'row', justifyContent : 'space-around'}}
          >
            <TouchableOpacity>
                <Image source={require("../assets/send.png")} style={{width : 30, height : 30}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/image.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
  
    nav: {
      flex: 1,
      // backgroundColor: "blue",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
    },
    navText: {
      fontSize: 30,
      fontWeight: "700",
    },
  
    backgroundChat: {
      flex: 6,          
      width: "100%",
      justifyContent: 'space-around'
    },
  
    box: {
      flexDirection: 'row', marginVertical: 20, marginHorizontal: 20
    },
    input: {
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
      borderColor : '#ccc',
      backgroundColor : '#eee',
      borderRadius : 50,
      padding: 10,
      flex: 3,
    },
  
    boxContent: {
      flex: 3, borderRadius: 10, padding: 10, backgroundColor: '#F6F7F9'
    },
    boxTimeLeft: {
      alignItems: 'flex-start', padding: 10
    },
    boxTimeRight :{
      alignItems: 'flex-end', padding: 10
  
    },
    personRight: {
      flex: 1, justifyContent: 'flex-end'
    },
    personLeft: {
      flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'
    }
  });

export default ChatScreen;
