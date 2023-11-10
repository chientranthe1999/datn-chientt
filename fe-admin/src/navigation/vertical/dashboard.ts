export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Analytics',
        to: 'dashboards-analytics',
      },
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
    ],
    badgeClass: 'bg-light-primary text-primary',
  },
  {
    title: 'router.finance',
    icon: { icon: 'tabler-coins' },
    children: [
      {
        title: 'finance.overview',
        to: 'finance-management-overview',
      },
      {
        title: 'finance.transaction',
        to: 'finance-management-transactions',
      },
      {
        title: 'finance.transaction_add',
        to: 'finance-management-transaction-add',
      },
      {
        title: 'Wallet',
        to: 'finance-management-wallets',
      },
    ],
  },
]
