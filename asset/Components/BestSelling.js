import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,FlatList,Button} from 'react-native';
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const groceryItems = [
    { id: '1', name: 'Cookie', price: 2.99, image: require('../picture/milk.png') },
    { id: '2', name: 'Milk', price: 1.99 , image: require('../picture/milk.png') },
    { id: '3', name: 'Apple', price: 1.99 , image: require('../picture/milk.png') },
    { id: '4', name: 'Milk', price: 1.99 , image: require('../picture/milk.png') },
];

const GroceryItem = ({ item }) => {
    const addToCart = () => {
        // Implement your logic to add the item to the cart
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity >
                <Image source={item.image} style={styles.itemImage} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.itemPrice}>RM {item.price.toFixed(2)}</Text>
            <Button title="Add to Cart" onPress={addToCart} />
        </View>
    );
};


const BestSelling=() =>{
  const nav=useNavigation();
  const handleNavigate = () => {
    console.log('clicked')
    nav.navigate('ItemDetailScreen');
  }
    return(
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={groceryItems}
                renderItem={({item, index})=>(
                    <TouchableOpacity
                    onPress={handleNavigate}
                    activeOpacity={0.7}>
                    <View style={{
                        height:responsiveHeight(25),
                        width:responsiveWidth(35),
                        marginRight:15,
                        borderRadius:15,
                        borderWidth:2,
                        borderColor:"#E3E3E3",
                }}>
                    <Image  resizeMode="contain" source={item.image} style={styles.itemImage}/>
                    <View style={{paddingHorizontal:15}}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text >RM: {item.price}</Text> 
                    </View>
                    </View>
                    </TouchableOpacity>
                )} 
                />

        </View>
    )
}

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
      width: 100,
      height: 100,
      marginTop:7,
      marginLeft:10
    },
    itemName: {
      paddingTop:5,
      fontSize: 18,
      marginBottom: 4,
      color:'black'
    },
    itemPrice: {
      fontSize: 14,
      marginBottom: 8,
    },
  });

export default BestSelling;