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

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [selectedOption, setSelectedOption] = useState("phone");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot password 🤔</Text>
      <Text style={styles.subtitle}>
        Select which contact details should we use to reset your password.
      </Text>

      <Image
        source={require("../../assets/images/undraw_access-account_aydp.svg")}
        style={styles.image}
      />

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "email" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("email")}
        >
          <View
            style={[
              styles.iconBox,
              selectedOption === "email" && styles.selectedIconBox,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={selectedOption === "email" ? "white" : "black"}
            />
          </View>
          <Text
            style={[
              styles.optionText,
              selectedOption === "email" && styles.selectedOptionText,
            ]}
          >
            Email
          </Text>
          <Text style={styles.optionDetail}>michael.mitc@example.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "phone" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("phone")}
        >
          <View
            style={[
              styles.iconBox,
              selectedOption === "phone" && styles.selectedIconBox,
            ]}
          >
            <Ionicons
              name="call-outline"
              size={20}
              color={selectedOption === "phone" ? "white" : "black"}
            />
          </View>
          <Text
            style={[
              styles.optionText,
              selectedOption === "phone" && styles.selectedOptionText,
            ]}
          >
            Phone Number
          </Text>
          <Text style={styles.optionDetail}>(217) 555-0113</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Auth")}
      >
        <Text style={styles.continueButtonText}>Verify</Text>
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
  optionContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "white",
    borderColor: "#4a90e2",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
    flex: 1,
  },
  selectedOptionText: {
    color: "black",
  },
  optionDetail: {
    color: "#999",
  },
  continueButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
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
  },
});
