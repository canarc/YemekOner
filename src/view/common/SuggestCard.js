import React, {Component} from 'react';
import {View, Image, Text, Animated, ImageBackground} from 'react-native';
import {hp, wp, fontSize} from '../../helper/sizeHelper';
import {COLORS} from '../../common/constants';
import {Button, Icon} from 'react-native-elements';

export default class SuggestCard extends Component {
  likeIcon = () => (
    <Icon
      size={fontSize(6)}
      color="#305644"
      name="thumbs-up"
      type="font-awesome"
    />
  );
  dislikeIcon = () => (
    <Icon
      size={fontSize(8)}
      color="#A64444"
      name="thumbs-down"
      type="font-awesome"
    />
  );

  updateIndex = index => {
    if (index == 0) {
      console.log('Axios.like');
    } else {
      console.log('Axios.dislike');
    }
    this.props.removeSelf(this.props.data.index, this.props.data.item.id);
  };

  render() {
    return (
      <Animated.View
        style={[
          {
            borderRadius: 5,
            width: hp(35),
            height: hp(23),
            marginTop: hp(1),
            marginRight: wp(2.5),
            marginLeft: wp(2.5),
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          },
          this.props.style,
        ]}>
        <View style={{width: '100%', height: '70%'}}>
          <Image
            style={{
              position: 'absolute',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={{uri: this.props.data.item.meal_image}}
          />
          <Button
            onPress={this.updateIndex}
            icon={this.dislikeIcon}
            type="clear"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 50,
              height: 50,
            }}
          />
        </View>

        <Text
          style={{
            marginTop: wp(2),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(5),
            color: 'black',
          }}>
          {this.props.data.item.restaurant.restaurant_name}
        </Text>
        <Text
          style={{
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(4),
            color: COLORS[4],
          }}>
          {this.props.data.item.meal_name}
        </Text>
      </Animated.View>
    );
  }
}
