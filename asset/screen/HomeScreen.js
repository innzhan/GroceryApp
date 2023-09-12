import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, ScrollView } from 'react-native';
import HomeSearch from '../Components/HomeSearch';
import HomeBanner from '../Components/HomeBanner';
import ProductsItem from '../Components/ProductsItem';
import BestSelling from '../Components/BestSelling';


const HomeScreen = () => {

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.iconBox}>
          <Text style={styles.iconText}>GroceryStore</Text>
          </View>
          <HomeBanner />
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "600", color: 'black', paddingBottom: 10 }}>Best Selling</Text>
          <BestSelling />
          <View style={{ flexDirection: 'row', justifyCOntent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 25, color: 'black' }}>Products</Text>
          </View>
          <ProductsItem />
        </ScrollView>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
    paddingTop: 15, 
    flex: 1, 
    backgroundColor: 'white', 
    gap: 10
  },
  iconBox:{
    borderRadius:10,
    padding:10,
    width:160,
    backgroundColor:'#5DBB63'
  },
  iconText:{
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  }
})



export default HomeScreen;