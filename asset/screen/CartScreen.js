import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CartScreen = () => {
    const nav=useNavigation();
    const navToPayment=()=>{
        nav.navigate('PaymentPage')
    }
    const [cartItems, setCartItems] = useState([
        {
            name: 'Milk',
            price: 10,
            quantity: 2,
        },
        {
            name: 'Cookie',
            price: 4,
            quantity: 5,
        },
    ]);

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity <= 0) {
            // Remove the item from the cart if quantity is 0 or less
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);
            setCartItems(updatedCart);
        } else {
            // Update the quantity of the item
            const updatedCart = [...cartItems];
            updatedCart[index].quantity = newQuantity;
            setCartItems(updatedCart);
        }
    };

    // Calculate the total price by iterating through cartItems
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart</Text>
            <Text style={{color:'black', fontSize:15,paddingTop:10}}>      Quantity                                 Name                     Price(RM)</Text>
            {cartItems.map((item, index) => ( 
                <View key={index} style={styles.cartItem}>
                    <TouchableOpacity
                        onPress={() => updateQuantity(index, item.quantity - 1)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => updateQuantity(index, item.quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{`${item.price * item.quantity}`}</Text>
                </View>
            ))}
            <View style={{ flex: 1 }} />
            <View style={{ alignItems: 'center', justifyContent: 'space-between',top:15, backgroundColor: 'white',borderTopWidth:1,borderRadius:5,borderColor: 'lightgray', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={{ paddingTop: 10, paddingRight: 267, fontSize: 18, color:'black' }}>Total Price</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: '400',color:'black' }}>RM {totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={navToPayment} 
                        style={{
                            bottom:5,
                            backgroundColor: '#5DBB63',
                            borderRadius: 15,
                            height: 50,
                            width: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color:'white'}}>Check Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        color: 'black',
        height: 50,
        paddingTop: 10,
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 30,
        borderBottomWidth:1,
        borderRadius:5,
        borderColor: 'lightgray',
        marginBottom:5
    },
   
    cartItem: {
        borderBottomWidth:1,
        borderColor: 'lightgray',
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    quantityButton: {
        width: 23,
        height: 23,
        borderRadius: 15, // Half of the width/height to create a circle
        backgroundColor: '#5DBB63', // Background color of the circle
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:5
    },
    quantityButtonText: {
        fontSize: 18,
        color: 'white',
    },
    itemQuantity: {
        fontSize: 18,
        color:'black'
    },
    itemName: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color:'#5DBB63'
    },
    itemPrice: {
        fontSize: 16,
        marginLeft: 10,
        color:'black',
        right:15
    },
});

export default CartScreen;
