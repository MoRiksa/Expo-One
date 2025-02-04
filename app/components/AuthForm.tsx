import React, { ReactNode } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

interface AuthFormProps {
  title: string;
  children: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children }) => {
  const { width } = Dimensions.get("window");

  return (
    <View style={{ flex: 1, margin: 14 }}>
      <View>
        <Image
          source={{
            uri: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
          }}
          style={{ width: 100, height: 100, margin: 14, borderRadius: 100 }}
        />
      </View>
      <View style={{ width: width * 0.7, marginBottom: 14 }}>
        <Text style={{ fontWeight: "bold", fontSize: 34 }}>
          Welcome to<Text style={{ color: "purple" }}> MoRiksa.co</Text>
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginVertical: 14,
          opacity: 0.5,
        }}
      >
        {title}
      </Text>
      {children}
      <View
        style={{ columnGap: 12, flexDirection: "row", alignItems: "center" }}
      >
        <View style={[authStyles.divider, { flexGrow: 1 }]} />

        <Text style={{ textAlign: "center", marginVertical: 14 }}>
          or Continue with
        </Text>
        <View style={[authStyles.divider, { flexGrow: 1 }]} />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "purple",
          marginVertical: 7,
          pointerEvents: "auto",
        }}
      >
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/337/722/png-clipart-google-search-google-account-google-s-google-play-google-company-text-thumbnail.png",
          }}
          style={{ width: 30, height: 30 }}
        />
        <Text style={{ color: "purple", fontWeight: "bold", fontSize: 16 }}>
          Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const authStyles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 14,
    opacity: 0.5,
    marginTop: 18,
  },
});

export default AuthForm;
