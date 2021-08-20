import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ListMail, ViewMail, SendMail} from './screens';
import {SCREEN} from './constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.LIST_MAIL}>
        <Stack.Screen
          name={SCREEN.LIST_MAIL}
          component={ListMail}
          options={{
            title: 'Inbox',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN.VIEW_MAIL}
          component={ViewMail}
          options={{title: ''}}
        />
        <Stack.Screen
          name={SCREEN.SEND_MAIL}
          component={SendMail}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
