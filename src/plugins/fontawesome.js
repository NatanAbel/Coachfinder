import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {faArrowsRotate,faUserPlus,faEllipsis,faTrash,faPenToSquare,faArrowLeft,faRightToBracket,faRightFromBracket,faPencil } from '@fortawesome/free-solid-svg-icons'


library.add(faArrowsRotate,faUserPlus,faEllipsis,faTrash,faPenToSquare,faArrowLeft,faRightToBracket,faRightFromBracket, faPencil)

export function registerFontAwesome(app) {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
