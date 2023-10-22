import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";

import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../database';
import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';


import { COMMENT } from "../data/dummy-data";
import comment from '../components/comment';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const DetailScreen = ({ navigation, route }) => {
    const [addComment, setAddComment] = useState('');
    const [getComments, setComments] = useState([]);
    const [productId, setProductId] = useState(route.params.id);
    console.log("product id", productId)
  
    

    const [defaultRating, setdefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5])
    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

    const starIcons = [];
  
    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

        if(i < route.params.rating){
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
   

    //star
   const CustomRatingBar = () =>{
    return (
        <View style={styles.customRatingBarStyle}>
        {
            maxRating.map((item, key) => {
                return (
                    <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setdefaultRating(item)}>
                        <Image source={item <= defaultRating ? {uri : starImgFilled} : {uri : starImgCorner}} style={styles.starImgStyle}/>
                      
                    </TouchableOpacity>
                )
            })
        }
    </View>

    )
   }

   const queryRating = async () =>{
    const qComments = query(collection(firebase.firestore(), "comments"));
 
    const querySnapshotComments = await getDocs(qComments);


    var i  = 0;
    var rate = 0;
    var num = 0;

    var meanRate = 0;

    for (i ; i < querySnapshotComments.size; i++){
        const commentId = querySnapshotComments.docs[i].data().ProductId;
        setProductId(commentId)
        console.log("comment id", commentId)
        if(route.params.id == commentId){
                rate += querySnapshotComments.docs[i].data().rating;
                num += 1;
        }
      
    }

    console.log(Math.floor(rate / num));

    if(rate == 0){
        meanRate = 0
    }

    else{
        meanRate = Math.floor(rate/num)

    }


    


    




    const productRef = firebase.firestore().collection('products').doc(route.params.id);
    // Use the update method to update the document with the new data
    productRef.update({
        rating: meanRate,
      })
      .then(() => {
        console.log('Document updated successfully.');
      })
      .catch(error => {
        console.error('Error updating document:', error);
      });

    


  }

    //addComment
    const AddComment = async () =>{
        // console.log(auth.currentUser)
        const userEmail = auth.currentUser.email;
        const q = query(collection(firebase.firestore(), 'users'), where('email', '==', userEmail));
     

        // console.log(q)

        const querySnapshot = await getDocs(q);

        const userData = querySnapshot.docs[0].data();

        const name = userData.name;
        const currentDate = new Date(); // Get the current date and time

        // Create an array of month names for formatting
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Format the date and time
        const formattedDate = `${currentDate.getDate()}-${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

        const data = {
            id: auth.currentUser.uid,
            name : name,
            comment : addComment,
            time : formattedDate,
            ProductId : route.params.id,
            rating : defaultRating
    
            // Add other user data fields as needed
          };
          addDoc(collection(firestore, 'comments'), data)
          .then(() => {
            console.log('User data added to Firestore');
  
            // alert("Correct")
          })
          .catch(error => {
            console.error('Error adding user data to Firestore:', error);
          });

          queryRating();

          setAddComment("")
          setdefaultRating(1);

          
    }

    const listenForRatingChanges = () => {
        const qComments = query(collection(firebase.firestore(), 'comments'));
    
        const unsubscribe = onSnapshot(qComments, (querySnapshotComments) => {
            let i = 0;
            let rate = 0;
            let num = 0;
            var meanRate = 0;
    
            for (i; i < querySnapshotComments.size; i++) {
                const commentId = querySnapshotComments.docs[i].data().ProductId;
                if (route.params.id === commentId) {
                    rate += querySnapshotComments.docs[i].data().rating;
                    num += 1;
                }
            }

           

            if(rate == 0){
                meanRate = 0
            }

            else{

                meanRate = Math.floor(rate / num);
            }
    

            
    
       
            route.params.rating = meanRate;
    
       
        });
    
        return unsubscribe; // To stop listening when the component unmounts
    };
    

    useEffect(() => {
        console.log(route.params)

  
        const readRating = listenForRatingChanges();




        // fetchData()
        const commentsRef = query(collection(firebase.firestore(), 'comments'), orderBy('time', 'desc'));;

        // Set up a real-time listener to listen for new comments in Firestore
        const unsubscribe = onSnapshot(commentsRef, (querySnapshot) => {
          const allProduct = [];
    
          querySnapshot.forEach((doc) => {
            const commentData = doc.data();
    
            if (commentData.ProductId === route.params.id) {
              allProduct.push(commentData);
            }
          });
    
          setComments(allProduct);
          
        });

    
    
        return()=>{
          // Unsubscribe from the real-time listener when the component unmounts

          readRating();
          unsubscribe();
          queryRating();
       
         

          
         
        
          
        };
       
    
      
     
      }, [])

    // const {title, pic} = route.params;
    // console.log('params')
    // console.log(route.params)
    // console.log(title)
    // console.log(route)
    // console.log(props)
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={{ uri: route.params.pic }} style={{ width: '100%', height: responsiveHeight(40) }} />
            <View style={{ margin: 10, }}>
                <Text style={styles.title}>{route.params.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                 {starIcons} 
                 <Text style={{ fontSize: 16, bottom: 0 }}> ({route.params.rating}) </Text>

                    {/* <Text style={{ fontSize: 16, bottom: 0 }}> prop.item.rate (5.0) </Text> */}
                </View>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}> {route.params.price} บาท</Text>

                <TouchableOpacity style={[styles.button]} onPress={() => {
                    navigation.navigate('Cart', {title:route.params.title, pic:route.params.pic, price:route.params.price, owner:route.params.owner, productId: productId })
                    // navigation.navigate('Cart', {screen: 'Aom',params:{title:route.params.title, pic:route.params.pic, price:route.params.price}})
                }}>
                    <Text style={styles.buttonText}>BUY</Text>
                </TouchableOpacity>

            </View>

            {/* store account */}
            <View style={{ borderBottomColor: '#aaa', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 10 }}>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={[styles.account, ]} />       
                <Text style={{ fontSize: 20, fontWeight: '600', }}> Store Name </Text>
            </View>

            {/* Detail Product */}

            <View>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.content}>

                    {route.params.detail}
                </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20 }}>
                <Text style={[styles.header,]}>Policy</Text>
                <Text style={[styles.content,]}>

                    {route.params.policy}
                </Text>
            </View>


            {/* comments */}

            <View style={{ marginTop: 30 }}>
                <Text style={[styles.header, {fontSize: 16}]}>Comments</Text>
            
                <TextInput style={styles.input}
                    multiline
                    numberOfLines={3}
                    maxLength={40} placeholder='Feedback' onChangeText={text => setAddComment(text)} value={addComment} />
                    <TouchableOpacity style={{alignItems : 'flex-end', margin : 10}} onPress={AddComment} disabled={addComment == ""}>
                         <Image source={require("../assets/send.png")} style={{width : 30, height : 30}} />
                    </TouchableOpacity>
                    <CustomRatingBar />
                    <Text style={{textAlign : 'center'}}>{defaultRating + '/' + maxRating.length }</Text>
                   
            </View>

            <FlatList
                data={getComments}
                renderItem={comment}
                numColumns={1}
                keyExtractor={item => `${item.ProductId}`}
            />

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 5,
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '20%',
        backgroundColor: '#9276F2',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'

    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        fontSize: 16,
        height: responsiveHeight(10),
        marginHorizontal: '5%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'light',
        textAlign: 'left'
    },
    header: {
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10
    },
    content: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20

    },
    account: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 50,
        marginLeft: 20,
    },
    customRatingBarStyle : {
        justifyContent : 'center',
        flexDirection : 'row',
        marginTop: 30,

    },
    starImgStyle : {
        width : 40,
        height : 40,
        resizeMode : 'cover'
    } 
});


export default DetailScreen;