import appAndPages from './app-and-pages'
import charts from './charts'

// import forms from './forms'
// import others from './others'
import uiElements from './ui-elements'
import finance from './finance'
import task from './task'
import type { VerticalNavItems } from '@/@layouts/types'

export default [...finance, ...task] as VerticalNavItems
