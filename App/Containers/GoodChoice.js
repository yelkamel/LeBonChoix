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
import {ponderationCriteriaToText, convertValWithCriteria} from './FunctionUtils'
var CircularProgressDisplay = require('react-native-progress-circular');


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
export default class GoodChoice extends React.Component {
  unmounted = false
   static propTypes = {
     setDecisionList: React.PropTypes.func,
     decisions: React.PropTypes.arrayOf(React.PropTypes.object),
     decisionId: React.PropTypes.number,
   }

  constructor (props) {
    super(props)

     this.state = {
       isLoading: true,
       rankChoice: [],
       totalMark:0,
       progress: 0
    };
    this.choices = this.props.decisions[this.props.decisionId].choices
    this.mark = this.props.decisions[this.props.decisionId].mark
    this.criteriaVal = this.props.decisions[this.props.decisionId].criteriaValues
  }

  componentWillUnmount() {
    this.unmounted = true
  }



  someCriteriaMark(){
    var someMarkTmp = []
    var totalMarkTmp = 0
    var topChoice = 0

    this.choices.map((choices, indexChoice)=>{
      var someTmp = 0

      this.mark[indexChoice].map((nb, indexCriteria)=>{
        someTmp = someTmp + convertValWithCriteria(nb , this.criteriaVal[indexCriteria])
      })

      if (someTmp > topChoice)
        topChoice = someTmp

      someMarkTmp = someMarkTmp.concat({
        nbMark: someTmp,
        title: choices,
        forRank: -1 * someTmp
      })
      totalMarkTmp = totalMarkTmp + someTmp
    })

    this.setState({
      rankChoice : _.sortBy(someMarkTmp,'forRank'),
      totalMark : totalMarkTmp,
      progress:  parseInt((topChoice/totalMarkTmp) * 100, 10)
    })
  }

  componentWillMount(){
    console.log("MARK");
    this.someCriteriaMark()
    this.setState({
      isLoading: false
    })
  }

  componentDidMount(){
  /*
   setTimeout(()=> {
      this.someCriteriaMark()
    }, 2000)
    */

  }
  renderStatsForEachChoice(){

  return this.state.rankChoice.map((cell, index)=>{
    var progress = parseInt((cell.nbMark/this.state.totalMark) * 100, 10)
    return (
      <View style={styles.goodChoiceView}>
        <Text style={styles.TitleText}>
        {index + 1}]  <B>{cell.title}</B>  avec {cell.nbMark} points
        </Text>
        <CircularProgressDisplay.Hollow
          size={100}
          progressBarWidth={10}
          outlineWidth={0}
          outlineColor={'black'}
          backgroundColor={Colors.highaccent}
          progressBarColor={Colors.darkaccent}
          innerComponent={
            <View style={{width: 100, height: 100, flex:1, justifyContent: 'center',
                  alignItems: 'center', backgroundColor: Colors.darkprimary}}>
                    <Text style={styles.goodChoiceText}>{progress + "%"}</Text>
                  </View>}
          rotate={((progress/100)*360)}/>
      </View>
      )
    })
  }

/*

 */
  render () {
    var progress = this.state.progress


    if (this.state.isLoading){
      return (
      <View>

      </View>)
    }
    return (
    <View style={styles.mainContainer}>
      <Background />
      <ScrollView>
        {this.renderStatsForEachChoice()}

        <View style={styles.statsGlobalView}>

          <Text style={[styles.TitleText, {marginTop: 20,color: Colors.text}]}>
            Dernier Conseil
          </Text>
          <Text style={styles.statsText}>Merci d'avoir utiliser LeBonChoix, j'espère que cela vous aura éclairé.{'\n'}
          Ces chiffres sont seulement à titre indicatif. Si vous avez quelconque idée pour amélioré l'application, n'hésitez pas à me contacter.{'\n'}
          Une dernière astuce pour avoir LeBonChoix, demandé conseil des gens qui ont déjà fait ces choix.
          </Text>
          <Text style={styles.statsText}>
          </Text>
          <Text style={styles.statsText}>
          </Text>

        </View>
         </ScrollView>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  statsGlobalView:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkprimary,
    margin: 20,
    padding: 10,
    borderRadius: 20
  },
  statsText:{
    fontSize: Fonts.size.medium,
    fontFamily: 'Rubik-Regular',
    color: Colors.text,
    backgroundColor: 'transparent',
  },

  goodChoiceView:{
    flex:1,
    padding: 10,
    margin:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goodChoiceText:{
    fontSize: Fonts.size.medium,
    fontFamily: 'Rubik-Regular',
    color: Colors.text,
    backgroundColor: 'transparent'
  },
  TitleView:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TitleText:{
    fontSize: Fonts.size.regular,
    fontFamily: 'Rubik-Regular',
    color: Colors.darkprimary,
    margin: 10,
    backgroundColor: 'transparent'
}
});
