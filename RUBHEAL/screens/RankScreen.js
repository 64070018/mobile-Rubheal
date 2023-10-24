import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView } from 'react-native';

import { PRODUCT } from "../data/dummy-data";
// import showProduct from '../components/ShowProduct';
import TopTank from '../components/TopRank';
import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../database';
import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';


const RankScreen = ({ navigation, route }, props) => {

  const [products, setProduct] = useState([]);



  useEffect(() => {
    console.log(products)




    // fetchData()
    const productRef = query(collection(firebase.firestore(), 'products'), orderBy('rating', 'desc'));;

    // Set up a real-time listener to listen for new comments in Firestore
    const unsubscribe = onSnapshot(productRef, (querySnapshot) => {
      const allProduct = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();

        const dataAll = {
          name: productData.name,
          amount: productData.amount,
          category: productData.category,
          id: doc.id,
          detail: productData.detail,
          image: productData.image,
          price: productData.price,
          rating: productData.rating,
          condition: productData.condition,
          owner: productData.owner,
        };

        allProduct.push(dataAll);

      });

      setProduct(allProduct);

    });



    return () => {
      // Unsubscribe from the real-time listener when the component unmounts

      unsubscribe();



    };

  }, [])
  const Top10Product = products.slice(0, 10)

  const renderedItem = (itemData) => {
    console.log(itemData.item)
    return (

      <TopTank
        title={itemData.item.name}
        pic={itemData.item.image}
        price={itemData.item.price}
        rating={itemData.item.rating}
        owner={itemData.item.owner}
        onSelectProduct={() => {
          navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.image, detail: itemData.item.detail, policy: itemData.item.condition, price: itemData.item.price, id: itemData.item.id, rating: itemData.item.rating, owner: itemData.item.owner });
        }}
      />
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>TOP 10 NOW!! {'\n'}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {Top10Product.map((item) => (
          <TopTank
            key={item.id}
            title={item.name}
            pic={item.image}
            price={item.price}
            rating={item.rating}
            owner={item.owner}
            onSelectProduct={() => {
              navigation.navigate('Detail', {
                title: item.name,
                pic: item.image,
                detail: item.detail,
                policy: item.condition,
                price: item.price,
                id: item.id,
                rating: item.rating,
                owner: item.owner,
              });
            }}
          />
        ))}
   
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




