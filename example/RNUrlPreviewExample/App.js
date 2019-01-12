import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RNUrlPreview from 'react-native-url-preview';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNUrlPreview text={'https://www.youtube.com/watch?v=Kmiw4FYTg2U'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
