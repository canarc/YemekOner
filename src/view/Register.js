import React, {Component} from 'react';
import CustomInput from './common/CustomInput';
import {
  Image,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Input, Text} from 'react-native-elements';
import {HEIGHT} from '../common/constants';
import {Actions} from 'react-native-router-flux';
import AuthActions from '../redux/actions/AuthActions';
import {connect} from 'react-redux';
import {fontSize} from '../helper/sizeHelper';
const {register} = AuthActions;

class Register extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        date: new Date(2002, 0, 1),
        email: '',
        city: 'Bursa',
        password: '',
        error: 0,
      });
  }

  render() {
    return (
      <SafeAreaView flex={1}>
        <KeyboardAvoidingView behavior="position">
          <View
            style={{
              width: '90%',
              marginLeft: '5%',
              paddingLeft: '5%',
              marginTop: '10%',
              marginBottom: '5%',
            }}>
            <Input
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              label="Email"
              placeholder="birisi@deneme.com"
              onChangeText={e => {
                this.setState({email: e});
              }}
            />
            <Input
              secureTextEntry
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              placeholder="******"
              label="Şifre"
              onChangeText={e => {
                this.setState({password: e});

                if (e != this.state.passwordAgain) {
                  this.setState({
                    passwordError: 'Şifreler eşleşmiyor.',
                  });
                } else {
                  this.setState({passwordError: null});
                }
              }}
            />
            <Input
              secureTextEntry
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              placeholder="******"
              label="Şifre Tekrar"
              errorStyle={{color: 'red'}}
              errorMessage={this.state.passwordError}
              onChangeText={e => {
                this.setState({passwordAgain: e});

                if (e != this.state.password) {
                  this.setState({passwordError: 'Şifreler eşleşmiyor.'});
                } else {
                  this.setState({passwordError: null});
                }
              }}
            />
            <Input
              rightIcon={{
                onPress: () => {
                  this.setState({
                    showDatePicker: !this.state.showDatePicker,
                  });
                },
                type: 'ionicon',
                name: 'ios-calendar',
                size: 25,
                color: 'dimgray',
              }}
              editable={false}
              value={this.state.date.toLocaleDateString('tr')}
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              placeholder="12.12.2020"
              label="Doğum Tarihi"
            />
            <Input
              disabled={true}
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              placeholder="Bursa"
              label="Şehir"
            />
          </View>

          <Button
            buttonStyle={{backgroundColor: '#0f4c81'}}
            title="Kayıt Ol"
            onPress={
              () =>
                this.props.register(
                  this.state.email,
                  this.state.password,
                  this.state.date,
                  this.state.city,
                )
              //Actions.firstLoginScreen()
            }
            containerStyle={{
              width: '70%',
              alignSelf: 'center',
            }}
          />
        </KeyboardAvoidingView>
        {this.state.showDatePicker && (
          <DateTimePicker
            onChange={(event, date) => {
              this.setState({date: date});
            }}
            style={{flex: 1}}
            testID="dateTimePicker"
            locale="tr-TR"
            maximumDate={new Date(2002, 0, 1)}
            minimumDate={new Date(1950, 0, 1)}
            timeZoneOffsetInMinutes={0}
            value={this.state.date}
            mode="date"
            is24Hour={true}
            display="default"
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {error} = state.auth;
  return {error};
};

export default connect(
  mapStateToProps,
  {register},
)(Register);
