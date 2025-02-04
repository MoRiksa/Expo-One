import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.10:8000"
    : "http://localhost:8000";

const AttendanceScreen = () => {
  const { width } = Dimensions.get("window");
  const [swipeStatus, setSwipeStatus] = useState(false);
  const swipePosition = useRef(new Animated.Value(0)).current;
  const backgroundColor = swipePosition.interpolate({
    inputRange: [0, width - 140],
    outputRange: ["purple", "red"],
  });

  const [attendanceData, setAttendanceData] = useState({
    jam_masuk: "",
    jam_keluar: "",
  });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Retrieve the token and user_email from AsyncStorage
        const token = await AsyncStorage.getItem("access_token"); // Ensure correct key is used
        const email = await AsyncStorage.getItem("user_email");

        if (!token || !email) {
          Alert.alert("Error", "Token or email not found.");
          return;
        }

        // Make the fetch request with Bearer token in headers
        const response = await fetch(`${BASE_URL}/absensi/nip/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token here
          },
          credentials: "include", // Include cookies if necessary
        });

        if (!response.ok) {
          const data = await response.json();
          Alert.alert(
            "Failed to fetch attendance data",
            data.message || "An error occurred"
          );
          return;
        }

        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        Alert.alert("Failed to fetch attendance data", "An error occurred");
        console.error("Fetch attendance data error:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleCheckIn = async () => {
    try {
      const email = await AsyncStorage.getItem("user_email");
      if (!email) {
        Alert.alert("Error", "Email not found.");
        return;
      }

      const now = new Date();
      const gmtPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const jam_masuk = gmtPlus7.toISOString().split("T")[1].split(".")[0];
      const tanggal = gmtPlus7.toISOString().split("T")[0];

      const response = await fetch(`${BASE_URL}/absensi/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nip: email,
          jam_masuk: jam_masuk,
          tanggal: tanggal,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert("Check-in failed", data.message || "An error occurred");
        return;
      }

      const data = await response.json();
      Alert.alert(
        "Check-in successful",
        data.message || "You have checked in successfully"
      );
      setAttendanceData((prevData) => ({
        ...prevData,
        jam_masuk: jam_masuk,
      }));
    } catch (error) {
      Alert.alert("Check-in failed", "An error occurred");
      console.error("Check-in error:", error);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx <= width - 140) {
        swipePosition.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > width / 2) {
        Animated.timing(swipePosition, {
          toValue: width - 140,
          duration: 200,
          useNativeDriver: false,
        }).start(async () => {
          setSwipeStatus(!swipeStatus);
          if (!swipeStatus) {
            await handleCheckIn();
          }
          Animated.timing(swipePosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
            delay: 1000,
          }).start();
        });
      } else {
        Animated.timing(swipePosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Monyet Antariksa</Text>
          <Text style={styles.profileRole}>Lead Space Engineer</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialIcons name="notifications-none" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Date Picker Section */}
      <View style={styles.datePickerCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.datePicker, { width: width * 1.5 }]}>
            {[
              "06 Thu",
              "07 Fri",
              "08 Sat",
              "09 Sun",
              "10 Mon",
              "11 Tue",
              "12 Wed",
            ].map((date, index) => {
              const [day, weekDay] = date.split(" ");
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateButton,
                    date === "09 Sun" && styles.activeDateButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      date === "09 Sun" && styles.activeDateText,
                      { fontWeight: "bold" },
                    ]}
                  >
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      date === "09 Sun" && styles.activeDateText,
                    ]}
                  >
                    {weekDay}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Today Attendance */}
      <Text style={styles.sectionTitle}>Today Attendance</Text>
      <View style={styles.attendanceContainer}>
        <View style={styles.attendanceCard}>
          <FontAwesome5 name="sign-in-alt" size={24} color="purple" />
          <Text style={styles.cardTitle}>Check In</Text>
          <Text style={styles.cardTime}>
            {attendanceData.jam_masuk || "N/A"}
          </Text>
          <Text style={styles.cardStatus}>On Time</Text>
        </View>
        <View style={styles.attendanceCard}>
          <FontAwesome5 name="sign-out-alt" size={24} color="purple" />
          <Text style={styles.cardTitle}>Check Out</Text>
          <Text style={styles.cardTime}>
            {attendanceData.jam_keluar || "N/A"}
          </Text>
          <Text style={styles.cardStatus}>Go Home</Text>
        </View>
        <View style={styles.attendanceCard}>
          <MaterialIcons name="timer" size={24} color="purple" />
          <Text style={styles.cardTitle}>Break Time</Text>
          <Text style={styles.cardTime}>00:30 min</Text>
          <Text style={styles.cardStatus}>Avg Time 30 min</Text>
        </View>
        <View style={styles.attendanceCard}>
          <FontAwesome5 name="calendar-alt" size={24} color="purple" />
          <Text style={styles.cardTitle}>Total Days</Text>
          <Text style={styles.cardTime}>28</Text>
          <Text style={styles.cardStatus}>Working Days</Text>
        </View>
      </View>

      {/* Your Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Your Activity</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <View style={styles.activityContainer}>
        <View style={styles.activityCard}>
          <FontAwesome5 name="sign-in-alt" size={24} color="purple" />
          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Check In</Text>
            <Text style={styles.activityTime}>10:00 am</Text>
            <Text style={styles.activityDate}>April 17, 2023</Text>
          </View>
          <Text style={styles.cardStatus}>On Time</Text>
        </View>
        <View style={styles.activityCard}>
          <FontAwesome5 name="sign-in-alt" size={24} color="purple" />
          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Break In</Text>
            <Text style={styles.activityTime}>12:30 am</Text>
            <Text style={styles.activityDate}>April 17, 2023</Text>
          </View>
          <Text style={styles.cardStatus}>On Time</Text>
        </View>
      </View>

      {/* Swipe to Check In */}
      <View style={styles.swipeButtonWrapper}>
        <Animated.View
          style={[
            styles.swipeButtonContainer,
            { backgroundColor: backgroundColor },
          ]}
        >
          <Animated.View
            style={[
              styles.arrowContainer,
              { transform: [{ translateX: swipePosition }] },
            ]}
            {...panResponder.panHandlers}
          >
            <FontAwesome5 name="arrow-right" size={18} color="purple" />
          </Animated.View>
          <Text style={styles.swipeButtonText}>
            {swipeStatus ? "Swipe to Check Out" : "Swipe to Check In"}
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 14,
    color: "#6c757d",
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  datePickerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  datePicker: {
    flexDirection: "row",
  },
  dateButton: {
    width: 60, // Ensure equal width for all date boxes
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeDateButton: {
    backgroundColor: "purple",
  },
  dateText: {
    fontSize: 14,
    textAlign: "center",
    color: "#6c757d",
  },
  activeDateText: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  attendanceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  attendanceCard: {
    width: "48%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardTime: {
    fontSize: 16,
    color: "purple",
    marginTop: 5,
  },
  cardStatus: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 5,
  },
  activitySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  viewAll: {
    fontSize: 14,
    color: "purple",
  },
  activityContainer: {
    paddingHorizontal: 20,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityTime: {
    fontSize: 16,
    color: "purple",
  },
  activityDate: {
    fontSize: 14,
    color: "#6c757d",
  },
  swipeButtonWrapper: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  swipeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  arrowContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  swipeButtonText: {
    color: "#fff",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  },
});

export default AttendanceScreen;
