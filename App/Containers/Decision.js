import React from 'react'
import { View, ScrollView, Text, Image,StyleSheet,TextInput } from 'react-native'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import Loading from '../Components/Loading'
import Background from '../Components/Background'
import AutoWrite from '../Components/AutoWrite'
import { Sae,Kaede } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-root-toast';
import _ from 'lodash'

export default class AddDecision extends React.Component {
  unmounted = false
   static propTypes = {
     setDecisionList: React.PropTypes.func,
     decisions: React.PropTypes.arrayOf(React.PropTypes.object),
     decisionId: React.PropTypes.number,

   }

  constructor (props) {
    super(props)
    this.state = {
      decisionTitle : "",
      decisionDate: Moment(),
      decisionChoices: [""]
    };

    this.isEdit = (this.props.decisionId != null) ? true : false


  }

  saveDecision = () => {

    var choicesTmp = _.slice(this.state.decisionChoices, 0,this.state.decisionChoices.length - 1)

        if (this.isEdit == false){
          console.log("=> New Id ");

          var newDecisionTmp = {
            title: this.state.decisionTitle,
            deadline: this.state.decisionDate,
            choices: choicesTmp,
            criteriaLabels: [""],
            criteriaValues: [0],
            mark: [[]]
          }

          this.props.setDecisionsEdit(
          newDecisionTmp, null)

        } else {
          console.log("=> Id " + this.props.decisionId);

          var decisionTmp =  this.props.decisions[this.props.decisionId]
          decisionTmp.title = this.state.decisionTitle
          decisionTmp.deadline= this.state.decisionDate
          decisionTmp.choices = choicesTmp

          this.props.setDecisionsEdit(decisionTmp, this.props.decisionId)
        }


        console.log("=> Titre "+this.state.decisionTitle);
        console.log("=> Date "+this.state.decisionDate);
  }

  componentWillUnmount() {
    this.unmounted = true

    if ( this.state.decisionChoices.length >= 2 && this.state.decisionDate > Moment() && this.state.decisionTitle != "") {
      this.saveDecision()
    }
  }

  componentWillMount(){
    console.log("NEW DECISION");
  }

  renderandomQuestion (){

  }

  goNextAction () {

   NavigationActions.pop()

  }


  needHelp () {

    var msgAlert = null

    if (this.state.decisionDate <= Moment()) 
      msgAlert = "Merci de bien voulois selectionner une date pour continuer. 😉"

    if (this.state.decisionTitle == "") 
      msgAlert = "Donner un titre à la décision pour continuer. 😉"

    if (this.state.decisionChoices.length < 3)
      msgAlert = "On ne peut décidé que lorsqu'on a au minumun deux choix. 😉"

    if (this.state.decisionDate <= Moment() && this.state.decisionTitle == "") 
      msgAlert = "Pas de titre, ni de date, les bonnes décisions ne viendront pas tout seul. 😒"

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
    }
  }

  renderNextButton(){
    if (this.state.decisionDate <= Moment() || this.state.decisionTitle == "" || this.state.decisionChoices.length < 3) {
      return (
        <ActionButton
          icon={<Icon name="lightbulb-on-outline" size={Metrics.actionIconSize} color={Colors.highaccent} />}
          buttonColor={Colors.highdarkprimary}
          onPress={() => this.needHelp()}
        />
      )
    }
    else {
      return (<ActionButton
        icon={<Icon name={"checkbox-marked-circle-outline" }
        size={Metrics.actionIconSize} color={Colors.highaccent} />}
        buttonColor={Colors.highdarkprimary}
        onPress={ () => this.goNextAction()}
      />)
    }
  }

  addTextChoice(text, index){
    var choicesTmp = this.state.decisionChoices

    choicesTmp[index] = String.prototype.trim.call(text)

    if (choicesTmp.length == index + 1){
      this.setState({
        decisionChoices: choicesTmp.concat("")
      })
    }
    else {
      this.setState({
        decisionChoices: choicesTmp
      })
    }
  }

  renderListChoices(){

      return this.state.decisionChoices.map((cell, index)=> {
        return (  <Kaede
            key= {index}
            returnKeyType="done"
            autoCorrect={false}
            label={'Choix '+ (index + 1)}
            value={this.state.decisionChoices[index]}
            onChangeText={(text) => { this.addTextChoice(text,index)}}
            labelStyle={styles.decisionLabel}
            inputStyle={styles.decisionTextInput}
          />)
      })

  }

  render () {
    return (
    <View style={styles.mainContainer}>
      <Background />
      <ScrollView >
      <View style={{flex:1, marginBottom: 90 ,justifyContent:'space-around'}}>
      <View style={styles.decisionInputView}>
        <Kaede
          label={'Titre'}
          value={this.state.decisionTitle}
          autoCapitalize={'none'}
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={(text) => { this.setState({decisionTitle: String.prototype.trim.call(text)}) }}
          labelStyle={styles.decisionLabel}
          inputStyle={styles.decisionTextInput}
        />
      </View>

      <View style={styles.listChoiceView}>
        <Text
          style={styles.dateLabelText}>
          Liste des différents choix
        </Text>
        {this.renderListChoices()}
      </View>
      <View style={styles.dateInputView}>
        <Text
          style={styles.dateLabelText}>
          Date de décision
        </Text>
        <Calendar
        onChange={(date) => this.setState({decisionDate:date})}
        selected={this.state.decisionDate}
        minDate={Moment().add(1, 'day').startOf('day')}
        maxDate={Moment().add(2, 'years').startOf('day')}
        style={styles.calendarStyle}
        barView={{backgroundColor: Colors.darkprimary}}
        barText={[styles.calendarText,{color: Colors.actionButtonText}]}
        dayHeaderView={{backgroundColor: 'transparent'}}
        dayText={{color: Colors.highdarkprimary}}
        daySelectedText={{
          backgroundColor:Colors.darkaccent,
          color: Colors.highaccent,
          borderWidth: 0,
          borderRadius: 20
        }}
        monthText={styles.calendarText}
        dayHeaderText={styles.calendarText}
        />
      </View>


      </View>
      </ScrollView>
        {this.renderNextButton()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  /*
  <ModalDropdown
    style={styles.modalDropdown}
    options={['option 1', 'option 2']}/>
    modalDropdown:{
    alignItems: 'center'
  },*/
  decisionInputView:{
//  marginHorizontal: 10,
//  marginBottom: 15,
  },
  calendarText:{
    fontSize: Fonts.size.regular,
    color: Colors.highdarkprimary,
    fontFamily: 'Rubik-Regular',
  },
  calendarStyle:{
    borderWidth: 2,
    borderColor: Colors.darkprimary,
    borderRadius: 5,
    flex:1,
  },

  decisionTextInput:
  {
    color:Colors.darkaccent,
    fontFamily: 'Rubik-Regular',
    backgroundColor: Colors.highlightprimary
  },
  decisionLabel:{
  //  backgroundColor: 'transparent',
  //  color: Colors.darkprimary,
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    fontFamily: 'Rubik-Regular',
    color: Colors.actionButtonText,
    backgroundColor: Colors.darkprimary
  },
  dateLabelText:{
    margin: 10,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    color: Colors.darkprimary,
    fontFamily: 'Rubik-Regular',
  },
  dateInputView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listChoiceView:{

  }

});
