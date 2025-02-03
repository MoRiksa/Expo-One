import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import AuthForm from "../components/AuthForm";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <AuthForm
      title="Sign in to continue"
      buttonText="Login"
      onSubmit={handleLogin}
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
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 14,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text>
            Forgot <Text style={{ color: "purple" }}>Password?</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </AuthForm>
  );
}
