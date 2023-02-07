/* eslint-disable import/no-anonymous-default-export */
import { mergeDeep } from 'utils'
import MuiCard from './MuiCard'
import MuiPaper from './MuiPaper'
import MuiButton from './MuiButton'
import MuiCssBaseline from './MuiCssBaseline'
import MuiButtonBase from './MuiButtonBase'

export default function overrides(theme) {
  return mergeDeep(
    MuiCard(theme),
    MuiPaper(theme),
    MuiButton(theme),
    MuiCssBaseline(theme),
    MuiButtonBase(theme),
  )
}
