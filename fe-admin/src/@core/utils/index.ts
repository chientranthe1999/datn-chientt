// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return (Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}

export const getListIcon = (srcPath: string, prefix: string) => {
  let icons = {}

  switch (srcPath) {
    case 'category':
      icons = import.meta.glob('/src/assets/images/icons/category/*.svg')
      break
    case 'wallet':
      icons = import.meta.glob('/src/assets/images/icons/wallet/*.svg')
      break
  }
  const iconList = []
  for (const path in icons) {
    const key = path.replace(/^.*[\\\/]/, '').replace('.svg', '')

    prefix ? iconList.push(`${prefix}-${key}`) : iconList.push(key)
  }

  return iconList
}
