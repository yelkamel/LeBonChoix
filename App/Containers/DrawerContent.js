import React, { Component } from 'react'
import { ScrollView, View,Text,Image, BackAndroid,StyleSheet } from 'react-native'
import { Images, Metrics, Fonts,Colors,ApplicationStyles } from '../Themes'
import ResponsiveImage from 'react-native-responsive-image';

class DrawerContent extends Component {
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <ResponsiveImage source={Images.Logo} style={styles.drawerLogo} initWidth="150" initHeight="150" />
        <View style={styles.drawView}>
          <Text style={styles.drawText}>
            De nouvelles mise à jours seront disponible bientôt pour vous aidez à faire LeBonChoix.
          </Text>
        </View>

      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
const styles = StyleSheet.create({
  container: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.highdarkprimary
  },
  drawerLogo:{
   marginTop: 100,
   marginBottom: 10,
   alignSelf: 'center'
 },

drawView:{
  backgroundColor: Colors.darkprimary,
  borderRadius: 5

},
 drawText:{
 //  backgroundColor: 'transparent',
 //  color: Colors.darkprimary,
   fontWeight: 'bold',
   margin:10,
   fontSize: Fonts.size.medium,
   fontFamily: 'Rubik-Regular',
   color: Colors.text,
 },

  centered: {
    alignItems: 'center'
  }
});
