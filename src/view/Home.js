import React, {Component} from 'react';
import {View, ScrollView, Text, FlatList, LayoutAnimation} from 'react-native';
import {WIDTH, HEIGHT, COLORS} from '../common/constants';
import {fontSize, hp, wp} from '../helper/sizeHelper';
import {Avatar, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SuggestCard from './common/SuggestCard';
export default class Home extends Component {
  state = {
    advices: [
      {
        name: 'İsos Döner',
        image:
          'http://www.isosdoner.com/wp-content/uploads/2017/09/fuze-tavuk-durum.jpg',
        id: '1234',
        meal: 'Füze Tavuk Dürüm',
      },
      {
        name: 'İsos Döner',
        image:
          'http://www.isosdoner.com/wp-content/uploads/2017/09/tavuk-durum.jpg',
        id: '2345',
        meal: 'Tavuk Dürüm',
      },
      {
        name: 'İsos Döner',
        image:
          'https://scontent.fist4-1.fna.fbcdn.net/v/t31.0-8/26910796_1491244994317535_6332292857536248395_o.jpg?_nc_cat=100&_nc_sid=8024bb&_nc_ohc=iW8HkOdMYKYAX_UN1j3&_nc_ht=scontent.fist4-1.fna&oh=58b795628a1daf9c3a7273f660d3d19f&oe=5E965DE9',
        id: '3456',
        meal: 'Künefe',
      },
    ],
  };

  setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
  };

  removeSuggest = index => {
    this.setAnimation();
    this.setState({
      advices: this.state.advices.filter((_, i) => i !== index),
    });
  };

  render() {
    return (
      <ScrollView flex={1}>
        <Text
          style={{
            marginTop: wp(5),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(4),
            color: COLORS[4],
          }}>
          Bunları beğeneceğini düşünüyoruz..
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.state.advices}
          style={{
            width: '100%',
            height: hp(30),
          }}
          renderItem={e => (
            <SuggestCard data={e} removeSelf={this.removeSuggest.bind(this)} />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    );
  }
}
