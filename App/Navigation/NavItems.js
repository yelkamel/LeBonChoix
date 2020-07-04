import React from 'react'
import { TouchableOpacity,TouchableHighlight } from 'react-native'
import styles from './Styles/NavItemsStyles'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../Themes'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

const backAndRefresh = () =>{
  NavigationActions.pop()
    setTimeout(() => {
    NavigationActions.refresh({key: 'LaunchScreen'})
  }, 10);
}

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.LaunchScreen}>
        <Icon name='angle-left'
          size={Metrics.icons.large}
          color={Colors.actionButtonText}
          style={styles.backButton}
        />
      </TouchableOpacity>
    )
  },

  mainHelp(){
   return (
   <TouchableHighlight style={{
       flex:1,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent:'flex-end',
       width: Metrics.barMenuIconWidth}}
      onPress={NavigationActions.HowTo}>
     <Icon name="help-circle-outline" size={Metrics.icons.small+3} color={Colors.actionButtonText} />
  </TouchableHighlight>
   )
   },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name='bars'
          size={Metrics.icons.medium}
          color={Colors.actionButtonText}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  searchButton (callback) {
    return (
      <TouchableOpacity onPress={callback}>
        <Icon name='search'
          size={Metrics.icons.small}
          color={Colors.actionButtonText}
          style={styles.searchButton}
        />
      </TouchableOpacity>
    )
  }

}
