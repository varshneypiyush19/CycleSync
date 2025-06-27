// import { useLocalSearchParams } from "expo-router";
// import { Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function MainScreen() {
//   const { answers } = useLocalSearchParams();
//   const parsedAnswers = answers ? JSON.parse(answers) : [];

//   // console.log("Received Answers:", parsedAnswers);

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         paddingTop: 100,
//         // backgroundColor: "black",
//       }}
//     >
//       <View>
//         <Text>Main page Home Screen </Text>
//         {parsedAnswers.map((answer, index) => (
//           <Text key={index} style={{ marginBottom: 10 }}>
//             {typeof answer === "string" || typeof answer === "number"
//               ? answer
//               : Array.isArray(answer)
//               ? answer.join(", ")
//               : JSON.stringify(answer)}
//           </Text>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// }

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Import the router

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const calculateCyclePhase = (lastPeriodDateStr, cycleLength = 28) => {
  if (!lastPeriodDateStr) {
    return { phase: "Unknown", day: 0 };
  }

  const lastPeriodDate = new Date(lastPeriodDateStr);
  const today = new Date();

  // Calculate days since the last period started
  const diffTime = Math.abs(today - lastPeriodDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentDayOfCycle = diffDays % cycleLength || cycleLength;

  // Simplified phase calculation (you can adjust these ranges)
  // These are typical ranges for a 28-day cycle.
  const menstrualEnd = 5; // Day 1-5: Menstrual Phase
  const follicularEnd = 13; // Day 6-13: Follicular Phase
  const ovulationEnd = 15; // Day 14-15: Ovulation
  // Day 16-28: Luteal Phase

  if (currentDayOfCycle <= menstrualEnd) {
    return { phase: "Menstrual Phase", day: currentDayOfCycle };
  } else if (currentDayOfCycle <= follicularEnd) {
    return {
      phase: "Follicular Phase",
      day: currentDayOfCycle - menstrualEnd,
    };
  } else if (currentDayOfCycle <= ovulationEnd) {
    return { phase: "Ovulation", day: currentDayOfCycle - follicularEnd };
  } else {
    return { phase: "Luteal Phase", day: currentDayOfCycle - ovulationEnd };
  }
};

export default function MainScreen() {
  const router = useRouter(); // Initialize the router

  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'success'
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phase: "",
    phaseDay: 0,
  });
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [userData, setUserData] = useState({
  //   name: "User",
  //   phase: "Loading...",
  //   phaseDay: 0,
  // });

  const symptoms = "Tired"; // This can also be fetched if stored

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Get the authentication token (assuming you saved it after login)
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Token:", token); // Debugging line to check token
        if (!token) {
          // If no token, user is not logged in. Redirect to login.
          router.replace("/Login");
          return;
        }

        // 2. Fetch data from the backend
        const response = await fetch(
          "http://192.168.1.39:8000/api/v1/user/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 404) {
          console.log("Redirecting to questionnaire screen...");
          router.replace("/Home");
          return; // Stop further execution
        }
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch data.");
        }

        // 3. Calculate the cycle phase
        const { lastPeriod, cycleRegularity } = result.data.questionnaire;
        const cycleInfo = calculateCyclePhase(
          lastPeriod,
          parseInt(cycleRegularity) || 28
        );

        // 4. Update the component's state
        setUserData({
          name: result.data.username,
          phase: cycleInfo.phase,
          phaseDay: cycleInfo.day,
        });
        setStatus("success"); // Set status to error
      } catch (err) {
        console.error("Failed to load user data:", err);
        setErrorMessage(err.message);
        setStatus("error"); // Set status to error
      }
      //  catch (err) {
      //   console.error("Failed to load user data:", err);
      //   setError(err.message);
      //   setUserData({ name: "Error", phase: "Could not load", phaseDay: 0 });
      // } finally {
      //   setIsLoading(false);
      // }
    };

    fetchUserData();
  }, []); // The empty array [] means this effect runs once when the component mounts
  if (status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#a01aa0" />
        <Text>Loading your data...</Text>
      </SafeAreaView>
    );
  }
  if (status === "error") {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text>Error: {error}</Text>
        <Text>Please try logging in again.</Text>
      </SafeAreaView>
    );
  }
  // const userName = "Anam";
  // const currentPhase = "Luteal Phase";
  // const currentPhaseDay = 6;
  // const symptoms = "Tired";

  // Helper function to calculate the current cycle phase
  if (status === "success") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <TouchableOpacity>
                <View style={styles.profileCircle}>
                  <Text style={styles.profileInitial}>{userData.name[0]}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                {/* <Ionicons name="chevron-down" size={20} /> */}
                <Text style={styles.headerText}>Hello, {userData.name}</Text>
                <Text style={{ fontSize: 24 }}>Have a nice day!</Text>
              </View>
            </View>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>

          {/* Month Selector */}
          <View style={styles.monthRow}>
            <Text style={styles.monthText}>June 2025</Text>
            <Ionicons name="chevron-down" size={20} />
          </View>

          {/* Calendar */}
          <View style={styles.calendarRow}>
            {["14", "15", "16", "17", "18", "19", "20"].map((day, index) => (
              <View
                key={index}
                style={[
                  styles.calendarDay,
                  day === "16" && styles.activeCalendarDay,
                ]}
              >
                <Text
                  style={[
                    styles.calendarDayText,
                    day === "16" && styles.activeCalendarDayText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Cycle/Symptom Inputs */}
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputButtonText}>Input Cycle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="sad-outline" size={16} color="black" />
              <Text style={styles.inputButtonText}> {symptoms}</Text>
            </TouchableOpacity>
          </View>

          {/* Current Phase */}
          <View style={styles.phaseContainer}>
            <View style={styles.phaseCircle}>
              <Text style={styles.phaseText}>
                {userData.phase}
                {"\n"}DAY {userData.phaseDay}
                {/* {currentPhase}
              {"\n"}DAY {currentPhaseDay} */}
              </Text>
            </View>
          </View>

          {/* Advice Cards */}
          <View style={styles.cardsContainer}>
            {/* Diet */}
            <View style={[styles.card, styles.orangeCard]}>
              <Text style={styles.cardTitle}>🍽️ DIET</Text>
              <Text style={styles.cardText}>
                Take more magnesium-rich foods or supplements, avoid salty food.
                Add complex carbs and healthy fats.
              </Text>
            </View>
            {/* Fitness */}
            <View style={[styles.card, styles.yellowCard]}>
              <Text style={styles.cardTitle}>🏃 FITNESS</Text>
              <Text style={styles.cardText}>
                Engage in light activities like yoga, stretching or walking to
                help ease cramps and boost your mood during your period.
              </Text>
            </View>
            {/* Mood */}
            <View style={[styles.card, styles.greenCard]}>
              <Text style={styles.cardTitle}>😊 MOOD</Text>
              <Text style={styles.cardText}>
                Do activities you enjoy, like listening or watching something
                you like to feel better during your period.
              </Text>
            </View>
            {/* Productivity */}
            <View style={[styles.card, styles.pinkCard]}>
              <Text style={styles.cardTitle}>💼 PRODUCTIVITY</Text>
              <Text style={styles.cardText}>
                Prioritize tasks and focus on smaller, manageable goals to stay
                productive while honoring your body{"'"}s needs during your
                period.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Tab */}
        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={20} color="rgba(254, 154, 240, 1)" />
            <Text style={styles.tabItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color="rgba(254, 154, 240, 1)"
            />
            <Text style={styles.tabItemText}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <FontAwesome5
              name="users"
              size={20}
              color="rgba(254, 154, 240, 1)"
            />
            <Text style={styles.tabItemText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons
              name="chart-line"
              size={20}
              color="rgba(254, 154, 240, 1)"
            />
            <Text style={styles.tabItemText}>Predictions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={async () => {
              await AsyncStorage.removeItem("accessToken");
              router.replace("/Login");
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Fallback, should not be reached if logic is correct
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcd6f9",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
  },
  monthRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCalendarDay: {
    backgroundColor: "#e75480",
  },
  calendarDayText: {
    color: "black",
  },
  activeCalendarDayText: {
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  inputButtonText: {
    color: "black",
    fontSize: 14,
  },
  phaseContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  phaseCircle: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: "rgba(133, 82, 239, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  phaseText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  cardsContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orangeCard: {
    backgroundColor: "#ffe5b4",
  },
  yellowCard: {
    backgroundColor: "#fff9c4",
  },
  greenCard: {
    backgroundColor: "#d0f0c0",
  },
  pinkCard: {
    backgroundColor: "#f8c8dc",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 18,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  tabItem: {
    alignItems: "center",
  },
  tabItemText: {
    fontSize: 12,
    marginTop: 4,
    color: "rgba(254, 154, 240, 1)",
  },
  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 50,
    backgroundColor: "#a01aa0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// const [loading, setLoading] = useState(true);
// const [userProfile, setUserProfile] = useState(null);
// const [questionAnswers, setQuestionAnswers] = useState(null);

// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId"); // you should have saved this earlier
//       if (!userId) {
//         console.warn("No userId found in AsyncStorage");
//         return;
//       }
//       const profileResponse = await fetch(
//         `http://192.168.1.39:8000/api/v1/user/${userId}`
//       );
//       const profileData = await profileResponse.json();
//       setUserProfile(profileData);

//       // fetch onboarding questionnaire answers
//       const questionResponse = await fetch(
//         `http://192.168.1.39:8000/api/v1/question/${userId}`
//       );
//       const questionData = await questionResponse.json();
//       setQuestionAnswers(questionData);
//       // const response = await fetch(
//       //   `http://192.168.1.39:8000/api/v1/user/${userId}`
//       // );
//       // const data = await response.json();
//       // setUserData(data);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUserData();
// }, []);

// if (loading) {
//   return (
//     <SafeAreaView style={styles.centeredContainer}>
//       <ActivityIndicator size="large" color="#800080" />
//     </SafeAreaView>
//   );
// }

// if (!userProfile || !questionAnswers) {
//   return (
//     <SafeAreaView style={styles.centeredContainer}>
//       <Text style={{ fontSize: 16 }}>No data found for this user.</Text>
//     </SafeAreaView>
//   );
// }
// Destructure user data
// const userName = userProfile.username || "Guest";
// const currentPhase = "Luteal Phase"; // you can calculate this based on period dates if needed
// const currentPhaseDay = 6; // same as above, calculate if you want
// const symptoms = "Tired";
