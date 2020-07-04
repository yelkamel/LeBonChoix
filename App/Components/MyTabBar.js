import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'

import Background from './Background'

const MyTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 4 + (204 - 4) * progress;
    const green = 107 + (204 - 107) * progress;
    const blue = 151 + (204 - 151) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>

      {this.props.tabs.map((tab, i) => {
        var col = this.props.activeTab === i ? 'rgb(4,107,151)' : 'rgb(204,204,204)'
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={"numeric-"+(i+1)+"-box"}
            size={25}
            style={{marginTop:5}}
            color={col}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
        <Text style={{
            marginTop:5,
            color:col
          }}>
          {tab}
        </Text>
        </TouchableOpacity>
      ;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    backgroundColor:Colors.darkprimary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabs: {
    height: Metrics.navBarHeight,
    backgroundColor:'transparent',
    flexDirection: 'row',
    zIndex: 1,
  },
});

export default MyTabBar;
