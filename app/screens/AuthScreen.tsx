import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AuthVerifyScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent a verification code to your phone number.
      </Text>

      <Image
        source={require("../../assets/images/undraw_authentication_tbfc.svg")}
        style={styles.image}
      />
      <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 130 }}>
        <Text style={{ textAlign: "right", marginVertical: 10, fontSize: 14 }}>
          00:30{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text style={{ color: "purple" }}>Resend it</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 0,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconBox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedIconBox: {
    backgroundColor: "purple",
    borderColor: "#4a90e2",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
  },
});
