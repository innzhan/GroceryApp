import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let config = require('../../Config');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userId: '',
            users: [],
        }

        this._load = this._load.bind(this);
    }

    componentDidMount() {
        this._readSettings();
        this._load();
    }

    _load() {
        let url = config.settings.serverPath + '/api/user';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Error', response.status.toString());
                    throw Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(users => {
                this.setState({ users });
            })
            .catch(error => {
                console.log(error);
            });
    }

    async _saveSettings() {

        try {
            await AsyncStorage.setItem ('username', this.state.username);
            await AsyncStorage.setItem ('password', this.state.password);

        } catch (error) {
            console.log('## ERROR SAVING ITEM ##: ', error);
        }
    }

    async _readSettings() {
        try {
            const username = await AsyncStorage.getItem('username')
            if (username !== null) {
                this.setState({username})
            }
            const password = await AsyncStorage.getItem('password')
            if (password !== null) {
                this.setState({password});
            }
        }
        catch (error) {
            console.log('## ERROR READING ITEMS ##: ', error);
        }
    }

    handleLogin = () => {
        let validLoginCredentials = false;
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username == this.state.username) {
                if (this.state.users[i].password == this.state.password) {
                    this._saveSettings();
                    this.setState({
                        userId: this.state.users[i].userId.toString()
                    }, () => {
                        this.props.navigation.navigate('Drawer', { userId: this.state.userId });
                    });
                    validLoginCredentials = true
                    break;
                }
            }
        }
        
        if (!validLoginCredentials) {
            Alert.alert('Please enter a correct username and password')
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image
                    source={require('../picture/mainIcon.png')}
                    style={{
                        marginTop: 60,
                        width: 300,
                        height: 300,
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        borderRadius: 150,
                        margin: 5
                    }}
                />
                <Text
                    style={{
                        color: 'black',
                        fontSize: 26,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginBottom: 30,
                        textAlign: 'center'
                    }}
                >
                    Grocery App
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    value={this.state.username}
                    onChangeText={username => {
                        this.setState({ username });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    value={this.state.password}
                    onChangeText={password => {
                        this.setState({ password });
                    }}
                    secureTextEntry={true}
                />
                <TouchableHighlight
                    onPress={this.handleLogin}
                    style={{
                        width: 150,
                        height: 60,
                        margin: 20,
                        borderRadius: 30,
                        backgroundColor: '#222',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    underlayColor={'#555'}
                >
                    <Text
                        style={{
                            color: 'white',
                            padding: 5,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { this.props.navigation.navigate('SignUp', { refresh: this._load }) }}
                    style={{
                        width: 150,
                        height: 62,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#f3ae4e',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    underlayColor={'#222'}
                >
                    <Text
                        style={{
                            color: '#f3ae4e',
                            padding: 5,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}
                    >
                        Sign up 
                    </Text>
                    
                </TouchableHighlight>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3ae4e'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 150,
        height: 60,
    },
    input: {
        fontSize: 18,
        alignSelf: 'center',
        width: 350,
        marginBottom: 20,
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'white'
    }
});