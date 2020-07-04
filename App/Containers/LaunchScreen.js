import React from 'react'
import { ScrollView, Text, Image, View,StyleSheet,TouchableHighlight } from 'react-native'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import Loading from '../Components/Loading'
import Background from '../Components/Background'
import store from 'react-native-simple-store';
import ActionButton from 'react-native-action-button';
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Moment from 'moment';
import PaperEffect from '../Components/PaperEffect'
import _ from 'lodash'
import * as Animatable from 'react-native-animatable';

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      nbResultat: 0,
      decisions: [
      {
        title: "Quel Entreprise choisir ?",
        critere: ['court', 'temps', 'social'],
        deadline: Moment().valueOf(),
        choices : ['VOR', 'TOM', 'BIM'],
        criteriaLabels: [""],
        criteriaValues: [0],
        mark: [[]]
      }
      ]
    }
  }

  componentWillMount() {

    store.get('decisions').then(
      decisions => {
        this.setState({
          decisions: decisions == null ? this.state.decisions : decisions,
          isLoading: false
        })
      }
    )

    this.setState({
      isLoading: false
    })
  }

  componentWillUnmount(){

  }



  deleteDecision = (decisionTitle) => {

    this.setState({
      decisions: this.state.decisions.filter((cell)=> {
        return cell.title != decisionTitle
      })
    })
    setTimeout(()=> {
      store.save('decisions', this.state.decisions)
    }, 200)
  }

  renderHorizontalBar(hasBar, delay){
    if (hasBar == true){
    return (<Animatable.View
            style={[styles.pathView,{
              backgroundColor:Colors.darkaccent
            }]}
            animation= "fadeInLeft"
            duration= {1000}
            delay={delay}
            easing="ease-out"
            >
          </Animatable.View>)
    }
    return (<View
            style={[styles.pathView,
              { backgroundColor: Colors.cloud,
                borderBottomRightRadius:0,
                borderTopRightRadius: 0,
              }]}
            >
          </View>)
  }

/*
<Text style={styles.decisionDeadline}>
  {Moment(cell.deadline).format('DD/MM/YYYY')}
</Text>
 */
  renderDecision(){
    return this.state.decisions.map((cell,i) => {

      var hasMark = cell.criteriaLabels.length >= 3
      var hasResult = cell.mark.length >= 2
        return (
          <View key={i} style={styles.globalDecisionView}>
            <View style={{
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems:'center'}}>
              <Text style={styles.decisionTitle}>
                {cell.title}
              </Text>

              <TouchableHighlight
                style={{
                  backgroundColor: Colors.highdarkprimary,
                  padding: 4,
                  borderRadius: 30
                }}
                onPress={() => this.deleteDecision(cell.title)}>
                <Icon
                  name="delete-forever"
                  size={Metrics.actionIconSize - 10}
                  color={Colors.actionButtonText}
                  />
              </TouchableHighlight>
            </View>
            <View style={styles.globalChoiceView}>
              {this.renderChoice(cell.choices)}
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center',
                marginVertical: 10}}>
                <TouchableHighlight
                  style={styles.criteriaView}
                  onPress={ NavigationActions.Criteria.bind(null,
                                  {
                                    setDecisionsEdit: this.setDecisionsEdit,
                                    decisions: this.state.decisions,
                                    decisionId: i
                                  })}>
                  <Text style={styles.buttonText}>
                    Définir
                  </Text>
                </TouchableHighlight>
                {this.renderHorizontalBar(hasMark, 0)}
                <TouchableHighlight
                  style={[styles.markView,{
                    backgroundColor:  hasMark ? Colors.highdarkprimary : Colors.cloud
                  }]}
                  onPress={ hasMark ? NavigationActions.Mark.bind(null,
                                  {
                                    setDecisionsEdit: this.setDecisionsEdit,
                                    decisions: this.state.decisions,
                                    decisionId: i
                                  }) : () => {}}>
                  <Text style={styles.buttonText}>
                    Noter
                  </Text>
                </TouchableHighlight>
                {this.renderHorizontalBar(hasResult, 1000)}

                <TouchableHighlight
                  style={[styles.resultatView,{
                    backgroundColor: hasResult ? Colors.highdarkprimary : Colors.cloud}
                  ]}
                  onPress={hasResult ? NavigationActions.GoodChoice.bind(null,
                                  {
                                    setDecisionsEdit: this.setDecisionsEdit,
                                    decisions: this.state.decisions,
                                    decisionId: i,
                                }):  () => {}}>
                  <Text style={styles.buttonText}>
                    Résultat
                  </Text>
                </TouchableHighlight>
            </View>
          </View>)
    })
  }

  /*

   */

  setDecisionsEdit = (decision, decisionIndex) => {

    var decisionsTmp = this.state.decisions


    if (decisionIndex == null){
      this.setState({
        decisions :  this.state.decisions.concat(decision)
      })
    } else {
      decisionsTmp[decisionIndex] = decision
      this.setState({
        decisions:decisionsTmp
      })
    }

    setTimeout(()=> {
      store.save('decisions', this.state.decisions)
    }, 200)
  }

  renderChoice(arrayChoice){
      return arrayChoice.map((cell,i) => {

    if (i + 1 <  arrayChoice.length )
        return (
        <View
            key={i}
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'}}>
          <View
          style={styles.choiceView}>
          <Text style={styles.choiceText}>
            {cell}
          </Text>
        </View>
        <View style={styles.vsView}>
          <Text style={styles.vsText}>
            VS
          </Text>
        </View>
      </View>)

  return (
    <View key={i}
        style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'}}>
            <View
            style={styles.choiceView}>
            <Text style={styles.choiceText}>
              {cell}
            </Text>
          </View>
        </View>)
      })
  }

  render () {



    if (this.state.isLoading)
      return (<Loading/>)

    return (
      <View style={styles.mainContainer}>
        <Background  />
        <ScrollView>
          <View style={{flex:1, marginBottom: 90 ,justifyContent:'space-around'}}>
            {this.renderDecision()}
          </View>
        </ScrollView>
        <ActionButton
          icon={<Icon
            name="new-box"
            size={Metrics.actionIconSize}
            color={Colors.actionButtonText}
            />}
          buttonColor={Colors.actionButtonBack}
          onPress={
              NavigationActions.Decision.bind(null,
                {
                  setDecisionsEdit: this.setDecisionsEdit,
                  decisions: this.state.decisions,
                  decisionId: null
                })
            }
        />
      </View>



    )
  }
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,

  // CRITERIA
  markView:{
    borderRadius: 10,
    backgroundColor: Colors.highdarkprimary,
    zIndex: 12,
  },
  criteriaView:{
    borderRadius: 10,
    backgroundColor: Colors.highdarkprimary,
    zIndex: 10,

  },
  resultatView:{
    borderRadius: 10,
    backgroundColor: Colors.highdarkprimary,
    zIndex: 13,
  },
  buttonText:{
    margin: Metrics.baseMargin,
    fontSize: Fonts.size.small,
    color: Colors.actionButtonText,
    fontFamily:'Rubik-Regular'
  },
  // DECISION
  globalDecisionView: {
    flexDirection: 'column',
    padding: 5,
    justifyContent:'center',
    borderRadius: 10,
    margin: 20,

    backgroundColor: Colors.darkprimary,
  },
  decisionTitle:{
    fontSize: Fonts.size.regular,
    color: Colors.text,
    fontFamily:'Rubik-Bold',
    marginHorizontal: 15
  },
  decisionDeadline:{
    fontSize: Fonts.size.small,
    color: Colors.text,
    fontFamily:'Rubik-Bold'
  },
  // CHOIX
  globalChoiceView:{
    justifyContent:'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: 60,
    borderTopWidth: 2,
    borderBottomWidth : 2,
    margin: 5,
    backgroundColor: Colors.darkaccent,
    borderColor: Colors.darkaccent
  },
  choiceText:{
    marginHorizontal: Metrics.baseMargin,
    fontSize: Fonts.size.regular,
    color: Colors.text,
    fontFamily:'Rubik-Medium'
  },
  vsText:{
    fontSize: Fonts.size.tiny,
    color: Colors.text,
    fontFamily:'Rubik-Regular'
  },
  vsView:{
    borderRadius: 20,
    //marginHorizontal: 5,
    backgroundColor: Colors.highdarkprimary,
    justifyContent: 'center',
    alignItems:'center',
    height: 20,
    width: 20
  },
  choiceView :{

  //  borderRadius: 10,
  //  margin: 5,
  //  borderColor: Colors.highdarkprimary,
  //  borderWidth: 2,
  //  backgroundColor: Colors.darkaccent,
    height: Metrics.choiceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pathView: {
  height: Metrics.linePathWidth,
  flex:1,
  alignItems:'center',
  justifyContent: 'center',
  flexDirection: 'row',
  zIndex: 1,
//  bottom: 0,
//  left: (Metrics.screenWidth/2)- (Metrics.linePathWidth / 2),
//  position: 'absolute',
  borderBottomRightRadius:30,
  borderTopRightRadius: 30,
},
});
