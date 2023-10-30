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
    badgeContent: '2',
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
    ],
  },
]
