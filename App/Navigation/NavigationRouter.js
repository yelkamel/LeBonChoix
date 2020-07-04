import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import Decision from '../Containers/Decision'
import HowTo from '../Containers/HowTo'
import Criteria from '../Containers/Criteria'
import Mark from '../Containers/Mark'
import GoodChoice from '../Containers/GoodChoice'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene initial key='LaunchScreen' component={LaunchScreen} title='LeBonChoix'

            navigationBarStyle={Styles.navBar}
            renderRightButton={NavItems.mainHelp}  />
          <Scene  key='Decision' component={Decision} title='La Decision'
            navigationBarStyle={Styles.navBar}  />
          <Scene  key='Criteria' component={Criteria} title='Les Critères'
              navigationBarStyle={Styles.navBar}  />
          <Scene  key='HowTo' component={HowTo} title='Comment Choisir ?'
            navigationBarStyle={Styles.navBar}  />
          <Scene  key='Mark' component={Mark} title='Les Notes'
              navigationBarStyle={Styles.navBar}  />
            <Scene  key='GoodChoice' component={GoodChoice} title='Résultat'
                  navigationBarStyle={Styles.navBar}  />
          </Scene>
        </Scene>
      </Router>
    )
  }
}
//            <Scene initial key='launchScreen' component={LaunchScreen} title='LaunchScreen' hideNavBar />

export default NavigationRouter
