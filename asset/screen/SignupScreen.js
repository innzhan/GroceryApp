import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';

let config = require('../../Config');

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            username: '',
            password: '',
            confirmPassword: '',
        }

        this._load = this._load.bind(this);
        this._store = this._store.bind(this);
    }

    componentDidMount() {
        this._load();
    }

    _load() {
        console.log('loading')
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

    _store() {


        let url = config.settings.serverPath + '/api/user';

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
            .then(response => {


                if (!response.ok) {
                    Alert.alert('Error1', response.status.toString());
                    throw Error('Error 1' + response.status);
                }
                console.log(response);
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.affected > 0) {
                    Alert.alert(
                        'Signed up successful', '',
                        [{
                            text: 'Ok', onPress: () => {
                                this.props.route.params.refresh();
                                this.props.navigation.navigate('Login');

                            }
                        }]
                    );
                } else {
                    Alert.alert('Error signing up');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    handleSignUp = () => {
        var emptyInput = 0;
        var errorMsg = '';


        if (this.state.username == '') {
            errorMsg = 'Username';
            emptyInput++;
        }

        if (this.state.password == '') {
            if (emptyInput > 0) {
                errorMsg += ', Password';
            }
            else {
                errorMsg = 'Password';
            }

            emptyInput++;
        }

        if (this.state.confirmPassword == '') {
            if (emptyInput > 0) {
                errorMsg += ', Confirm Password';
            }
            else {
                errorMsg = 'Confirm Password';
            }

            emptyInput++;
        }

        if (emptyInput != 0) {
            Alert.alert('Invalid input', 'Please fill in the following input(s):\n ' + errorMsg);
        } else {
            if (this.state.password != this.state.confirmPassword) {
                Alert.alert('Confirm password does not match with password');
            }
            else {
                this._load();

                let duplicatedUsername = false;

                for (var i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].username == this.state.username) {
                        duplicatedUsername = true;
                        break;
                    }
                }

                if (duplicatedUsername) {
                    Alert.alert('Username unavailable');
                }
                else {
                    this._store();
                }
            }
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
                <TextInput
                    style={styles.input}
                    placeholder={'Confirm Password'}
                    value={this.state.confirmPassword}
                    onChangeText={confirmPassword => {
                        this.setState({ confirmPassword });
                    }}
                    secureTextEntry={true}
                />
                <TouchableHighlight
                    onPress={this.handleSignUp}
                    style={styles.button}
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
                        Sign Up
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { this.props.navigation.navigate('Login') }}
                    style={{
                        width: 100,
                        height: 40,
                        marginTop: 15,
                        marginLeft: 10,
                        borderRadius: 20,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    underlayColor={'white'}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{
                                width: 30,
                                height: 30
                            }}
                            source={require('../picture/return-icon.png')}
                        />
                        <Text
                            style={{
                                color: 'black',
                                padding: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Login
                        </Text>
                    </View>
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
        width: 150,
        height: 60,
        margin: 20,
        borderRadius: 30,
        backgroundColor: '#222',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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