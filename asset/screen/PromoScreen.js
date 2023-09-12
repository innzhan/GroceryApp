import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';


const PromoScreen =()=>{
    return(
        <View style={styles.container}>
            <View >
            <Text style={styles.header}>Promo Code</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.box}>
                <Image resizeMode='contain' source={require('../picture/Promo2.png')} style={styles.image}/>
            </View>
            <View style={styles.box1}>
                <Image resizeMode='contain' source={require('../picture/Promo3.png')} style={styles.image}/>
            </View>
            <View style={styles.box2}>
                <Image resizeMode='contain' source={require('../picture/Promo4.png')} style={styles.image}/>
            </View> 
            </ScrollView>
            
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    header:{
            color: 'black',
            height: 50,
            paddingTop: 10,
            fontSize: 25,
            fontWeight: "bold",
            paddingLeft: 30,
            borderBottomWidth:1,
            borderRadius:5,
            borderColor: 'lightgray',
    },
    image:{
        height:responsiveHeight(30),
        width:'100%',


    },
    box:{
            borderRadius:15,
            borderWidth:2,
            borderColor:"#E3E3E3",
            width:350,
            marginLeft:25,
            marginRight:10,
            backgroundColor:'#548f73', 
            marginBottom:15,
            marginTop:5,
           
    },
    box1:{
        borderRadius:15,
            borderWidth:2,
            borderColor:"#E3E3E3",
            width:350,
            marginLeft:25,
            marginRight:10,
            backgroundColor:'#fff6f2', 
            marginBottom:15,
        
    },
    box2:{
        borderRadius:15,
            borderWidth:2,
            borderColor:"#E3E3E3",
            width:350,
            marginLeft:25,
            marginRight:10,
            backgroundColor:'#9EB83D', 
        
    }
}
)

export default PromoScreen;
