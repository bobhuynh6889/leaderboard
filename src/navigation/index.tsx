import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(routeName: string, params?: object): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName, params);
  }
}

function goBack(): void {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

const NavigationService = {
  navigate,
  goBack,
};

export default NavigationService;
