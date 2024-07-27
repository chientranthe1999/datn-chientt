export const CategoryIcon = [
  'cate-breakfast',
  'cate-car-service',
  'cate-lunch',
  'cate-electricity',
  'cate-food',
  'cate-fuel',
  'cate-internet',
  'cate-pets',
  'cate-shopping',
  'cate-study',
  'cate-travel',
  'cate-water',
] as const

export const TASK_PRIORITY = {
  LOW: {
    color: 'primary',
    icon: 'tabler-chevron-down',
    text: 'Low',
  },
  MEDIUM: {
    color: 'success',
    icon: 'tabler-menu',
    text: 'Medium',
  },
  HIGH: {
    color: 'error',
    icon: 'tabler-arrow-badge-up',
    text: 'High',
  },
}

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
}

