import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import FeatIcons from 'react-native-vector-icons/Feather';

import PaymentPage from './asset/screen/PaymentPage';
import PaymentSuccess from './asset/screen/PaymentSuccess';
import ItemDetailScreen from './asset/screen/ItemDetailScreen';
import HomeScreen from './asset/screen/HomeScreen';
import CategoryScreen from './asset/screen/CategoryPage';
import CartScreen from './asset/screen/CartScreen';
import PromoScreen from './asset/screen/PromoScreen';
import SearchScreen from './asset/screen/SearchScreen';
import AboutUsScreen from './asset/screen/AboutUs';
import SettingPage from './asset/screen/SettingPage';
import Login from './asset/screen/LoginScreen';
import SignUp from './asset/screen/SignupScreen';
import EditPW from './asset/screen/EditPW';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarActiveTintColor: 'black',
      tabBarActiveBackgroundColor: '#5DBB63',
      inactiveBackgroundColor: 'white',
      tabBarLabelStyle: {
        fontSize: 18,
      },
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: (color) => {
          return <Ionicons name="home" size={20} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: (color) => {
          return <AntIcons name="search1" size={20} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarIcon: (color) => {
          return <AntIcons name="appstore-o" size={20} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: (color) => {
          return <Ionicons name="cart-sharp" size={20} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={SettingPage}
      options={{
        tabBarIcon: (color) => {
          return <Ionicons name="person" size={20} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);

const DrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: 'center',
          height: 180,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          backgroundColor: '#5DBB63',
          bottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            paddingTop: 5,
            fontWeight: '500',
            paddingLeft: 15,
            paddingBottom: 10,
          }}
        >
          Grocery App
        </Text>
      </View>

      <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>

    <TouchableOpacity
    activeOpacity={0.7}
      style={{
        alignItems: 'center',
        justifyContent: 'center', // Change the button color as needed
        alignItems:'flex-start',
        paddingLeft:10,
        height: 40,
        margin: 10,
        borderRadius: 5,
      }}
      onPress={() => { }}
    >
      
    </TouchableOpacity>
  </View>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={DrawerComponent} screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={HomeTabs}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={20} color={color} />
        ),
      }}
    />
    <Drawer.Screen name="Edit Profile" component={SettingPage}
      options={{
        drawerIcon: ({ color }) => (
          <AntIcons name="edit" size={20} color={color} />
        ),
      }}
    />
    <Drawer.Screen name="Promo" component={PromoScreen}
      options={{
        drawerIcon: ({ color }) => (
          <MatIcons name="discount" size={20} color={color} />
        ),
      }}
    />
    <Drawer.Screen name="About Us" component={AboutUsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <MatIcons name="contact-support" size={20} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="PaymentPage" component={PaymentPage} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
        <Stack.Screen name="EditPW" component={EditPW} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;