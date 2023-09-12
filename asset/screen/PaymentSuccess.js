import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentSuccess = () => {
  const nav=useNavigation();
  const goHome= ()=>{
    nav.navigate('HomeScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>

        <Text style={styles.title}>Payment Successful!</Text>
        <Image style={styles.image} source={require("../picture/Check.png")} />
        <Text style={styles.text}>Payment Type: Credit/Debit Card</Text>
        <Text style={styles.text}>Amount Paid: RM100</Text>
        <Text style={styles.text}>Transaction ID: 144332432489</Text>
        <TouchableOpacity
          onPress={goHome}
          activeOpacity={0.7}
          style={styles.Button}
        >
          <Text style={{color:'white'}}>Close</Text>
        </TouchableOpacity>   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'lightgrey',
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 70,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: 'center', // Center the image horizontally within its container
    marginBottom: 10,
  },
  text: {
    paddingTop:5,
    textAlign: 'center',
    marginBottom: 5,
  },
  Button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 60,
    width:100,
    alignItems: 'center',
    backgroundColor:'#5DBB63',
  },
  HorizontalRow:{
    flexDirection:'row'
  }
});

export default PaymentSuccess;
