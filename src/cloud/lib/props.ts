import {
  mdiAccountCheckOutline,
  mdiAccountOutline,
  mdiArrowDownDropCircleOutline,
  mdiCalendarMonthOutline,
  mdiCheckAll,
  mdiTimerOutline,
  mdiTimerSandEmpty,
} from '@mdi/js'
import { capitalize } from 'lodash'
import { NullablePropData } from '../interfaces/db/props'

export const supportedPropertyNames = [
  'assignees',
  'reviewers',
  'dueDate',
  'startDate',
  'timeEstimate',
  'timeTracked',
  'status',
]

export function getPropsOfItem(props: Record<string, NullablePropData>) {
  const properties: Record<
    string,
    { name: string; data: NullablePropData }
  > = {}

  Object.entries(props).forEach((prop) => {
    if (!supportedPropertyNames.includes(prop[0])) {
      return
    }

    properties[getLabelOfProp(prop[0])] = { name: prop[0], data: prop[1] }
  })

  return properties
}

export function getLabelOfProp(propName: string): string {
  switch (propName) {
    case 'dueDate':
      return 'Due Date'
    case 'startDate':
      return 'Start Date'
    case 'timeEstimate':
      return 'Time Estimate'
    case 'timeTracked':
      return 'Time Tracked'
    case 'status':
    case 'reviewers':
    case 'assignees':
    default:
      return capitalize(propName)
  }
}

export function getIconPathOfProp(propName: string): string | undefined {
  switch (propName) {
    case 'dueDate':
      return mdiCheckAll
    case 'startDate':
      return mdiCalendarMonthOutline
    case 'timeEstimate':
      return mdiTimerSandEmpty
    case 'timeTracked':
      return mdiTimerOutline
    case 'status':
      return mdiArrowDownDropCircleOutline
    case 'reviewers':
      return mdiAccountCheckOutline
    case 'assignees':
      return mdiAccountOutline
    default:
      return
  }
}

export function getInitialPropDataOfProp(propName: string): NullablePropData {
  switch (propName) {
    case 'dueDate':
    case 'startDate':
      return { type: 'date', data: null }
    case 'timeEstimate':
    case 'timeTracked':
      return { type: 'json', data: { dataType: 'timeperiod', data: null } }
    case 'reviewers':
    case 'assignees':
      return { type: 'user', data: null }
    case 'status':
    default:
      return { type: 'string', data: null }
  }
}