import { View, Text,TextInput} from 'react-native';
import React from 'react';
import { responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/AntDesign';


const HomeSearch = () => {
    return (
        <View style={{
            backgroundColor: "#E3E3E3",
            height: responsiveHeight(5),
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 10
        }}
        >
            <Icon name="search1" size={24} color="black"/>
            <TextInput style={{flex:1}} placeholder="Search Product"/>
        </View>
    )
}

export default HomeSearch;