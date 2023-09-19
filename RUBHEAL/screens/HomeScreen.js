import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Systrace } from 'react-native';


import { PRODUCT } from "../data/dummy-data";
import ShowProduct from '../components/ShowProduct';

const HomeScreen = ({ navigation, route }, props) => {
  // console.log(props)
  // console.log(PRODUCT)
  const renderedItem = (itemData) => {
    // console.log(itemData.item.title)
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
      <TextInput style={styles.input} placeholder="ค้นหาสินค้าที่คุณต้องการ" />
      <ScrollView>
        <Text style={styles.title}>Catagory</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 200 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2819/2819194.png' }} style={[styles.catagory,]} />
              <Text style={styles.catTitle}>อาหาร</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3300/3300371.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>เสื้อผ้า</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7695/7695930.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>เครื่องประดับ</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6967/6967594.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>โมเดล</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://icon-library.com/images/others-icon/others-icon-20.jpg' }} style={styles.catagory} />
              <Text style={styles.catTitle}>เบ็ดเตล็ด</Text>
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
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 5,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  catagory: {
    width: 80,
    height: 80,
    borderRadius: 10,

  },
  catTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
});


export default HomeScreen;