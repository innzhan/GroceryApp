import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Database from '../Database/Cart';


const ItemDetailScreen = () => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
    const itemPrice = 1.99; // Price per item

    // Function to increment the quantity
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to decrement the quantity (with a minimum of 1)
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Calculate the total price
    const totalPrice = (itemPrice * quantity).toFixed(2);
    const nav=useNavigation();
    const goBack = () => {
        nav.goBack();
    }

    const handleAddToCart = () =>{
        Alert.alert(
            'Add to Cart',
            'Item added to cart successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  // nav.navigate('CartScreen');
                },
              },
            ],
            { cancelable: false }
            );
    }

    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={require("../picture/milk.png")} />
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                <Icon name="arrowleft" size={45} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.boxContainer}>
                <Text style={{ fontSize: 25, color: 'black', fontWeight: '600' }}>Dutch Lady Milk</Text>
                <Text style={{ fontSize: 22, color: 'black', fontWeight: '600', paddingTop: 15 }}>Description</Text>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Textasdad</Text>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center',top:90,left:220 }}>
                    <TouchableOpacity  activeOpacity={0.7} onPress={decrementQuantity}>
                        <Icon name="minus" size={30} color="white" style={styles.circleButton} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, color: 'black', fontWeight: '600' }}>{quantity}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={incrementQuantity}>
                        <Icon name="plus" size={30} color='white' style={styles.circleButton} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containterBtm}>
                <View style={styles.boxContainer2}>
                    <Text style={{ fontSize: 28, color: 'black', fontWeight: '600',paddingLeft:10 }}>RM {totalPrice}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={handleAddToCart}
                    style={{
                        backgroundColor: '#5DBB63',
                        borderRadius: 15,
                        height: 50,
                        width: 150, 
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {/* <Text style={{color:'white'}}>Add to Cart</Text> */}
                    <Button
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Add to Cart'
                    onPress={() => {
                    // Fetch the item details or pass them as props
                    this.state.db.addCart(item.id, item.price, item.quantity);
                    }}
                  />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        position:'absolute'
    },
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
    },
    boxContainer: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom:30,
        height:255,
        position: 'relative',
        backgroundColor: 'white',
    },
    circleButton: {
        width: 30,
        height: 30,
        borderRadius: 15, // Half of the width/height to create a circle
        backgroundColor: '#5DBB63', // Background color of the circle
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10, // Adjust as needed
      },
    containterBtm: {
        flex:1,
        justifyContent: 'flex-end', 
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        marginLeft:2,
        marginRight:2,
        
    },
    
    boxContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
});

export default ItemDetailScreen;








