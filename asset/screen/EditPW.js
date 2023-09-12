import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let config = require('../../Config');

export default class EditPW extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    }
  
    handleChangePassword = async () => {
      const { currentPassword, newPassword, confirmPassword } = this.state; 
      if (newPassword !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }
  
      try {
        const username = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
  
        if (username && currentPassword === storedPassword) {
  
          await AsyncStorage.setItem('password', newPassword);
          let url = config.settings.serverPath + '/api/user';
          const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
               username, 
               password:newPassword, 
            }),
          });
          
          if (response.ok) {



          Alert.alert('Password changed successfully');
          this.props.navigation.navigate('Drawer', { userId: this.state.userId });
        } else {
            Alert.alert('Failed to update password on the server');
        }
          
        } else {
          Alert.alert('Invalid current password');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('An error occurred. Please try again.');
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => this.setState({ currentPassword: text })}
          />
  
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => this.setState({ newPassword: text })}
          />
  
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />
  
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f3ae4e',
    },
    label: {
      fontSize: 18,
      marginTop: 10,
    },
    input: {
      fontSize: 18,
      marginBottom: 20,
      borderRadius: 30,
      padding: 10,
      backgroundColor: 'white',
    },
    button: {
      backgroundColor: '#222',
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  






































































// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   Alert
// } from 'react-native';
// import {
//   InputWithLabel,
//   SaveButton
// } from '../UI';
// let config = require('../../Config');

// export default class EditSupplier extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//         userId: this.props.route.params.userId,
//         username: '',
//         password: '',
//     }
//     this._load = this._load.bind(this);
//     this._update = this._update.bind(this);
//   }
//   componentDidMount() {
//     this._load();
//   }

//   _load() {
//     let url = config.settings.serverPath + '/api/user/' + this.state.userId;

//     fetch(url)
//       .then(response => {
//         if (!response.ok) {

//           Alert.alert('Error', response.status.toString());
//           throw Error('Error ' + response.status);
//         }

//         return response.json();

//       })
//       .then(supplier => {
//         this.setState({
//         username: userId.username,
//         password: userId.password,
//         });

//       })
//       .catch(error => {
//         console.error(error);
//       });
//     console.log(this.state.userId);

//   }

//   _update() {
//     let url = config.settings.serverPath + '/api/user/' + this.state.supplierId;

//     fetch(url, {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: this.state.username,
//         password: this.state.password,
//       }),
//     })
//       .then(response => {

//         if (!response.ok) {
//           Alert.alert('Error ', response.status.toString());
//           throw Error('Error ' + response.status);
//         }

//         return response.json();
//       })
//       .then(responseJson => {
//         if (responseJson.affected > 0) {
//           Alert.alert('Updated successfully', '', [{
//             text: 'Ok', onPress: () => {

//               this.props.route.params.refresh();
//               this.props.navigation.goBack();
//             }
//           }])
//         } else {
//           Alert.alert('Error updating password');
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   handleSaveButton = () => {
//     var emptyInput = 0;
//     var errorMsg = '';


//     if (this.state.username == '') {
//       errorMsg = 'Username';
//       emptyInput++;
//     }
//     if (this.state.password == '') {
//         errorMsg = 'Password';
//         emptyInput++;
//       }

//     if (emptyInput != 0) {
//       Alert.alert('Cannot save', 'Please fill in the following input(s):\n ' + errorMsg);
//     } else {

//       this._update();
//     }
//   }
//   render() {
//     return (
//       <ScrollView style={styles.container}>
//         <InputWithLabel
//           label={'Username'}
//           placeholder={'Username'}
//           value={this.state.username}
//           onChangeText={(username) => {
//             this.setState({ username: username });
//           }
//           }
//           keyboardType={'default'}
//           orientation={'column'}
//         />
//         <InputWithLabel
//           label={'Password'}
//           placeholder={'Password'}
//           value={this.state.password}
//           onChangeText={(password) => {
//             this.setState({ password: password });
//           }
//           }
//           keyboardType={'default'}
//           orientation={'column'}
//         />
        

//         <InputWithLabel
//           style={{
//             borderWidth: 1,
//             borderColor: 'lightgray',
//             borderRadius: 10,
//             height: 100,
//           }}
//           label={'Note'}
//           placeholder={'Note...'}
//           value={this.state.note}
//           onChangeText={(note) => this.setState({
//             note: note,
//           })}
//           keyboardType={'default'}
//           orientation={'column'}
//           multiline={true}
//         />

//         <SaveButton
//           onPress={this.handleSaveButton}
//         />
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 20,
//   },
//   button: {
//     margin: 10,
//   },
//   image: {
//     width: 360,
//     height: 360,
//   }
// });