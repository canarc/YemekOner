import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Input} from 'react-native-elements';

export default class CustomInput extends Component {
  render() {
    return (
      <SafeAreaView>
        <Input
          label={this.props.label ? this.props.label : 'label'}
          labelStyle={
            this.props.labelstyle
              ? this.props.labelstyle
              : {fontSize: 20, color: 'dimgray'}
          }
          inputStyle={
            this.props.inputstyle
              ? this.props.inputStyle
              : {marginLeft: 10, fontSize: 15}
          }
          placeholder={
            this.props.placeholder ? this.props.placeholder : 'placeholder'
          }
          {...this.props}
        />
      </SafeAreaView>
    );
  }
}
