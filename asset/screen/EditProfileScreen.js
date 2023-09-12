
import {
  OutputWithLabel,
} from '../../UI';
// import { FloatingAction } from 'react-native-floating-action';
import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { LogBox } from 'react-native';
// LogBox.ignoreLogs([
//     'Non-serializable values were found in the navigation state',
// ]);
let config = require('../../Config');

export default class EditProfileScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        //userId: this.props.route.params.userId,
        username: user.username,
        password: user.password,
        
      }
  
      this._load = this._load.bind(this);
    }
    componentDidMount() {
      this._load();
    }
  
    componentWillUnmount() {
      this.props.route.params.refresh();
    }
  
    _load() {
      let url = config.settings.serverPath + '/api/user/' + this.state.userId;
  
      fetch(url)
        
        .then(user => {
          this.setState({
            username: user.username,
            password: user.password,
          });
  
        })
        .catch(error => {
          console.error(error);
        });
      console.log(this.state.userId);
  
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

    render() {

        return (
    
          <View style={styles.container}>
            <ScrollView style={styles.container}>
              <OutputWithLabel
                label={'Username'}
                value={this.state.name}
                orientation={'column'}
    
              />
              <OutputWithLabel
                label={'Password'}
                value={this.state.password}
                orientation={'column'}
              />
              </ScrollView>
              </View>
         );
            }
}




        const styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: 16,
                backgroundColor: 'white',
            },
            heading: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 16,
                color: 'black',
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
            },
            label: {
                fontSize: 18,
                fontWeight: '400',
                marginBottom: 8,
                color: 'black',
            },
            input: {
                fontSize: 16,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 8,
                padding: 8,
                marginBottom: 16,
            },
            passwordInputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 16,
            },
            passwordInput: {
                flex: 1,
                fontSize: 16,
                padding: 8,
            },
        });















// const EditProfileScreen = () => {
//     const [name, setName] = useState(username);
//     const [password, setPassword] = useState('********'); // Display a masked password
//     const [isEditing, setIsEditing] = useState(true); // Set to true by default
//     const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

//     const handleSaveChanges = () => {
//         // You can implement logic here to update user information on your server/database
//         // For this example, we'll just log the changes
//         console.log('Name:', name);
//         console.log('Password:', password);
//         setShowPassword(!showPassword);

//         // Display an alert to inform the user that changes were saved successfully
//         Alert.alert('Changes Saved', 'Your password have been updated successfully.');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Profile Settings</Text>

//             <Text style={styles.label}>Name:</Text>
//             <TextInput
//                 style={styles.input}
//                 value={name}
//                 onChangeText={(text) => setName(text)}
//             />

//             <Text style={styles.label}>Password:</Text>
//             <View style={styles.passwordInputContainer}>
//                 <TextInput
//                     style={styles.passwordInput}
//                     value={password}
//                     onChangeText={(text) => setPassword(text)}
//                     secureTextEntry={!showPassword} // Toggle secureTextEntry
//                 />
//                 <TouchableOpacity onPress={togglePasswordVisibility} style={{paddingRight:15}}>
//                     <Icon name={showPassword ? 'eye-slash' : 'eye'} size={24} color="gray"/>
//                 </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//                 activeOpacity={0.7}
//                 onPress={handleSaveChanges}
//                 style={{
//                     backgroundColor: '#5DBB63',
//                     borderRadius: 15,
//                     height: 50,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: 20,
//                 }}>
//                 <Text style={{ color: 'white' }}>Save Changes</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };



