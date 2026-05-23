export interface DropdownItem {
  label: string
  path: string
}

export interface MenuItem {
  label: string
  path: string
  hasDropdown: boolean
  dropdownItems?: DropdownItem[]
}
