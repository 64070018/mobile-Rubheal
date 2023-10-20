import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../database';
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';


import { PRODUCT } from "../data/dummy-data";
import ShowProduct from '../components/ShowProduct';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const HomeScreen = ({ navigation, route }, props) => {

  // const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState("");
  const [cate, setCate] = useState("");
  const [searchText, setSearchText] = useState('');
  


  //search

  const SearchData = async () => {


    const q = query(collection(firebase.firestore(), "products"));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.size)
    const productData = [];
    const productAll = [];
    var i;

    for (i = 0; i < querySnapshot.size; i++) {
      const product = querySnapshot.docs[i].data().category;
      if (product === cate) {

        const dataPro = querySnapshot.docs[i].data();

        const dataAll = {
          name: dataPro.name,
          amount: dataPro.amount,
          category: dataPro.category,
          id: querySnapshot.docs[i].id,
          detail: dataPro.detail,
          image: dataPro.image,
          price: dataPro.price,
          rating: dataPro.rating,
          conditon: dataPro.condition,
          rating: dataPro.rating
        }


        productData.push(dataAll);





      }

      else {
        const dataPro = querySnapshot.docs[i].data();

        const dataAll = {
          name: dataPro.name,
          amount: dataPro.amount,
          category: dataPro.category,
          id: querySnapshot.docs[i].id,
          detail: dataPro.detail,
          image: dataPro.image,
          price: dataPro.price,
          rating: dataPro.rating,
          conditon: dataPro.condition,
          rating: dataPro.rating

        }

        // const updatedList = dataPro.map(item => ({
        //   id: querySnapshot.docs[i].id,
        //   ...item
        // }));

        productAll.push(dataAll)
      }

    }


    if (productAll.length == querySnapshot.size) {

      const filteredData = productAll.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCategoryData(filteredData)
    }

    else {
      const filteredData = productData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCategoryData(filteredData)
    }





  }


  //category onClick

  // const Catagories = async (cate) => {

  //   // console.log(cate)
  //   const q = query(collection(firebase.firestore(), "products"));
  //   const querySnapshot = await getDocs(q);

  //   const productData = [];
  //   const productAll = [];
  //   var i;

  //   for (i = 0; i < querySnapshot.size; i++) {
  //     // console.log(querySnapshot.docs[i].data())
  //     const product = querySnapshot.docs[i].data().category;

  //     const dataPro = querySnapshot.docs[i].data();

  //     if (product === cate) {

  //       const dataAll = {
  //         name: dataPro.name,
  //         amount: dataPro.amount,
  //         category: dataPro.category,
  //         id: querySnapshot.docs[i].id,
  //         detail: dataPro.detail,
  //         image: dataPro.image,
  //         price: dataPro.price,
  //         rating: dataPro.rating,
  //         conditon: dataPro.condition,
  //         rating: dataPro.rating

  //       }


  //       productData.push(dataAll);
  //     }

  //     else {
  //       const dataAll = {
  //         name: dataPro.name,
  //         amount: dataPro.amount,
  //         category: dataPro.category,
  //         id: querySnapshot.docs[i].id,
  //         detail: dataPro.detail,
  //         image: dataPro.image,
  //         price: dataPro.price,
  //         rating: dataPro.rating,
  //         conditon: dataPro.condition,
  //         rating: dataPro.rating

  //       }

  //       productAll.push(dataAll)
  //     }

  //   }


  //   if (productAll.length == querySnapshot.size) {
   
  //     setCategoryData(productAll)
  //     return productAll
  //   }
  //   setCategoryData(productData)


  //   return productData


  // }


 








  useEffect(() => {
      


    
    const q = query(collection(firebase.firestore(), 'products'));

    // Create a real-time listener to fetch and update data
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productData = [];
      const productAll = [];

      snapshot.forEach((doc) => {
        const dataPro = doc.data();
        const dataAll = {
          name: dataPro.name,
          amount: dataPro.amount,
          category: dataPro.category,
          id: doc.id,
          detail: dataPro.detail,
          image: dataPro.image,
          price: dataPro.price,
          rating: dataPro.rating,
          condition: dataPro.condition,
        };

        if (dataPro.category === cate) {
          productData.push(dataAll);
        } else {
          productAll.push(dataAll);
        }
      });

      if (productAll.length === snapshot.size) {
        setCategoryData(productAll);
      } else {
        setCategoryData(productData);
      }
    });

    return () => {
      // Unsubscribe from the real-time listener when the component unmounts
      unsubscribe();
    };

  






    // console.log(cate)


    // const intervalId = setInterval(() => {
    //   fetchData()
    // }, 10000);

    // return () => clearInterval(intervalId);

  }, [cate])


  const renderedItem = (itemData) => {

    return (

      <ShowProduct
        title={itemData.item.name}
        pic={itemData.item.image}
        price={itemData.item.price}
        rating={itemData.item.rating}
        
        onSelectProduct={() => {
          navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.image, detail: itemData.item.detail, policy: itemData.item.condition, price: itemData.item.price, id: itemData.item.id,   rating : itemData.item.rating}, setCate(""));
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.input} >
        <TextInput placeholder="Search" onChangeText={text => setSearchText(text)} value={searchText} />

        <AntDesign style={styles.searchIcon} name="search1" size={26} color={'gray'} onPress={() => SearchData(cate)} />

      </View>
      <AntDesign style={{ position: 'absolute', right: 5, top: 15 }} name="notification" size={26} color={'gray'} />
      <ScrollView>
        <Text style={styles.title}>Catagory</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 100 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("")}>
              <Image source={require('../assets/all-2.png')} style={[styles.catagory,]} />
              <Text style={styles.catTitle}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("food")}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2819/2819194.png' }} style={[styles.catagory,]} />
              <Text style={styles.catTitle}>FOOD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("clothes")}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3300/3300371.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>CLOTHES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("accessories")}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7695/7695930.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>ACCESSORY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("model")}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6967/6967594.png' }} style={styles.catagory} />
              <Text style={styles.catTitle}>MODEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cat} onPress={() => setCate("other")}>
              <Image source={{ uri: 'https://icon-library.com/images/others-icon/others-icon-20.jpg' }} style={styles.catagory} />
              <Text style={styles.catTitle}>OTHERS</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Text style={styles.title}>recommend</Text>


        <FlatList
          data={categoryData}
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