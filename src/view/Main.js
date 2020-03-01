import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Header,
} from 'react-native';
import {WIDTH, HEIGHT} from '../common/constants';

export default class Main extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>
              Genişlik {WIDTH} , Yükseklik {HEIGHT}
            </Text>
            <Text style={styles.sectionDescription}>
              Bu template hızlı başlangıç için hazırlanmıştır. {'\n'}
              Redux, router, eslint gibi temel bileşenleri içermektedir.
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'gray',
  },
  body: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  sectionTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    margin: 40,
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});
