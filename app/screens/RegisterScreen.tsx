import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Register successful");
  };

  return (
    <AuthForm title="Create an account">
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
          <TextInput
            style={{ fontSize: 14 }}
            placeholder="Input Your Email"
            value={email}
            onChangeText={setEmail}
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
            placeholder="Input Your Password"
            value={password}
            onChangeText={setPassword}
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "purple",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          marginVertical: 7,
          marginTop: 50,
        }}
        onPress={handleRegister}
      >
        <View style={{ height: 40, justifyContent: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Register
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={{ textAlign: "center", marginVertical: 14 }}>
          Already have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "purple" }}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </AuthForm>
  );
}
