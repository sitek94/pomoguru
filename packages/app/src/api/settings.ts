const settingsKey = 'settings'
type SettingName =
  | 'focus-time-duration-in-seconds'
  | 'break-time-duration-in-seconds'

export const defaultSettings = {
  'focus-time-duration-in-seconds': 1500,
  'break-time-duration-in-seconds': 300,
}
export type Settings = typeof defaultSettings

/**
 * SettingName type guard
 */
export function isSettingName (name: string): name is SettingName {
  return name in defaultSettings
}

function saveSettings (settings: Settings) {
  localStorage.setItem(settingsKey, JSON.stringify(settings))
}

export function readSettings () {
  const settings = localStorage.getItem(settingsKey)

  if (settings) {
    const parsedSettings: Settings = JSON.parse(settings);
    
    if (typeof parsedSettings === 'object') {
      return {
        ...defaultSettings,
        ...parsedSettings,
      };
    }
  }
  return defaultSettings;
}

const api = {
  set (name: SettingName, value: number) {
    const settings = readSettings()
    settings[name] = value
    saveSettings(settings)
  },
  get (name: SettingName) {
    const settings = readSettings()
    return settings[name] ?? defaultSettings[name]
  }
}

export default api
