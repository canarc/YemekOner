import React, {Component} from 'react';
import CustomInput from './common/CustomInput';
import {
  Image,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {HEIGHT} from '../common/constants';
import {Actions} from 'react-native-router-flux';
import AuthActions from '../redux/actions/AuthActions';
import {connect} from 'react-redux';
import {fontSize} from '../helper/sizeHelper';
const {login} = AuthActions;

class Login extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        email: 'mahmutcankahya@gmail.com',
        password: '123456',
        error: 0,
      });
  }

  render() {
    return (
      <SafeAreaView flex={1}>
        <KeyboardAvoidingView behavior="position">
          <Image
            style={{
              width: '100%',
              resizeMode: 'contain',
              marginTop: '40%',
            }}
            source={require('../common/assets/logo.png')}
          />
          <View
            style={{
              width: '90%',
              marginLeft: '5%',
              height: '30%',
              paddingLeft: '5%',
              marginTop: '10%',
              marginBottom: '5%',
            }}>
            <CustomInput
              containerStyle={{
                width: '90%',
                marginBottom: '5%',
              }}
              label="Email"
              rightIcon={{
                type: 'ionicon',
                name: 'md-person',
                size: 25,
                color: 'dimgray',
              }}
              placeholder="birisi@deneme.com"
              onChangeText={e => {
                this.setState({email: e});
              }}
            />
            <CustomInput
              secureTextEntry
              containerStyle={{
                width: '90%',
              }}
              placeholder="******"
              label="Şifre"
              rightIcon={{
                type: 'ionicon',
                name: 'ios-key',
                size: 25,
                color: 'dimgray',
              }}
              onChangeText={e => {
                this.setState({password: e});
              }}
            />
          </View>

          <Button
            buttonStyle={{backgroundColor: '#0f4c81'}}
            title="Giriş Yap"
            onPress={
              () => this.props.login(this.state.email, this.state.password)
              //Actions.firstLoginScreen()
            }
            containerStyle={{
              width: '70%',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Actions.registerScreen();
            }}
            style={{marginTop: '5%'}}>
            <Text
              style={{
                fontSize: fontSize(6),
                fontFamily: 'Avenir',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Kayıt Ol!
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {error} = state.auth;
  if (error) {
    Alert.alert(error.message ? error.message : 'Bir hata oluştu');
  }
  return {error};
};

export default connect(
  mapStateToProps,
  {login},
)(Login);
