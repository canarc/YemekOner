import React, {Component} from 'react';
import {View, Image, Text, Animated, Button} from 'react-native';
import {hp, wp, fontSize} from '../../helper/sizeHelper';
import {COLORS} from '../../common/constants';
import {ButtonGroup, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SurveyCard extends Component {
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
    return (
      <Animated.View flex={1} style={{alignItems: 'center'}}>
        <Animated.View
          style={[
            {
              marginTop: hp(5),
              borderRadius: 10,
              width: wp(90),
              height: hp(50),
              backgroundColor: 'white',
            },
            styles.shadowStyles,
          ]}>
          <Image
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              width: '100%',
              height: '70%',
              resizeMode: 'cover',
            }}
            source={{
              uri:
                'http://www.isosdoner.com/wp-content/uploads/2017/09/fuze-tavuk-durum.jpg',
            }}
          />
          <Text
            style={{
              marginTop: wp(2),
              marginLeft: wp(5),
              fontFamily: 'Avenir',
              fontSize: fontSize(5),
              color: 'black',
            }}>
            İsos Döner
          </Text>
          <Text
            style={{
              marginLeft: wp(5),
              fontFamily: 'Avenir',
              fontSize: fontSize(4),
              color: COLORS[4],
            }}>
            Füze Tavuk Dürüm
          </Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = {
  shadowStyles: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  circleButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: wp(1),
    width: wp(20),
    height: wp(20),
    borderRadius: wp(12.5),
  },
};
