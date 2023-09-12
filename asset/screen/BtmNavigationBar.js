import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';


import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import Category from './Category';
import Login from './LoginScreen';

const Home = 'HomeScreen';
const Search = 'SearchScreen';

const Tab = createBottomTabNavigator();

const BtmNavigationBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRoutename={Home} screenOptions={{
                headerShown:false,
                tabBarActiveTintColor: '#e91e63',
                tabBarActiveBackgroundColor: 'pink',
                inactiveBackgroundColor: 'white',
                tabBarLabelStyle: {
                    fontSize: 22,
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                },
            }}
            ><Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: () => {
                            return <Ionicons name="home" size={20} color={'black'} />;
                        },
                    }}
                />
                <Tab.Screen
                    name="Category"
                    component={Category}
                    options={{
                        tabBarIcon: () => {
                            return <Icons name="appstore-o" size={20} color={'black'} />;
                        },
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarIcon: () => {
                            return <Ionicons name="cart-sharp" size={20} color={'black'} />;
                        },
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={Login}
                    options={{
                        tabBarIcon: () => {
                            return <Ionicons name="person" size={20} color={'black'} />;
                        },
                    }}
                />
                
            </Tab.Navigator>

        </NavigationContainer>
    )
}


export default BtmNavigationBar;