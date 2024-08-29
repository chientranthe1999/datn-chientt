export default [
  { heading: 'Others' },
  {
    title: 'Access Control',
    icon: { icon: 'tabler-shield' },
    to: 'access-control',
    action: 'read',
    subject: 'Auth',
  },
  {
    title: 'Disabled Menu',
    to: null,
    icon: { icon: 'tabler-eye-off' },
    disable: true,
  },
]
