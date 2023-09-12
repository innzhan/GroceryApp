import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableHighlightBase
} from 'react-native';
// import CurrencyInput from 'react-native-currency-input';
// import CalendarPicker from 'react-native-calendar-picker';
// import { Picker } from '@react-native-picker/picker';

/**
 * InputWithLabel
 */
class InputWithLabel extends Component {
    constructor(props) {
        super(props);

        this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
    }
    render() {
        return (
            <View style={[inputStyles.container, { flexDirection: this.orientation }]}>
                <Text style={inputStyles.label}>
                    {this.props.label ? this.props.label : ''}
                </Text>
                <TextInput style={[inputStyles.input, this.props.style]}
                    placeholder={this.props.placeholder ? this.props.placeholder : ''}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    multiline={this.props.multiline ? this.props.multiline : false}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                    selectTextOnFocus={this.props.selectTextOnFocus ? this.props.selectTextOnFocus : false}
                    editable={this.props.editable !== null ? this.props.editable : true}
                />
            </View>
        )
    }
}

/**
 * OutputWithLabel
 */
class OutputWithLabel extends Component {
    constructor(props) {
        super(props);

        this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
    }
    render() {
        return (
            <View style={[inputStyles.container, { flexDirection: this.orientation }]}>
                <Text style={inputStyles.label}>
                    {this.props.label ? this.props.label : ''}
                </Text>
                <Text>
                    {this.props.value ? this.props.value : ''}
                </Text>

            </View>
        )
    }
}

/**
 * CurrencyInputWithLabel
 */
// class CurrencyInputWithLabel extends Component {
//     constructor(props) {
//         super(props);

//         this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
//     }

//     render() {
//         return (
//             <View style={[inputStyles.container, { flexDirection: this.orientation }, this.props.style]}>
//                 <Text style={inputStyles.label}>
//                     {this.props.label ? this.props.label : ''}
//                 </Text>
//                 <CurrencyInput style={[inputStyles.input, this.props.style]}
//                     value={this.props.value}
//                     delimiter={','}
//                     separator={'.'}
//                     precision={2}
//                     onChangeValue={this.props.onChangeValue}
//                     keyboardType={'numeric'}
//                     editable= {this.props.editable !== null ? this.props.editable : true}
//                 />
//             </View>
//         )
//     }
// }

// /**
//  * DatePickerWithLabel
//  */
// class DatePickerWithLabel extends Component {
//     constructor(props) {
//         super(props);

//         this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
//     }

//     render() {
//         return (
//             <View style={[inputStyles.container, { flexDirection: this.orientation }]}>
//                 <Text style={inputStyles.label}>
//                     {this.props.label ? this.props.label : ''}
//                 </Text>
//                 <CalendarPicker
//                     style={{ backgroundColor: 'white', alignSelf: 'center' }}
//                     date={this.props.date}
//                     onDateChange={this.props.onDateChange}
//                 />
//             </View>
//         )
//     }
// }

const inputStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    label: {
        fontSize: 18,
        marginLeft: 3,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',

    },
});

/**
 * saveButton
 */
class SaveButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={{
                    width: 150,
                    height: 62,
                    margin: 20,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#FFD200',
                    backgroundColor: '#FFF9DD',
                    alignSelf: 'center',
                }}
                underlayColor={'#FFD200'}
            >
                {/* <View style={[buttonStyles.button, this.props.style]}>
                    <Image
                        source={require('./assets/save-icon.png')}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                    <Text style={buttonStyles.buttonText}>Save</Text>
                </View> */}
            </TouchableHighlight>
        )
    }
}

const buttonStyles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 150,
        height: 60,
    },
    buttonText: {
        color: '#FFD200',
        padding: 5,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

/**
 * FloatingButton
 */
// class FloatingButton extends Component {
//     constructor(props) {
//         super(props);
//     }

    // render() {
    //     return (
    //         <TouchableHighlight
    //             style={floatingButtonStyles.button}
    //             onPress={this.props.onPress}
    //             background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
    //         >
    //             <View style={[this.props.style, { backgroundColor: this.backgroundColor }]}>
    //                 <Image source={this.props.source} style={floatingButtonStyles.image} />
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }
// }

const floatingButtonStyles = StyleSheet.create({
    button: {
        width: 66,
        height: 66,
        borderRadius: 33,
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
        elevation: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 33
    }
});


/**
 * Export modules
 */
module.exports = {
    OutputWithLabel: OutputWithLabel,
    InputWithLabel: InputWithLabel,
    SaveButton: SaveButton,
    // FloatingButton: FloatingButton,
    // CurrencyInputWithLabel: CurrencyInputWithLabel,
    // DatePickerWithLabel: DatePickerWithLabel,
}