import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppStore
} from 'react-native';

import styles from './Styles/ComponentStyle'

export default class AutoWrite extends Component {
  _unmounted = false;
  constructor() {
    super();
    this.state = {
      render_text: '',
      state: [],
      timers: [],
      tick_timer: '',
      blink_timer: '',
      is_cursor_disp: true,
    }
    this.tick = this.tick.bind(this);
    this.blink = this.blink.bind(this);
    this.tickEnd = this.tickEnd.bind(this);
    this._setText= this._setText.bind(this);
  }

  componentWillMount() {

}

componentWillUnmount() {
this._unmounted = true
}

  componentDidMount() {
    var that = this;
    that.setState({
      text: that.props.text.split(''),
    });
  }
 componentWillReceiveProps(nextProps) {
    var that = this;
    if(nextProps.start) {
      clearInterval(this.state.blink_timer)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.is_ticking == false ? false :  true
  }

  componentDidUpdate(prevProps, prevState) {
    var that = this;
    if(this.props.start) {
      this.controller(prevProps, prevState)
    }
  }
  controller(prevProps, prevState) {
    if(
      (!this.props.back && this.state.text.length > 0) ||
      (this.props.back && this.state.render_text.length > 0) &&
      this.props.start) {
      this.tick()
      } else {
        this.tickEnd()
      }
  }
  tick() {
    var that = this;
     setTimeout(function(){
      that._setText()
      clearInterval(that.state.tick_timer)
    }, this.props.typeInterval);

  }
  _setText() {
    var that = this;
    var text = '';
    if (this.props.back) {
      that.state.text.unshift( that.state.render_text.substr( -1, 1 ) )
      text = that.state.render_text.substr( 0 , (that.state.render_text.length-1) )
    } else {
      text = that.state.render_text + that.state.text.shift()
    }

    if (that._unmounted == false)
    that.setState({
      render_text: text
    });
  }


  tickEnd() {
    clearInterval(this.state.blink_timer)

    if (this.props.onFinish) {
      this.props.onFinish()
    }
    if(this._unmounted == false)
      this.setState({is_ticking: false})

    if (this.state.is_ticking){
      this.blink
    }
  }


  blink() {
    var that = this;
    this.state.blink_timer = setInterval(function(){
        if(that._unmounted == false)
          that.setState({
            is_cursor_disp: !that.state.is_cursor_disp,
          });
    }, this.props.blinkInterval)
  }

  render() {
    var cursor =(
      <Text style={[
        styles.noteCursor,
        this.state.is_cursor_disp && styles.noteDisplay,
      ]}>|</Text>
    )
    return (
      <View>
        <Text style={[this.props.style]}>
          {this.state.render_text}
          {this.props.cursor  && cursor}
        </Text>
      </View>
    );
  }
}

AutoWrite.defaultProps = {
  text: '',
  typeInterval: 100,
  blinkInterval: 500,
  start: true,
  callbackDelay: 0,
  onFinish: false,
  cursor: true,
};
