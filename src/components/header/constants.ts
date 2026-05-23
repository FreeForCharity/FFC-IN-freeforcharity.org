import { MenuItem } from './types'

export const menuItems: MenuItem[] = [
  { label: 'Home', path: '/', hasDropdown: false },
  {
    label: 'Help for Charities',
    path: '/help-for-charities',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Help for Charities', path: '/help-for-charities' },
      { label: '501c3 Onboarding Guide', path: '/501c3' },
      { label: 'Pre501c3 Onboarding Guide', path: '/pre501c3' },
      {
        label: 'Online Impacts Onboarding Guide',
        path: '/online-impacts-onboarding-guide',
      },
      { label: 'GuideStar Profile Setup Guide', path: '/guidestar-guide' },
      {
        label: 'Understanding Your Free For Charity WordPress Website Hosting: A Layered Approach',
        path: '/techstack',
      },
      {
        label:
          'Charity Validation Guide – Ensuring Mutual Benefit Through Comprehensive Validation Processes',
        path: '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes',
      },
    ],
  },
  {
    label: 'Volunteer',
    path: '/volunteer',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Volunteer', path: '/volunteer' },
      {
        label: 'FFC Volunteer Proving Ground: Core Competencies',
        path: '/ffc-volunteer-proving-ground-core-competencies',
      },
      {
        label: 'Free For Charity (FFC) Web Developer Training Guide',
        path: '/free-for-charity-ffc-web-developer-training-guide',
      },
    ],
  },
  {
    label: 'Donate',
    path: '/donate',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Donate', path: '/donate' },
      {
        label: 'Free For Charity Endowment Fund',
        path: '/free-for-charity-endowment-fund',
      },
    ],
  },
  {
    label: 'About Us',
    path: '/about-us',
    hasDropdown: true,
    dropdownItems: [{ label: 'Contact Us', path: '/contact-us' }],
  },
  {
    label: 'Other',
    path: '#',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Free For Charity Domains', path: '/domains' },
      {
        label: 'Free for Charity’s Tools for Success',
        path: '/free-for-charitys-tools-for-success',
      },
      {
        label: 'Free Charity Web Hosting',
        path: '/free-charity-web-hosting',
      },
    ],
  },
  {
    label: 'FFCAdmin',
    path: '/ffcadmin',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Free For Charity (FFC) Service Delivery Stages',
        path: '/free-for-charity-ffc-service-delivery-stages',
      },
      {
        label: 'FFC Admin cPanel Backup',
        path: '/ffcadmin-free-for-charity-cpanel-backup-sop',
      },
    ],
  },
]
