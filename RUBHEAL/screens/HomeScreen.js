import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView } from 'react-native';


import { PRODUCT } from "../data/dummy-data";
import showProduct from '../components/ShowProduct';

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ค้นหาสินค้าที่คุณต้องการ" />
      <ScrollView>
        <Text style={styles.title}>Catagory</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 200 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={[styles.catagory,]} />
              <Text style={styles.catTitle}>อาหาร</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>เสื้อผ้า</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>รองเท้า</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>กระเป๋า</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>โมเดล</Text>
            </View>
          </View>
        </ScrollView>

        <Text style={styles.title}>recommend</Text>


        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={PRODUCT}
            renderItem={showProduct}
            numColumns={2}
            keyExtractor={item => `${item.id}`}
          />
        </ScrollView>

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
    margin: 5,
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