import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';
import {hp, wp, fontSize} from '../../helper/sizeHelper';
import {COLORS} from '../../common/constants';
import {ButtonGroup, Icon, AirbnbRating} from 'react-native-elements';

export default class SurveyCard extends Component {
  render() {
    return (
      <Animated.View
        flex={1}
        style={{
          alignItems: 'center',
          width: wp(100),
        }}>
        <Animated.View
          style={[
            {
              marginTop: hp(5),
              width: wp(90),
              borderRadius: 25,
              height: hp(70),
              backgroundColor: 'white',
            },
            styles.shadowStyles,
          ]}>
          <Image
            style={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              width: '100%',
              height: '60%',
              resizeMode: 'cover',
            }}
            source={{
              uri: this.props.card.meal_image,
            }}
          />
          <View
            style={{
              height: '20%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: wp(10),
                fontFamily: 'Avenir',
                fontSize: fontSize(5),
                color: 'black',
              }}>
              {this.props.card.restaurant.restaurant_name}
            </Text>
            <Text
              style={{
                marginLeft: wp(10),
                fontFamily: 'Avenir',
                fontSize: fontSize(4),
                color: COLORS[4],
              }}>
              {this.props.card.meal_name}
            </Text>
          </View>
          <AirbnbRating
            reviews={['Berbat', 'Kötü', 'Eh', 'İyi', 'Çok İyi']}
            startingValue={1}
            defaultRating={0}
            ratingCount={5}
            imageSize={fontSize(5)}
            onFinishRating={rating =>
              this.props.onRate(rating, this.props.card.id)
            }
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = {
  shadowStyles: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 25,
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
