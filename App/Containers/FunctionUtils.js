import { Colors, Images,Metrics, Fonts } from '../Themes/'
import _ from 'lodash'

export function ponderationCriteriaToText(value) {
    switch (value) {
    case 0:
        return ""
    case 0:
        return "Détail"
    case 32:
        return "Utile"
    case 64:
        return "Important"
    }
}

export function convertValWithCriteria(value, criteriaVal){

   if (criteriaVal == 1){
      return value * 1.25
    }
    if (criteriaVal == 2){
      return value * 1.50
    }

    return value

  }
