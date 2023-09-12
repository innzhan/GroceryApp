import React, {useEffect,  useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

let config = require('../../config');


const ProductsItem = () => {
  const[groceryItems,setGroceryItems] = useState([]);
  const nav = useNavigation();
  useEffect(() =>{
    const Url = config.settings.serverPath +'/api/grocery';

    fetch(Url)
    .then((response) => response.json())
    .then((data) =>{
      setGroceryItems(data);
    })
    .catch ((error) => {
      console.erroe(error);
    });
  },[]);

  const handleNavigate = () =>{
    nav.navigate('ItemDetailScreen');
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={groceryItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={handleNavigate} activeOpacity={0.7}>
            <View
              style={{
                height: responsiveHeight(25),
                width: responsiveWidth(38),
                margin: 10,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#E3E3E3",
              }}
            >
              <Image resizeMode="contain" source={{ uri: item.image }} style={styles.itemImage} />
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>RM: {item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
  },
  itemImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginBottom: 8,
    marginLeft: 20
  },
  itemName: {
    fontSize: 18,
    marginBottom: 4,
    color: 'black'
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ProductsItem;