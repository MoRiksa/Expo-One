import React from "react";
import { TextInput, View } from "react-native";
import AuthForm from "../components/AuthForm";

export default function RegisterScreen() {
  const handleRegister = () => {
    // Handle registration logic here
  };

  return (
    <AuthForm
      title="Create an account"
      buttonText="Register"
      onSubmit={handleRegister}
    >
      <View style={{ marginVertical: 14, gap: 10 }}>
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            backgroundColor: "white",
            borderColor: "purple",
            borderWidth: 2,
            pointerEvents: "auto",
          }}
        >
          <TextInput style={{ fontSize: 14 }} placeholder="Input Your Email" />
        </View>
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            backgroundColor: "white",
            borderColor: "purple",
            borderWidth: 2,
            pointerEvents: "auto",
          }}
        >
          <TextInput
            secureTextEntry
            style={{ fontSize: 14 }}
            placeholder="Input Your Password"
          />
        </View>
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            backgroundColor: "white",
            borderColor: "purple",
            borderWidth: 2,
            pointerEvents: "auto",
          }}
        >
          <TextInput
            secureTextEntry
            style={{ fontSize: 14 }}
            placeholder="Confirm Your Password"
          />
        </View>
      </View>
    </AuthForm>
  );
}
