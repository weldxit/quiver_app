// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Entry from './Entry';
import Login from './Login';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulating asynchronous tasks such as data loading or authentication check
    setTimeout(() => {
      // Set isLoading to false after the splash screen duration
      setIsLoading(false);
      // Simulate user authentication check (replace with your actual logic)
      const userIsLoggedIn = true; // Replace with your authentication logic
      setIsLoggedIn(userIsLoggedIn);
    }, 2000); // Adjust the duration of the splash screen
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : isLoggedIn ? (
          <Stack.Screen name="Home" component={Entry} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
