import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';
import Moment from 'moment';


import { Colors, Fonts, Images, Metrics } from './../Themes'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reactionCount: 5
    }
  }
  renderChoice(arrayChoice){
    if (arrayChoice != null)
      return arrayChoice.map((cell,i) => {
        return (<View key={i}
          style={styles.decisionView}>
          <Text style={styles.decisionText}>
            {cell}
          </Text>
        </View>)
      })
  }

  renderCardContents(cell) {

    return (
      <View style={styles.globalDecisionView}>
        <View style={{
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={styles.decisionTitle}>
            {cell.title}
          </Text>
        </View>
        <View style={styles.choiceView}>
          {this.renderChoice(cell.choices)}
        </View>
        <View style={{
            justifyContent:'flex-end',
            alignItems:'flex-end'}}>
            <Text style={styles.decisionDeadline}>
              {cell.criteriaLabels}
            </Text>
            <Text style={styles.decisionDeadline}>
              {cell.criteriaValues}
            </Text>
          <Text style={styles.decisionDeadline}>
            {Moment(cell.deadline).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    )
  }

  render() {

      return (
        <View
          style={{
            width: Dimensions.get('window').width - 20,
            marginTop: 20,
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: Colors.darkaccent,
            overflow: 'hidden',
          }}
        >
          {this.renderCardContents(this.props.data)}
        </View>
      )
    }
}

const styles = StyleSheet.create({
  updateText: {
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
    margin: 20,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  reactionBox: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 40,
  },
  reactionEmoji: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 50,
    padding: 10,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 5,
      heigth: 5
    },
  },
  reactionCount: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 30,
    padding: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  // MY style
   globalDecisionView: {
    flexDirection: 'column',
    padding: 5,
    justifyContent:'center',
    borderRadius: 10,
    margin: 20,
    backgroundColor: Colors.darkprimary,
  },
  decisionTitle:{
    margin: Metrics.tallMargin,
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily:'Rubik-Bold'
  },
  decisionDeadline:{
    margin: Metrics.baseMargin,
    fontSize: Fonts.size.small,
    color: Colors.text,
    fontFamily:'Rubik-Bold'

  },
  decisionText:{
    margin: Metrics.baseMargin,
    fontSize: Fonts.size.regular,
    color: Colors.text,
  },
  choiceView:{
    justifyContent:'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',

  },
  decisionView :{
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    borderColor: Colors.darkaccent,
    backgroundColor: Colors.darkaccent,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = Card;
