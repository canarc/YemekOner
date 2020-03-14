import React, {Component} from 'react';
import {View, Image, Text, Animated} from 'react-native';
import {hp, wp, fontSize} from '../../helper/sizeHelper';
import {COLORS} from '../../common/constants';
import {ButtonGroup, Icon} from 'react-native-elements';

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
      size={fontSize(6)}
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
    this.props.removeSelf(this.props.data.index);
  };

  render() {
    console.log(this.props.data.index);
    return (
      <Animated.View
        style={
          ({
            borderRadius: 5,
            width: hp(35),
            height: hp(28),
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
          this.props.style)
        }>
        <Image
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
          }}
          source={{uri: this.props.data.item.image}}
        />
        <Text
          style={{
            marginTop: wp(2),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(5),
            color: 'black',
          }}>
          {this.props.data.item.name}
        </Text>
        <Text
          style={{
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(4),
            color: COLORS[4],
          }}>
          {this.props.data.item.meal}
        </Text>
        <ButtonGroup
          onPress={this.updateIndex}
          buttons={[{element: this.likeIcon}, {element: this.dislikeIcon}]}
          containerStyle={{height: '20%'}}
        />
      </Animated.View>
    );
  }
}
