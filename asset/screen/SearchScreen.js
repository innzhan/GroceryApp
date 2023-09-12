import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const groceryItems = [
  { id: '1', name: 'Cookie', price: 2.99, image: require('../picture/milk.png') },
  { id: '2', name: 'Milk', price: 1.99, image: require('../picture/milk.png') },
  { id: '3', name: 'Apple', price: 1.99, image: require('../picture/milk.png') },
  { id: '4', name: 'Milk', price: 1.99, image: require('../picture/milk.png') },
  { id: '5', name: 'Milk', price: 1.99, image: require('../picture/milk.png') },
  { id: '6', name: 'Milk', price: 1.99, image: require('../picture/milk.png') },
];

const GroceryItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Image source={item.image} style={styles.itemImage} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.itemPrice}>RM {item.price.toFixed(2)}</Text>
    </View>
  );
};

const SearchScreen = () => {
  const nav = useNavigation();
  const handleNavigate=()=>{
    nav.navigate('ItemDetailScreen')
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(groceryItems);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = groceryItems.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Icon name="search1" size={24} color="black" />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search Product"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <FlatList
        numColumns={1}
        data={filteredItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.7} onPress={handleNavigate}>
            <View style={styles.itemContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={{flexDirection:'row',justifyContent:'space-between',width:260}}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>RM: {item.price}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBox: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#E3E3E3',
    color:'',
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    
  },
  itemContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    margin: 7,
    marginRight: 15,
    borderBottomWidth:1,
    borderRadius:5,
    borderColor: '#E3E3E3',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
    fontWeight: '400',
    marginLeft:20
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
    fontWeight: '400',
  },
});

export default SearchScreen;
