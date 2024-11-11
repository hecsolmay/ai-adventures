import { type SettingsType } from '@/types'

export const navbarLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Herramientas', href: '/tools' },
  { name: 'Aprender', href: '/learn' }
]

export const LOCAL_STORAGE_KEYS = {
  VOICE_INDEX: 'voiceIndex'
}

export const DEFAULT_VOICE_INDEX = 0

export const DEFAULT_SETTINGS_VALUES: SettingsType = {
  selectedVoiceIndex: DEFAULT_VOICE_INDEX
}
