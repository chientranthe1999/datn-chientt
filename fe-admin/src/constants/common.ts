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
  HIGHEST: {
    color: 'error',
    icon: 'tabler-arrow-badge-up',
    text: 'Highest',
  },
}

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  VALIDATION_ERR: 422,
}

export const CATEGORY_TYPE: Record<string, Record<string, string>> = {
  DEBT: {
    value: 'DEBT',
    label: 'Debt',
    icon: 'tabler-minus',
    color: 'error',
  },
  SALARY: {
    value: 'SALARY',
    label: 'Salary',
    icon: 'tabler-plus',
    color: 'success',
  },
  INCOME: {
    value: 'INCOME',
    label: 'Income',
    color: 'success',
    icon: 'tabler-plus',
  },
  EXPENSE: {
    value: 'EXPENSE',
    label: 'Expense',
    icon: 'tabler-minus',
    color: 'error',
  },
}
