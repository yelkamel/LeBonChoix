
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, Metrics } from './../Themes'

// const {height, width} = Dimensions.get('window');

const STATUSBAR_HEIGHT = (Platform.OS === 'ios') ? 20 : 5
class Background extends Component {

  static defaultProps = {
    zIndex: 0
  }

  state = {
  }

  componentDidMount = () => {
  }


  render () {
    return(
      <View
        style={styles.secondback}>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  secondback: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.highlightprimary,
}
});


export default Background
