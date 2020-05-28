import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {fontSize, hp, wp} from '../helper/sizeHelper';
import {Actions} from 'react-native-router-flux';
import {Easing} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {COLORS} from '../common/constants';
import SuggestCard from './common/SuggestCard';
import SurveyCard from './common/SurveyCard';
import Swiper from 'react-native-deck-swiper';
import {AxiosPost} from '../helper/AxiosHelper';
import Axios from 'axios';

class FirstLogin extends Component {
  constructor() {
    super();
    this.state = {
      ratings: {},
      Text1opacity: new Animated.Value(0),
      Text2opacity: new Animated.Value(0),
      surveyOpacity: new Animated.Value(0),
      loadingOpacity: new Animated.Value(0),
      animatedBackgroundColor: new Animated.Value(0),
    };
  }

  textShowAnimation(value1, value2) {
    Animated.timing(value1, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      Animated.timing(value2, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        Animated.parallel([
          Animated.timing(value2, {
            toValue: 0,
            duration: 2000,
          }),
          Animated.timing(value1, {
            toValue: 0,
            duration: 2000,
          }),
        ]).start(() => {
          this.setState({textAnimationFinished: true}),
            Animated.timing(this.state.surveyOpacity, {
              toValue: 1,
              duration: 1000,
            }).start();
        });
      });
    });
  }

  backgroundColorAnimationForward() {
    Animated.timing(this.state.animatedBackgroundColor, {
      toValue: 150,
      duration: 20000,
    }).start(() => {
      this.backgroundColorAnimationBackward();
    });
  }

  backgroundColorAnimationBackward() {
    Animated.timing(this.state.animatedBackgroundColor, {
      toValue: 0,
      duration: 20000,
    }).start(() => {
      this.backgroundColorAnimationForward();
    });
  }

  componentDidMount() {
    const {Text1opacity, Text2opacity, animatedBackgroundColor} = this.state;
    this.backgroundColorAnimationForward();
    this.textShowAnimation(this.state.Text1opacity, Text2opacity);
  }

  saveRatings() {
    const token = this.props.user.data.token;
    const ratings = this.state.ratings;

    /* Axios.post(
      'http://35.228.102.158:3000/api/v1/recommend/save',
      {rates: ratings},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
*/
    AxiosPost('recommend/save', {rates: ratings}, token)
      .then(res => {
        if (res.data.code == 200) {
          Actions.tabRouter();
        } else {
          Alert.alert('Bir hata oluştu.');
        }
      })
      .catch(err => {
        Alert.alert('Bir hata oluştu.');
      });
  }

  onRate = (rating, id) => {
    let ratings = this.state.ratings;
    ratings[id] = rating;
    this.setState({ratings: ratings});
  };

  render() {
    InterpolateColor = this.state.animatedBackgroundColor.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: [COLORS[2], COLORS[3], COLORS[5], COLORS[6]],
    });

    return (
      <Animated.View flex={1} style={{backgroundColor: InterpolateColor}}>
        {this.state.textAnimationFinished ? (
          this.state.surveyFinished ? (
            <Animated.View style={{opacity: this.state.loadingOpacity}}>
              <Text
                style={{
                  marginTop: hp(50),
                  transform: [{translateY: -50}],
                  alignSelf: 'center',
                  color: 'white',
                  fontFamily: 'Avenir',
                  fontSize: fontSize(7),
                }}>
                Önerileriniz kişiselleştiriliyor
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              flex={1}
              style={{
                opacity: this.state.surveyOpacity,
              }}>
              {this.props.user.data.suggest_meals.length ==
              Object.keys(this.state.ratings).length ? (
                <TouchableOpacity onPress={this.saveRatings.bind(this)}>
                  <Text
                    style={{
                      marginTop: hp(10),
                      alignSelf: 'center',
                      color: 'white',
                      fontFamily: 'Avenir',
                      fontSize: fontSize(8),
                    }}>
                    Tamamlamak için tıkla
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text
                  style={{
                    marginTop: hp(10),
                    alignSelf: 'center',
                    color: 'white',
                    fontFamily: 'Avenir',
                    fontSize: fontSize(8),
                  }}>
                  Bunları beğendin mi?
                </Text>
              )}
              <FlatList
                pagingEnabled={true}
                style={{
                  height: hp(80),
                }}
                data={this.props.user.data.suggest_meals}
                renderItem={({item, index, separators}) => {
                  return (
                    <SurveyCard id={item.id} card={item} onRate={this.onRate} />
                  );
                }}
                horizontal
              />
            </Animated.View>
          )
        ) : (
          <>
            <Animated.Text
              style={{
                marginTop: hp(20),
                alignSelf: 'center',
                color: 'white',
                fontSize: fontSize(15),
                opacity: this.state.Text1opacity,
              }}>
              Merhaba
            </Animated.Text>
            <Animated.Text
              style={{
                marginTop: hp(40),
                alignSelf: 'center',
                color: 'white',
                fontSize: fontSize(7),
                opacity: this.state.Text2opacity,
              }}>
              Birkaç sorumuz var
            </Animated.Text>
          </>
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};

export default connect(
  mapStateToProps,
  {},
)(FirstLogin);
