import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView } from 'react-native';

import { PRODUCT } from "../data/dummy-data";
// import showProduct from '../components/ShowProduct';
import TopTank from '../components/TopRank';

const RankScreen = ({ navigation, route }, props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TOP 10 NOW!! {'\n'}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={PRODUCT}
          renderItem={TopTank}
          numColumns={1}
          keyExtractor={item => `${item.id}`}
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


export default RankScreen;