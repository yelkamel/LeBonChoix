import React from 'react'
import { View, ScrollView, Text, Image,StyleSheet } from 'react-native'
import Loading from '../Components/Loading'
import Background from '../Components/Background'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Metrics, ApplicationStyles, Fonts } from '../Themes/'

const B = (props) => <Text style={{fontWeight: 'bold',color: Colors.highdarkprimary}}>{props.children}</Text>

export default class HowTo extends React.Component {

  constructor () {
    super()
    this.state = {

    };
  }



  renderandomQuestion (){

  }


  render () {
    return (
      <View style={styles.mainContainer}>
            <ScrollView style={{flex:1, backgroundColor: Colors.highlightprimary}}>
            <View style={styles.principalView}>
            <View style={styles.section}>
              <Text style={styles.subTitle}>
                Définir la décision
              </Text>
            </View>

              <Text style={styles.basicText}>
                Il faut être clair sur:
              </Text>

              <View style={styles.puceView}>
              <View style={[{flexDirection: 'row'}]}>
                <Icon name='numeric-1-box' size={20} color={Colors.highdarkprimary} style={styles.iconText}></Icon>
                <Text style={[styles.basicText]}>Pourquoi prendre cette décision ? </Text>
              </View>
              <View style={[{marginRight: 5, flexDirection: 'row'}]}>
                <Icon name='numeric-2-box' size={20} color={Colors.highdarkprimary} style={styles.iconText}></Icon>
                <Text style={[styles.basicText]}>Quel sont les conséquences de cette décision ?</Text>
              </View>

              <Text style={styles.basicText}>
                Un fois que vous vous êtes poser ces quetions, vous devriez avoir un certain nombre limiter de <B>choix</B>.
                Et avoir une idée de quand est-ce que la décision doit être prise.

              </Text>

              </View>

              <View style={styles.section}>
                <Text style={styles.subTitle}>
                  Selectionner des critères
                </Text>
              </View>

              <Text style={styles.basicText}>
                La décision doit dépendre de certain <B>paramètre</B>.
                Par exemple, pour choisir la destination de ces prochaines vacances.{"\n"}
                Il faut prendre en compte le cout, le temps et la population.{"\n"}
                Essayez de définir un <B>ordre d'importance</B> concernant pour chaque critères.{"\n"}
                Pour les calcules: detail * 1, utile * 1.25 et important * 1.50.
              </Text>

              <View style={styles.section}>
                <Text style={styles.subTitle}>
                  Noter les critères pour chaque choix
                </Text>
              </View>
              <Text style={styles.basicText}>
                La dernière étape et peut-être la plus difficile, noter les critères selon vos gout le mieux possible.{"\n"}
                Puis le résultat sera généré.
              </Text>
              </View>
              </ScrollView>
            </View>)
      }
}



const styles = StyleSheet.create({
  ...ApplicationStyles.screen,


      iconText:{
        marginVertical: Metrics.baseMargin,
        marginHorizontal:  Metrics.baseMargin
      },

      puceView:{
        justifyContent : 'center',
        width: Metrics.screenWidth* 0.80,
       marginVertical: Metrics.baseMargin,
      },

      swipperWrapper:{
        marginVertical: Metrics.smallMargin,
        marginHorizontal:  Metrics.baseMargin
      },

      subTitle:{
        fontWeight: "bold",
        color: Colors.highdarkprimary,
        fontSize: Fonts.size.regular,
        fontFamily: 'Rubik-Regular',

      },

      titleText:{
        color: Colors.highdarkprimary,
        fontWeight: "bold",
        fontSize: Fonts.size.h6,
        fontFamily: 'Rubik-Regular',

      },
      basicText:{
        fontSize: Fonts.size.medium,
        color: Colors.highdarkprimary,
        fontFamily: 'Rubik-Medium',
      },
      principalView: {
        backgroundColor: 'transparent',
        justifyContent : 'center',
        marginVertical: Metrics.baseMargin,
        marginHorizontal:  Metrics.baseMargin
      },
});
