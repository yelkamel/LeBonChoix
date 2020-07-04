import '../Config'
import React, { Component } from 'react'
import { BackAndroid,Platform,AsyncStorage } from 'react-native'
import { Provider} from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import AppIntro from 'react-native-app-intro';
import codePush from "react-native-code-push";
import Loading from '../Components/Loading'

const UPDATE_DIALOG =
{
    title: "Mise à jour 😉",
    mandatoryUpdateMessage: "Une nouvelle version pour vous servir ! ",
    mandatoryContinueButtonLabel: "Continuer",
};

const pageArray = [
{
  title: "Pour être sûr de votre choix",
  description: "vous pouvez utiliser cette méthode en quelques étapes.",
  /*img: Images.SwipRight,
  imgStyle: {
    height: 150,
    width: 100,
  },*/
  backgroundColor: Colors.highdarkprimary,
  fontColor: Colors.text,
  level: 20,
},
{
  title: "Définissez la décision avec un titre",
  description: "Avec un titre, une date butoire et puis une liste de choix.",
  backgroundColor: Colors.highdarkprimary,
  fontColor: Colors.text,
  level: 20,
},
{
  title: "Ensuite déterminez",
  description: "les critères et leurs degrès d'importance (l'argent, la température, etc).",
  backgroundColor: Colors.highdarkprimary,
  fontColor: Colors.text,
  level: 20,
},
{
  title: "Et enfin pour chaque choix",
  description: "attribuez une note par critère !",
  backgroundColor: Colors.highdarkprimary,
  fontColor: Colors.text,
  level: 20,
},
]

const store = createStore()

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      IsFirstCo: '1',
    }

    this.backPress=false
  }


  onSkipBtnHandle = (index) => {

  }

  doneBtnHandle = () => {
    AsyncStorage.setItem("IsFirstCo", '0')

    this.setState({
        IsFirstCo:'0'
    })
  }

  nextBtnHandle = (index) => {

  }

  onSlideChangeHandle = (index, total) => {

  }

  componentWillMount(){

    if (Platform.OS != 'ios') {
      BackAndroid.addEventListener('hardwareBackPress', function() {
      if(!this.backPress) {
        Toast.show("Appuyer une seconde fois sur retour pour quitter 😭", {
          duration: 2500,
          backgroundColor: Colors.highdarkaccent,
          position: Metrics.screenHeight/2,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        this.backPress=true
        setTimeout(() => {
          this.backPress=false
        },2500);
        } else {
        return false;
      }
      return true;
      }.bind(this));
    }

    this.loadData()
  }

  async getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      return value;
    } catch (error) {
      console.log(value);
    }
  }

  loadData(){
    AsyncStorage.getItem("IsFirstCo").then((value) => {
      this.setState({
        IsFirstCo: value == null ? this.state.IsFirstCo : value,
        isLoading: false
      })
    }).done();

  /*this.setState({
    IsFirstCo: this.getItem("IsFirstCo"),
    isLoading: false
  })*/
  }

  componentDidMount(){
  /*  codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: UPDATE_DIALOG,
    }) */
  //  AsyncStorage.setItem("IsFirstCo", '1')

  }

  render () {
    /*
    if (this.state.IsFirstCo){
      return (<Loading />)
    }
    */

    if(this.state.IsFirstCo == '1'){
      return (
        <AppIntro
          onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
          doneBtnLabel="OK"
          rightTextColor= {Colors.actionButtonText}
          activeDotColor={Colors.actionButtonText}
          showSkipButton={false}
          pageArray={pageArray}
        />)
    }
    else {
      return (
        <Provider store={store}>
          <RootContainer />
        </Provider>
      )
    }
  }
}

export default App
