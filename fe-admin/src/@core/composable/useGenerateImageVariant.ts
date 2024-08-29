import { useThemeConfig } from '@core/composable/useThemeConfig'

const { theme, skin } = useThemeConfig()

// composable function to return the image variant as per the current theme and skin
export const useGenerateImageVariant = (imgLight: string, imgDark: string, imgLightBordered?: string, imgDarkBordered?: string, bordered = false) => {
  return computed(() => {
    if (theme.value === 'light')
      return skin.value === 'bordered' && bordered ? imgLightBordered : imgLight
    else
      return skin.value === 'bordered' && bordered ? imgDarkBordered : imgDark
  })
}
