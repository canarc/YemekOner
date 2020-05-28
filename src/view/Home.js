import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {WIDTH, HEIGHT, COLORS} from '../common/constants';
import {fontSize, hp, wp} from '../helper/sizeHelper';
import {Avatar, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SuggestCard from './common/SuggestCard';
import {AxiosGet, AxiosPost} from '../helper/AxiosHelper';
import {connect} from 'react-redux';
import Axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {getData, storeData} from '../helper/AsyncStorageHelper';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
  state = {
    advices: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        restaurant: {restaurant_name: 'Yükleniyor.'},
        meal_name: 'Lütfen bekleyin.',
        meal_image:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEhUPDQ8PDw8PEhUPDw8PDw8NDw8PFRIWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKy0rKysrKysrKysrKysrLSsrLSsrKysrLS03LSsrKysrKysrKysrKy0rKys3KysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAGBABAQEBAQAAAAAAAAAAAAAAAAERQfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDo+rGVgy0IAAAqCAqoAKgCiAKIAtKigCAKIAqoAogCjKgCAMrBQASgKgCoAAAKIoIqAKIoAAAAAAAAAACoAgAKAAlVAAAAAAAAAAIAqKABQAAAAAAAAAAQAFAARUAAAClAAAAAIACooAAFClACgFCgAAAAIKAAAIqAAAUpSgUKQAAAABUWgAABQAAChQAAChQDQABUBAAEFApQoAJAUAAABUUAAAACggLQABFgFCgAgK0i1BBFQEWIsAEKCpBYAAKKgIsAFABAAChQAAAgAUAEABqoqUURUERUUURUEABVEUQgQgCpFAAFAKIUKAFAEVCAtEoCCgNVFQCstVkUAEVAgAAoogLAhAFRRAAUAAAEKAKhAgFAAABpFQBlalEFQFIAAACoAiwICioogCAokUEABQBUIEACgAAjSKlFSpVqAQSKAFAFQBUARQgAAKACKIoqACAAoQhBChUoqgA0lVKCVKtQEWgBQoABQApAUICAAAEFIqAAAAABAEKlUFNAEaSrUoqVlqsgoAFDoAABSFAItRaAAIAQCKgKAAUoAACFBBT3AAbRalBlFAAAAgAACVUAUAFBAURRBUBQAQAFCAIIqCgAN1KAM0QBSABAACACAAoAhFQFKoAqQBAAUogIoACAKAA//9k=',
      },
    ],
    restaurants: [],
  };

  setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
  };

  removeSuggest = async (index, id) => {
    this.setAnimation();
    full_advices = this.state.full_advices.filter(function(obj) {
      return obj.id !== id;
    });
    let rated_advices = [];

    try {
      rated_advices = JSON.parse(await getData('rated_advices'));
    } catch (err) {
      console.log(err);
    }

    rated_advices.push(id);
    storeData('rated_advices', JSON.stringify(rated_advices));

    this.setState({full_advices, advices: full_advices.slice(0, 5)});
  };

  Item = ({title, image, id, distance}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Actions.menu({restaurant_id: id});
        }}>
        <Text
          style={{
            width: wp(45),
            marginTop: wp(5),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontWeight: '600',
            fontSize: fontSize(6),
            color: 'rgb(30, 30, 30)',
          }}>
          {title}
        </Text>
        <Text
          style={{
            marginTop: wp(5),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontWeight: '600',
            fontSize: fontSize(6),
            color: 'rgb(30, 30, 30)',
          }}>
          {distance}
        </Text>
        <Image
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="cover"
          source={{
            uri: image,
          }}
          style={{
            width: wp(20),
            height: '100%',
          }}
        />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    AxiosGet('restaurant', this.props.user.data.token).then(res => {
      this.setState({restaurants: res.data.data});
    });

    Axios.post(
      'http://35.228.102.158:3000/api/v1/recommend/',
      {user_id: this.props.user.data.row_guid},
      {
        headers: {
          Authorization: 'Bearer ' + this.props.user.data.token,
        },
      },
    )
      .then(res => {
        getData('rated_advices').then(rated_advices => {
          if (!rated_advices) {
            rated_advices = [];
          }

          let advices = res.data.data.filter(data => {
            return !rated_advices.includes(data.id);
          });

          this.setState({
            full_advices: advices,
            advices: advices.slice(0, 5),
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: 'rgb(240,240,240)',
                width: wp(100),
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginTop: wp(5),
                  marginLeft: wp(5),
                  fontFamily: 'Avenir',
                  fontSize: fontSize(4),
                  color: COLORS[4],
                }}>
                Yeni öneriler için daha sonra tekrar dene
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.state.advices}
          style={{
            width: '100%',
            height: hp(25),
          }}
          renderItem={e => (
            <SuggestCard data={e} removeSelf={this.removeSuggest.bind(this)} />
          )}
          keyExtractor={item => item.id}
        />
        <Text
          style={{
            marginBottom: wp(2),
            marginLeft: wp(5),
            fontFamily: 'Avenir',
            fontSize: fontSize(4),
            color: COLORS[4],
          }}>
          Sipariş verebileceğin restorantlar
        </Text>
        <FlatList
          data={this.state.restaurants}
          renderItem={({item}) =>
            this.Item({
              id: item.id,
              distance: item.restaurant_distance,
              title: item.restaurant_name,
              image: item.restaurant_image,
            })
          }
          keyExtractor={item => item.id}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: hp(7),
    backgroundColor: 'rgb(240,240,240)',
    marginVertical: 2,
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};

export default connect(
  mapStateToProps,
  {},
)(Home);
