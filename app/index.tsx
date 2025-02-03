import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotScreen";
import AuthVerifyScreen from "./screens/AuthScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
          <Stack.Screen name="Auth" component={AuthVerifyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default App;
