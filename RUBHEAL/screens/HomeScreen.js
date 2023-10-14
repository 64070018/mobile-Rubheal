import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../database';
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';


import { PRODUCT } from "../data/dummy-data";
import ShowProduct from '../components/ShowProduct';


const HomeScreen = ({ navigation, route }, props) => {

  // const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState("");
  const [cate, setCate] = useState("");




  // const Products = async () => {
  //   const q = query(collection(firebase.firestore(), 'products'));
  //   const querySnapshot = await getDocs(q);

  //   // const userData = querySnapshot.size;
  //   const productData = [];
  //   var i;

  //   for (i = 0; i < querySnapshot.size; i++) {
  //     // console.log(querySnapshot.docs[i].data())
  //     const product = querySnapshot.docs[i].data();
  //     productData.push(product);

  //   }


  //   return productData;



  // }

  const Catagories = async (cate) => {

    // console.log(cate)
    const q = query(collection(firebase.firestore(), "products"));
    const querySnapshot = await getDocs(q);

    const productData = [];
    const productAll = [];
    var i;

    for (i = 0; i < querySnapshot.size; i++) {
      // console.log(querySnapshot.docs[i].data())
      const product = querySnapshot.docs[i].data().category;
      // console.log(product)
      // console.log(cate)
      if (product === cate) {
        // console.log("1")
        // console.log("folk")

        productData.push(querySnapshot.docs[i].data());
      }

      else {
        productAll.push(querySnapshot.docs[i].data())
      }

    }
    // console.log(productAll.length)
    // console.log(querySnapshot.size)

    if (productAll.length == querySnapshot.size) {
      // console.log("folk")
      // console.log(productAll)
      setCategoryData(productAll)
      return productAll
    }
    setCategoryData(productData)

    return productData


  }



  useEffect(() => {


    const fetchData = async () => {

      try {
        // setCategory()
        if (cate == "food") {
          Catagories(cate)
          console.log("folk")




        }
        else if (cate == "clothes") {
          Catagories(cate)
          
        }
        else if (cate == "model") {
          Catagories(cate)

        }

        else if (cate == "accessories") {
          Catagories(cate)

        }
        else if (cate == 'other') {
          Catagories(cate)

        }
        else {


          Catagories(cate)


        }
      }
      catch(err){
        console.log(err)
      }

      }
      

    console.log("Folk")


    fetchData()




    // console.log("cate")
    console.log(cate)
    // console.log(categoryData)
    const intervalId = setInterval(() => {
      fetchData()// Fetch data every 2 minutes
    }, 10000);

    return () => clearInterval(intervalId);

  }, [cate])


  const renderedItem = (itemData) => {

    return (

      <ShowProduct
        title={itemData.item.name}
        pic={itemData.item.image}
        price={itemData.item.price}
        onSelectProduct={() => {
          navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.image, detail: itemData.item.detail, policy: itemData.item.condition, price: itemData.item.price }, setCate(""));
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.input} >
        <TextInput placeholder="Search" />
        {/* <AntDesign style={styles.searchIcon} name="faMagnifyingGlass" size={26} color={'gray'} /> */}
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