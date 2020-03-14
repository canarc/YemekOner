import React, {Component} from 'react';
import {Text, View, SafeAreaView, Animated} from 'react-native';
import {fontSize, hp, wp} from '../helper/sizeHelper';
import {Actions} from 'react-native-router-flux';
import {Easing} from 'react-native-reanimated';
import {COLORS} from '../common/constants';
import SuggestCard from './common/SuggestCard';
import SurveyCard from './common/SurveyCard';
import Swiper from 'react-native-deck-swiper';

export default class FirstLogin extends Component {
  constructor() {
    super();
    this.state = {
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
              <Text
                style={{
                  marginTop: hp(10),
                  alignSelf: 'center',
                  color: 'white',
                  fontFamily: 'Avenir',
                  fontSize: fontSize(8),
                }}>
                Bunu beğendin mi?
              </Text>
              <Swiper
                containerStyle={{
                  marginTop: hp(10),
                  height: hp(80),
                  flex: 1,
                }}
                cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES']}
                renderCard={card => {
                  return <SurveyCard />;
                }}
                onSwiped={cardIndex => {
                  console.log(cardIndex);
                }}
                onSwipedAll={() => {
                  Animated.timing(this.state.surveyOpacity, {
                    toValue: 0,
                    duration: 1000,
                  }).start(() => {
                    this.setState({surveyFinished: true});
                    Animated.timing(this.state.loadingOpacity, {
                      toValue: 1,
                      duration: 1000,
                    }).start();
                    setTimeout(() => {
                      Actions.tabRouter();
                    }, 2000);
                  });
                }}
                cardIndex={0}
                backgroundColor="none"
                stackSeparation={2}
                stackSize={2}
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
