import React, {Component} from 'react';
import CustomInput from './common/CustomInput';
import {Image, SafeAreaView, View, KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {HEIGHT} from '../common/constants';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
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
              onChangeText={a => {
                console.log('sELAM');
              }}
            />
            <CustomInput
              containerStyle={{
                width: '90%',
              }}
              label="Şifre"
              rightIcon={{
                type: 'ionicon',
                name: 'ios-key',
                size: 25,
                color: 'dimgray',
              }}
              placeholder="birisi@deneme.com"
              onChangeText={a => {
                console.log('sELAM');
              }}
            />
          </View>

          <Button
            buttonStyle={{backgroundColor: '#0f4c81'}}
            title="Giriş Yap"
            onPress={() => Actions.tabRouter()}
            containerStyle={{
              width: '70%',
              alignSelf: 'center',
            }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
