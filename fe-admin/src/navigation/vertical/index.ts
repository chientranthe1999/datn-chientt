import appAndPages from './app-and-pages'
import charts from './charts'

import forms from './forms'
import others from './others'
import uiElements from './ui-elements'
import finance from './finance'
import type { VerticalNavItems } from '@/@layouts/types'

export default [...finance, ...appAndPages, ...uiElements, ...forms, ...charts, ...others] as VerticalNavItems
