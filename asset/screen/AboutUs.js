import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const AboutUs = () => {
  const storeLocation = {
    latitude: 3.0385389342025935,
    longitude: 101.77009325605582,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={{ fontSize: 18, color: 'black', paddingLeft: 5 }}>Contact us</Text>
      <View style={styles.box}>
        <View style={styles.horizontal}>
          <Icon name="instagram" size={24} color="black" />
          <Text>GroceryStore</Text>
        </View>
        <View style={styles.horizontal}>
          <Icon name="facebook" size={24} color="black" />
          <Text>GroceryStore</Text>
        </View>
        <View style={styles.horizontal}>
          <Icon name="phone" size={24} color="black" />
          <Text>03-33221022</Text>
        </View>
      </View> 
      
      <Text style={{ fontSize: 18, color: 'black', paddingLeft: 5 ,paddingBottom:15}}>Our Store Location:</Text>
      <MapView
        style={{ width: '100%', height: 300 ,borderRadius:1,borderWidth:1}}
        initialRegion={{
          latitude: storeLocation.latitude,
          longitude: storeLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={storeLocation}
          title="Store Location"
          description="Our Grocery Store"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  box: {
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: 'lightgrey',
    marginBottom:20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '36%',
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default AboutUs;
