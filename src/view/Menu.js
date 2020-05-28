import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  AsyncStorage,
  FlatList,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {fontSize, hp, wp} from '../helper/sizeHelper';
import {COLORS} from '../common/constants';
import {AxiosPost, AxiosGet} from '../helper/AxiosHelper';
import {connect} from 'react-redux';
import Axios from 'axios';

class Menu extends Component {
  state = {};

  onSuccess = e => {
    if (String(e.data).endsWith('my') || String(e.data).startsWith('my')) {
      AxiosGet('restaurant/' + e.data[2], this.props.user.data.token).then(
        res => {
          console.log(res.data.data[0]);
          this.setState({
            menu: res.data.data[0].meals,
            restaurant_name: res.data.data[0].restaurant_name,
            restaurant_image: res.data.data[0].restaurant_image,
          });
        },
      );
    }
  };

  componentDidMount() {
    if (this.props.restaurant_id) {
      AxiosGet(
        'restaurant/' + this.props.restaurant_id,
        this.props.user.data.token,
      ).then(res => {
        console.log(res.data.data[0]);
        this.setState({
          menu: res.data.data[0].meals,
          restaurant_name: res.data.data[0].restaurant_name,
          restaurant_image: res.data.data[0].restaurant_image,
        });
      });
    }
  }

  Item = ({title, image}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Image
          resizeMode="cover"
          source={{
            uri: image,
          }}
          style={{
            width: hp(6),
            height: hp(6),
          }}
        />
        <Text
          style={{
            marginLeft: '5%',
            fontFamily: 'Avenir',
            fontWeight: '600',
            fontSize: fontSize(6),
            color: 'rgb(30, 30, 30)',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return this.state.menu ? (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: hp(15),
            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="cover"
            source={{
              uri: this.state.restaurant_image,
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '600',
              fontSize: fontSize(8),
              color: 'white',
              marginHorizontal: '5%',
            }}>
            {this.state.restaurant_name}
          </Text>
          <Text
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              padding: 2,
              fontFamily: 'Avenir',
              fontWeight: '600',
              marginHorizontal: '5%',
              fontSize: fontSize(12),
              color: 'white',
            }}>
            4/5
          </Text>
        </View>
        <FlatList
          style={{marginTop: hp(1)}}
          data={this.state.menu}
          renderItem={({item}) =>
            this.Item({
              title: item.meal_name,
              image: item.meal_image,
            })
          }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    ) : (
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={3000}
        style={{height: '100%'}}
        fadeIn={false}
        cameraProps={{ratio: '1:1'}}
        onRead={this.onSuccess}
        //flashMode={QRCodeScanner.Constants.FlashMode.torch}      .

        bottomContent={
          <Text
            style={{
              fontSize: fontSize(5.5),
              fontFamily: 'Avenir',
              fontWeight: 'bold',
              color: '#005293',
            }}>
            Lütfen masanızdaki kodu okutun.
          </Text>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    width: '90%',
    height: hp(7),
    backgroundColor: 'rgb(250,250,250)',
    marginVertical: 2,
  },
  title: {
    marginLeft: '5%',
    fontSize: fontSize(5),
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};

export default connect(
  mapStateToProps,
  {},
)(Menu);
