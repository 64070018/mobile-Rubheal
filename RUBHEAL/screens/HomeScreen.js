import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView } from 'react-native';

import { AntDesign } from "@expo/vector-icons";

import { PRODUCT } from "../data/dummy-data";
import ShowProduct from '../components/ShowProduct';

const HomeScreen = ({ navigation, route }, props) => {
  const renderedItem = (itemData) => {
    return (
      <ShowProduct
        title={itemData.item.title}
        pic={itemData.item.pic}
        price={itemData.item.price}
        onSelectProduct={() => {
          navigation.navigate("Detail", { title: itemData.item.title, pic: itemData.item.pic, detail: itemData.item.detail, policy: itemData.item.policy, price: itemData.item.price });
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.input} >
        <TextInput placeholder="Search" />
        <AntDesign style={styles.searchIcon} name="faMagnifyingGlass" size={26} color={'gray'} />
      </View>
        <AntDesign style={{ position: 'absolute', right: 5, top: 15}} name="notification" size={26} color={'gray'} />
      <ScrollView>
        <Text style={styles.title}>Catagory</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 100 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.cat}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2819/2819194.png' }} style={[styles.catagory,]} />
              <Text style={styles.catTitle}>FOOD</Text>
            </View>
            <View style={styles.cat}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3300/3300371.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>CLOTHES</Text>
            </View>
            <View style={styles.cat}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7695/7695930.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>ACCESSORY</Text>
            </View>
            <View style={styles.cat}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6967/6967594.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>MODEL</Text>
            </View>
            <View style={styles.cat}>
              <Image source={{ uri: 'https://icon-library.com/images/others-icon/others-icon-20.jpg' }} style={styles.catagory} />
              <Text style={styles.catTitle}>OTHERS</Text>
            </View>
          </View>
        </ScrollView>

        <Text style={styles.title}>recommend</Text>


        <FlatList
          data={PRODUCT}
          renderItem={renderedItem}
          numColumns={2}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  cat: {
    alignItems: 'center',
    marginRight: 10
  },
  input: {
    borderColor: "gray",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  catagory: {
    width: 40,
    height: 40,
    borderRadius: 10,

  },
  catTitle: {
    fontSize: 14,
    fontWeight: 'light',
    marginHorizontal: 10,
    marginTop: 5
  },
});


export default HomeScreen;