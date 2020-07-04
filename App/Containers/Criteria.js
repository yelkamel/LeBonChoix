import React from 'react'
import { View, ScrollView, Text, Image,StyleSheet,TextInput } from 'react-native'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import Loading from '../Components/Loading'
import Background from '../Components/Background'
import AutoWrite from '../Components/AutoWrite'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-root-toast';
import _ from 'lodash'
import EmojiRating from '../Components/EmojiRating'
import { Hoshi,Sae,Kaede } from 'react-native-textinput-effects';
import {ponderationCriteriaToText} from './FunctionUtils'


const NEW_CRITERIA ='+ Ajouter un Critère '
const CRITERIA = "Critère "

export default class Criteria extends React.Component {
  unmounted = false
   static propTypes = {
     setDecisionList: React.PropTypes.func,
     decisions: React.PropTypes.arrayOf(React.PropTypes.object),
     decisionId: React.PropTypes.number,
   }

  constructor (props) {
    super(props)

    var i = this.props.decisionId

    var isNewCriteria = (i != null && this.props.decisions[i].criteriaLabels.length > 1) ? false : true

     this.state = {
      criteriaLabels: isNewCriteria ? [""] : this.props.decisions[i].criteriaLabels.concat(""),
      criteriaValues: isNewCriteria ? [null] : this.props.decisions[i].criteriaValues.concat(0),
    };


  }

  componentWillUnmount() {
    this.unmounted = true
  }

  componentWillMount(){
    console.log("CRITERIA");
  }

  renderandomQuestion (){

  }

  addCriteriaText(text, index){
    var criteriaTmp = this.state.criteriaLabels

    criteriaTmp[index] = String.prototype.trim.call(text)

    if (criteriaTmp.length == index + 1){
      this.setState({
        criteriaLabels: criteriaTmp.concat(""),
        criteriaValues: this.state.criteriaValues.concat(null)
      })
    }
    else {
      this.setState({
        criteriaLabels: criteriaTmp
      })
    }
  }

  saveCriteria = () => {
    console.log("=> Add Criteria ");

    var decisionId = this.props.decisionId

    if (this.props.decisionId  == null) {
      decisionId = this.props.decisions.length - 1
    }
    decisionUpdate =  this.props.decisions[decisionId]

    console.log("DecisionID: " +decisionId );
    console.log("Decision:" + decisionUpdate.criteriaLabels);



    decisionUpdate.criteriaLabels = _.slice(this.state.criteriaLabels, 0,this.state.criteriaLabels.length - 1)
    decisionUpdate.criteriaValues = _.slice(this.state.criteriaValues, 0,this.state.criteriaValues.length - 1)

    this.props.setDecisionsEdit(
    decisionUpdate, decisionId)

    console.log("=> criteriaLabels "+decisionUpdate.criteriaLabels );
    console.log("=> critereValues "+decisionUpdate.criteriaValues);
  }

  addCriteriaValue(value, index){
    var criteriaTmp = this.state.criteriaValues
    criteriaTmp[index] =  value

    this.setState({
      criteriaValues: criteriaTmp
    })
  }

  componentWillUnmount() {
    this.unmounted = true

    if (this.state.criteriaLabels.length >= 2) {
      this.saveCriteria()
    }
  }

  buttonHelp () {

    var msgAlert = null

    if (this.state.criteriaLabels.length < 2) 
      msgAlert = "Trouver un maximun de crière (la santé, le temps, l'argent, le plaisir) ? 😉"

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

  renderCriteriaInput(){

    return this.state.criteriaLabels.map((cell, index)=> {
      var val = this.state.criteriaValues[index]


      if (this.state.criteriaLabels[index].length >= 2){
        return (<View
        key= {index}
        style={styles.criteriaView}>
        <View style={{width:Metrics.screenWidth * 0.5}}>
          <Kaede
            label={''}
            returnKeyType="done"
            autoCorrect={false}
            value={cell}
            onChangeText={(text) => { this.addCriteriaText(text,index)}}
            borderColor={'#b76c94'}
            backgroundColor={'#F9F7F6'}
            labelStyle={[styles.criteriaLabelWrite]}
            inputStyle={styles.inputCriteriaWrite}
          />
        </View>

          <EmojiRating
            hasText={true}
            value={val == null ? 1 : val}
            onChange={(value) => this.addCriteriaValue(value, index)}/>
      </View>)
      }

      return (<View
      key= {index}
      style={styles.criteriaView}>
      <View style={{width:Metrics.screenWidth }}>
        <Kaede
          returnKeyType="done"
          autoCorrect={false}
          label={CRITERIA}
          value={this.state.criteriaLabels[index]}
          onChangeText={(text) => { this.addCriteriaText(text,index)}}
          borderColor={'#b76c94'}
          backgroundColor={'#F9F7F6'}
          labelStyle={styles.criteriaLabel}
          inputStyle={styles.inputCriteria}
        />
      </View>
    </View>)
    })
  }


    renderNextButton(){
      if (this.state.criteriaLabels.length < 2) {
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

  render () {
    return (
    <View style={styles.mainContainer}>
      <Background />
        {this.renderCriteriaInput()}
        {this.renderNextButton()}
      </View>
    )
  }
}

/*
<ScrollView>
<View style={{flex:1,justifyContent:'space-around'}}>
  <Sae
    label={'Liste des différents choix de la decision'}
    value={this.state.decisionTitle}
    iconClass={FontAwesomeIcon}
    iconName={'pencil-square'}
    iconColor={Colors.highdarkprimary}
    autoCapitalize={'none'}
    autoCorrect={false}
    onChangeText={(text) => { this.setState({decisionTitle: text}) }}
    labelStyle={styles.decisionLabel}
    inputStyle={styles.inputTextStyle}
  />
</View>
</ScrollView>
 */

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  criteriaView:{
    flexDirection: 'row',
    marginVertical: 10,
  },

  inputCriteria:
  {
    color:Colors.darkaccent,
    fontFamily: 'Rubik-Regular',
    backgroundColor: Colors.highlightprimary
  },
  criteriaLabelWrite:{
    width: 20,
    backgroundColor: 'transparent'
  },
  inputCriteriaWrite:{
    color:Colors.darkaccent,
    fontFamily: 'Rubik-Regular',
    backgroundColor: Colors.highlightprimary,
    width: Metrics.screenWidth * 0.5
  },
  pourderationTextStyle:{
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    fontFamily: 'Rubik-Regular',
    color: Colors.text,
    marginRight:5
  },
  criteriaLabel:{
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    fontFamily: 'Rubik-Regular',
    color: Colors.actionButtonText,
    backgroundColor: Colors.darkprimary,
    marginTop:20
  },
});
