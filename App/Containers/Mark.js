import React from 'react'
import { View, ScrollView, Text, Image,StyleSheet,TextInput,Platform } from 'react-native'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import Loading from '../Components/Loading'
import Background from '../Components/Background'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Moment from 'moment';
import Toast from 'react-native-root-toast';
import _ from 'lodash'
import EmojiRating from '../Components/EmojiRating'
import {ponderationCriteriaToText} from './FunctionUtils'
import StarRating from 'react-native-star-rating';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import MyTabBar from '../Components/MyTabBar'



export default class Criteria extends React.Component {
  unmounted = false
   static propTypes = {
     setDecisionList: React.PropTypes.func,
     decisions: React.PropTypes.arrayOf(React.PropTypes.object),
     decisionId: React.PropTypes.number,
   }

  constructor (props) {
    super(props)

     this.state = {
       mark: [[]],
       starCount: 0,
       isLoading: true
    };
    this.nbChoice = this.props.decisions[this.props.decisionId].choices.length
    this.nbCriteria = this.props.decisions[this.props.decisionId].criteriaLabels.length
    this.hasComplete = false
  }


  saveCriteria = () => {
    console.log("=> Mark Criteria ");

    var decisionId = this.props.decisionId
    decisionUpdate =  this.props.decisions[decisionId]

    console.log("DecisionID: " +decisionId );

    decisionUpdate.mark  = this.state.mark

    this.props.setDecisionsEdit(
    decisionUpdate, decisionId)
    console.log("Mark:" + decisionUpdate.mark);

  }

  componentWillUnmount() {
    this.unmounted = true

   if (this.hasComplete) {
      this.saveCriteria()
    }
  }

  buttonHelp () {

    var msgAlert = null


    this.state.mark.map((cell, index) => {
      if (_.includes(this.state.mark[index], null))
        msgAlert = "Presque fini ! Veuillez noter tous les critere 😙"
    })

    if (msgAlert != null) {
      Toast.show(msgAlert, {
          duration: Toast.durations.SHORT, // 2000
          position: Toast.positions.TOP,
          shadowColor: Colors.highdarkprimary,
          backgroundColor: Colors.darkaccent,
          textColor: Colors.highaccent,
          shadow: true,
          animation: true,
          opacity: 1,
          hideOnPress: true,
          delay: 0,
        })
        return;
    }
  }

    renderNextButton(){

      this.hasComplete = true
      this.state.mark.map((cell, index) => {
        if (_.includes(this.state.mark[index], null))
          this.hasComplete = false
      })

      if (!this.hasComplete) {
        return (
          <ActionButton
            icon={<Icon name="lightbulb-on-outline" size={Metrics.actionIconSize} color={Colors.highaccent} />}
            buttonColor={Colors.highdarkprimary}
            onPress={() => this.buttonHelp()}
          />
        )
      }
      else {
        return (<ActionButton
          icon={<Icon name={"checkbox-marked-circle-outline" } size={Metrics.actionIconSize} color={Colors.highaccent} />}
          buttonColor={Colors.highdarkprimary}
          onPress={ NavigationActions.pop}
        />)
      }
    }

  componentWillMount(){
    console.log("MARK");

    var markTmp = this.props.decisions[this.props.decisionId].mark

    if (markTmp.length < 2) {
       markTmp = new Array(this.nbChoice).fill(null).map(()=>new Array(this.nbCriteria).fill(null));
    }

    this.setState({
      mark: markTmp,
      isLoading: false
    })
  }

  onStarRatingPress = (rating, choiceIndex,index) => {
   var markTmp = this.state.mark

    markTmp[choiceIndex][index] = rating

    this.setState({
      mark : markTmp
    })
  }

renderMarkCriteria(choiceIndex){

  return this.props.decisions[this.props.decisionId].criteriaLabels.map((cell, index) => {
    return  (
      <View style={styles.MarkCriteriaView}>
        <Text style={styles.CriteriaText}> {cell}
        </Text>
      <StarRating
          key={index}
          disabled={false}
          maxStars={5}
          emptyStarColor={Colors.highdarkprimary}
          starColor={Colors.accent}
          rating={this.state.mark[choiceIndex][index]}
          selectedStar={(rating) => this.onStarRatingPress(rating, choiceIndex,index)}
          />
      </View>)
  })
}

renderTabChoices(){
  return this.props.decisions[this.props.decisionId].choices.map((cell, index)=>{
    return (
      <View key={"choice" + index}
         style={styles.markChoiceView}
         tabLabel={cell}>

         {this.renderMarkCriteria(index)}

      </View>
    )
  })
}
  render () {

    if (this.state.isLoading){
      return (
      <View>
      </View>)
    }
    return (
    <View style={styles.mainContainer}>
      <Background />
        <ScrollableTabView
        initialPage={0}
        style={{
          backgroundColor: 'transparent'
        }}
        locked={true}
        renderTabBar={() => <MyTabBar />}
        onChangeTab={this.onChangeTab}
        >
          {this.renderTabChoices()}
        </ScrollableTabView>

        {this.renderNextButton()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  markChoiceView:{
    flex:1,
    padding: 10,
  },
  MarkCriteriaView:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  CriteriaText:{
    fontWeight: 'bold',
    fontSize: Fonts.size.regular,
    fontFamily: 'Rubik-Regular',
    color: Colors.darkprimary,
    margin: 10,
}
});
