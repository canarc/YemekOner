import React, {Component, useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Icon, Avatar} from 'react-native-elements';
import Home from './Home';
import Menu from './Menu';
import {COLORS} from '../common/constants';
import LinearGradient from 'react-native-linear-gradient';
import {wp, fontSize, hp} from '../helper/sizeHelper';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Anasayfa'},
        {key: 'second', title: 'Menü'},
      ],
    };
  }

  setIndex = value => {
    this.setState({
      index: value,
    });
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={null}
      renderIcon={({route, focused, color}) => (
        <Icon
          name={route.key == 'first' ? 'ios-home' : 'ios-grid'}
          type="ionicon"
          color={color}
        />
      )}
      indicatorStyle={{backgroundColor: '#ED6663'}}
      style={{backgroundColor: '#5D5B6A'}}
    />
  );

  render() {
    const {index, routes} = this.state;

    return (
      <View flex={1}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLORS[2], COLORS[3]]}
          style={{
            paddingBottom: hp(1),
            paddingLeft: wp(3),
            backgroundColor: COLORS[2],
            height: hp(13),
            alignItems: 'flex-end',
            flexDirection: 'row',
            elevation: 14,
          }}>
          <Icon
            containerStyle={{marginBottom: hp(1)}}
            size={fontSize(10)}
            name="location-pin"
            type="simple-line-icon"
            color="white"
          />

          <Text
            style={{
              marginLeft: wp(3),
              marginBottom: hp(2),
              color: 'white',
              width: wp(65),
              fontFamily: 'Avenir',
              fontSize: fontSize(5),
            }}>
            Görükle
          </Text>

          <Avatar
            size={fontSize(15)}
            rounded
            title="YA"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
          />
        </LinearGradient>
        <SafeAreaView flex={1}>
          <TabView
            swipeEnabled={false}
            renderTabBar={this.renderTabBar}
            tabBarPosition="bottom"
            navigationState={{index, routes}}
            renderScene={SceneMap({
              first: Home,
              second: Menu,
            })}
            onIndexChange={this.setIndex.bind(this)}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
