import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


import Icon from 'react-native-vector-icons/AntDesign';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('CreditDebitCard');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [originalPrice, setOriginalPrice] = useState(100); // Replace with your actual original price
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(100); // Initialize with the original price
  const [promoCodeCorrect, setPromoCodeCorrect] = useState(false); // State for correct promo code

  const handlePromoCode = () => {
    const promoCodeInput = promoCode.toLowerCase(); // Convert input to lowercase
    if (promoCodeInput === 'newuser') {
      // Apply a 10% discount for the "NEWUSER" promo code
      const discountPercentage = 0.1; // 10% discount
      const discountAmount = originalPrice * discountPercentage;
      setDeductedAmount(discountAmount);
      const updatedTotalPrice = originalPrice - discountAmount;
      setTotalPrice(updatedTotalPrice);
      setPromoCodeCorrect(true); // Set promoCodeCorrect to true
    } else {
      setPromoCodeCorrect(false); // Set promoCodeCorrect to false if promo code is incorrect
    }
  };

  const nav = useNavigation();
  const goBack = () => {
    nav.goBack();
  }

  const handlePayment = () => {
    if (
      paymentMethod === 'CreditDebitCard' &&
      (!name || !cardNumber || !expiryDate || !cvv)
    ) {
      alert('Please fill in all required fields for Credit/Debit Card payment.');
      return;
    }
    nav.navigate('PaymentSuccess');

    // Here, you can implement logic to process the payment
    // You can access the selected payment method and relevant input values from state
    // Perform payment processing here...
  };

  const renderPaymentFields = () => {
    if (paymentMethod === 'CreditDebitCard') {
      return (
        <>
          <Text style={{ paddingTop: 10 }}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            onChangeText={(text) => setName(text)}
          />
          <Text style={{ paddingTop: 10 }}>Card Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            onChangeText={(text) => setCardNumber(text)}
            keyboardType={'numeric'}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '66%' }}>
            <Text style={{ paddingTop: 10 }}>Security Code:</Text>
            <Text style={{ paddingTop: 10 }}>Expiry Date:</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
            <TextInput
              style={styles.input2}
              placeholder="CVV"
              onChangeText={(text) => setCvv(text)}
              keyboardType={'numeric'}
            />
            <TextInput
              style={styles.input3}
              placeholder="Expiry Date (MM/YY)"
              onChangeText={(text) => setExpiryDate(text)}
              keyboardType={'default'}
            />

          </View>



        </>
      );
    } else if (paymentMethod === 'Ewallet') {
      return (
        <View>
          <Text>Scan this QR code for Ewallet payment</Text>
          <Image style={{ height: 290, marginTop: 20 }} source={require("../picture/TngQR.png")} />
          {/* Replace the text above with your QR code component */}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ViewHeader}>
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Icon name="arrowleft" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.ViewTitle}>Payment</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.paymentMethodContainer}>
          <Text>Select Payment Method:</Text>
          <Picker
            mode={'dropdown'}
            prompt={'Select Payment Method'}
            selectedValue={paymentMethod}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
          >
            <Picker.Item label="Credit/Debit Card" value="CreditDebitCard" />
            <Picker.Item label="Ewallet" value="Ewallet" />
          </Picker>
        </View>
        {renderPaymentFields()}
        <Text style={styles.header}>Promo Code (if any):</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input1}
            placeholder="Enter Promo Code"
            onChangeText={(text) => setPromoCode(text)}
            onBlur={handlePromoCode} // Automatically apply promo code when blurred (user finishes entering)
          />
          {promoCodeCorrect && (
            <Icon name="check" size={30} color="green" style={styles.icon} />
          )}
        </View>
        <View>
          <Text style={styles.header}>Details: </Text>
        </View>
        <View style={styles.priceSection}>
          <Text>Subtotal: RM{originalPrice}</Text>
          <Text>Discount: RM{deductedAmount} </Text>
          <Text >Total: RM{totalPrice} </Text>
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={handlePayment}
        >
          <Text style={{ color: 'white' }}>Complete Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'white'
  },
  ViewHeader: {
    height: 50,
    borderColor: 'lightgray',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  ViewTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: 'black',
    paddingLeft: 30,
  },
  header: {
    paddingTop: 20,
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    position: 'relative',
  },
  input1: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    position: 'relative',
    width: 330,
  },
  input2: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    position: 'relative',
    width: 130,
  },
  input3: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    position: 'relative',
    width: 170,
    marginLeft: 40
  },
  Button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 200,
    alignItems: 'center',
    backgroundColor: '#5DBB63',
  },
  priceSection: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  icon: {
    marginLeft: 10,
    marginTop: 20,
  },
});

export default PaymentPage;
