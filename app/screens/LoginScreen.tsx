import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthForm from "../components/AuthForm";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.50.2.110:8000"
    : "http://localhost:8000";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Email and password cannot be empty");
        return;
      }

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // This includes the cookies in the request
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert(
          "Login failed",
          data.message || "Email or password is incorrect"
        );
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Optional: Store token and email in AsyncStorage if you want to keep track outside of cookies
      await AsyncStorage.setItem("access_token", data.token);
      await AsyncStorage.setItem("user_email", data.email);

      console.log("Stored Token:", data.token);
      console.log("Stored Email:", data.email);

      // Debugging: login success
      console.log("Login success");

      // Navigate to the next screen after login
      navigation.navigate("Attendance");
    } catch (error) {
      Alert.alert("Login failed", "An error occurred");
      console.error("Login error:", error);
    }
  };

  return (
    <AuthForm title="Sign in to continue">
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            secureTextEntry={!passwordVisible}
            style={{ fontSize: 14, flex: 1 }}
            placeholder="Input Your Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 14,
        }}
      >
        <Text>
          Forgot{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text style={{ color: "purple" }}>Password?</Text>
          </TouchableOpacity>
        </Text>
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
        onPress={handleLogin}
      >
        <View style={{ height: 40, justifyContent: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={{ textAlign: "center", marginVertical: 14 }}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "purple" }}>Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </AuthForm>
  );
}
