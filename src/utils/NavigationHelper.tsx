import {createNavigationContainerRef} from '@react-navigation/core';
import {RootStackParamList} from 'navigation/RootStackNavigation';

export const navigationContainerRef =
  createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
): void {
  if (navigationContainerRef.isReady()) {
    navigationContainerRef.navigate(...args);
  }
}
