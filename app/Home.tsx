// import { Ionicons } from "@expo/vector-icons"; // Icon package
// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AgeInput from "./Questions_Screen/Age";
// import KnownConditionsScreen from "./Questions_Screen/ConditionsOrHistory";
// import CycleRegularity from "./Questions_Screen/CycleRegularity";
// import DailyRemindersScreen from "./Questions_Screen/DailyReminder";
// import HealthGoalsScreen from "./Questions_Screen/HealthGoal";
// import Language from "./Questions_Screen/Language";
// import LastPeriodDate from "./Questions_Screen/LastPeriodDate";
// import NameInput from "./Questions_Screen/NameInput";
// import PeriodLength from "./Questions_Screen/PeriodLength";

// const questions = [
//   { type: "language", question: "Select your preferred language" },
//   { type: "name", question: "What is your name ?" },
//   { type: "age", question: "How old are you ?" },
//   { type: "lastPeriod", question: "When did your last Period start ?" },
//   {
//     type: "periodLength",
//     question: "How long does your period usually last ?",
//   },
//   {
//     type: "cycleRegularity",
//     question: "How regular are your periods?",
//   },
//   {
//     type: "healthGoal",
//     question: "What do you want help with? (Select all that apply)",
//   },

//   {
//     type: "ConditionsOrHistory",
//     question: "Do you have or suspect any of the following?",
//   },
//   {
//     type: "dailyReminders",
//     question: "Would you like daily reminders and wellness tips?",
//   },

//   // { type: "birthday", question: "When is your Birthday ?" },
//   // { type: "weight", question: "What is your Weight ?" },
//   // { type: "height", question: "How tall are you ?" },
//   // { type: "periodLasts", question: "How long does your Period usually last ?" },
//   // { type: "cycleLasts", question: "How long does your Cycle usually last ?" },
// ];

// export default function QuestionFlow() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState(Array(questions.length).fill(""));
//   const [inputValue, setInputValue] = useState(answers[0] || "");
//   const current = questions[currentIndex];
//   const totalQuestions = questions.length;
//   const progress = (currentIndex + 1) / totalQuestions;

//   const handleAnswer = () => {
//     const updated = [...answers];
//     updated[currentIndex] = inputValue.trim();
//     setAnswers(updated);

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setInputValue(updated[currentIndex + 1] || ""); // Load next answer if exists
//     } else {
//       console.log("User Responses:", updated);
//       // Navigate or save final answers
//     }
//   };

//   const handleBack = () => {
//     if (currentIndex > 0) {
//       const prevIndex = currentIndex - 1;
//       setCurrentIndex(prevIndex);
//       setInputValue(answers[prevIndex] || "");
//     }
//   };

//   const renderQuestionComponent = () => {
//     switch (current.type) {
//       case "language":
//         return <Language />;
//       case "name":
//         return <NameInput inputValue={answers[currentIndex]} setInputValue />;
//       case "age":
//         return <AgeInput inputValue={answers[currentIndex]} setInputValue />;
//       case "lastPeriod":
//         return <LastPeriodDate />;
//       case "periodLength":
//         return <PeriodLength />;
//       case "cycleRegularity":
//         return <CycleRegularity />;
//       case "healthGoal":
//         return <HealthGoalsScreen />;
//       case "ConditionsOrHistory":
//         return <KnownConditionsScreen />;
//       case "dailyReminders":
//         return <DailyRemindersScreen />;
//       // case "cycleLasts":
//       //   return (
//       //     <CycleLasts
//       //     // question={current.question}
//       //     // initialValue={answers[currentIndex]}
//       //     // onSubmit={handleAnswer}
//       //     />
//       //   );
//       // case "periodLasts":
//       //   return (
//       //     <PeriodLasts
//       //     // question={current.question}
//       //     // initialValue={answers[currentIndex]}
//       //     // onSubmit={handleAnswer}
//       //     />
//       //   );
//       // case "birthday":
//       //   return (
//       //     <BirthdayPickerScreen
//       //     // question={current.question}
//       //     // initialValue={answers[currentIndex]}
//       //     // onSubmit={handleAnswer}
//       //     />
//       //   );
//       // case "weight":
//       //   return (
//       //     <WeightInput
//       //     // question={current.question}
//       //     // initialValue={answers[currentIndex]}
//       //     // onSubmit={handleAnswer}
//       //     />
//       //   );
//       // case "height":
//       //   return (
//       //     <HeightInput
//       //     // question={current.question}
//       //     // initialValue={answers[currentIndex]}
//       //     // onSubmit={handleAnswer}
//       //     />
//       //   );
//       default:
//         return null;
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <View style={styles.container}>
//         <View style={styles.topBar}>
//           {/* Back Arrow */}
//           <View style={styles.backArrow}>
//             {currentIndex > 0 && (
//               <TouchableOpacity onPress={handleBack}>
//                 <Ionicons name="arrow-back" size={28} color="#333" />
//               </TouchableOpacity>
//             )}
//           </View>
//           {/* Progress Bar */}
//           <View style={styles.progressContainer}>
//             <View
//               style={[styles.progressBar, { width: `${progress * 100}%` }]}
//             />
//           </View>

//           <Text style={styles.progressText}>
//             {currentIndex + 1}/{totalQuestions}
//           </Text>
//         </View>
//         <View style={{ flex: 1 }}>
//           {/* Question */}
//           <View style={{ alignItems: "center", justifyContent: "center" }}>
//             <Text style={styles.questionText}>{current.question}</Text>
//           </View>
//           <View
//             style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//           >
//             {renderQuestionComponent()}
//           </View>
//         </View>

//         {/* Answer Button */}
//         <View style={{ alignItems: "center" }}>
//           <TouchableOpacity style={styles.button} onPress={handleAnswer}>
//             <Text style={styles.buttonText}>
//               {currentIndex === questions.length - 1 ? "Finish" : "Continue"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     paddingTop: 48,
//     backgroundColor: "#fff",
//   },
//   topBar: {
//     marginBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     gap: 12,
//     height: 28,
//   },
//   backArrow: {
//     width: 24,
//   },
//   progressContainer: {
//     flex: 1,
//     height: 20,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 50,
//     overflow: "hidden",
//   },
//   progressBar: {
//     height: "100%",
//     backgroundColor: "#EAA4FA",
//   },
//   progressText: {
//     fontSize: 14,
//     textAlign: "right",
//     color: "#666",
//   },
//   questionText: {
//     marginTop: 20,
//     marginHorizontal: 30,
//     fontSize: 26,
//     marginBottom: 20,
//     fontWeight: "500",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 24,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#EAA4FA",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     width: 180,
//     borderRadius: 50,
//     marginBottom: "20%",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AgeInput from "./Questions_Screen/Age";
import KnownConditionsScreen from "./Questions_Screen/ConditionsOrHistory";
import CycleRegularity from "./Questions_Screen/CycleRegularity";
import DailyRemindersScreen from "./Questions_Screen/DailyReminder";
import HealthGoalsScreen from "./Questions_Screen/HealthGoal";
import Language from "./Questions_Screen/Language";
import LastPeriodDate from "./Questions_Screen/LastPeriodDate";
import NameInput from "./Questions_Screen/NameInput";
import PeriodLength from "./Questions_Screen/PeriodLength";
import AsyncStorage from "@react-native-async-storage/async-storage";

const questions = [
  { type: "language", question: "Select your preferred language" },
  { type: "name", question: "What is your name ?" },
  { type: "age", question: "How old are you ?" },
  { type: "lastPeriod", question: "When did your last Period start ?" },
  {
    type: "periodLength",
    question: "How long does your period usually last ?",
  },
  { type: "cycleRegularity", question: "How regular are your periods?" },
  {
    type: "healthGoal",
    question: "What do you want help with? (Select all that apply)",
  },
  {
    type: "ConditionsOrHistory",
    question: "Do you have or suspect any of the following?",
  },
  {
    type: "dailyReminders",
    question: "Would you like daily reminders and wellness tips?",
  },
];

export default function QuestionFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const current = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex + 1) / totalQuestions;

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      if (hasOnboarded === "true") {
        router.replace("/Main");
      }
    };
    checkOnboardingStatus();
  }, []);

  const handleAnswer = async () => {
    // Make the function async
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = inputValue;
    setAnswers(updatedAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue(updatedAnswers[currentIndex + 1] || "");
    } else {
      // This is the "Finish" logic
      setLoading(true);

      try {
        // 1. Get the authentication token from storage
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          // This should ideally not happen if the user flow is correct
          throw new Error(
            "Authentication token not found. Please log in again."
          );
        }

        // 2. Make the authenticated request to the backend
        const response = await fetch(
          "http://192.168.1.39:8000/api/v1/user/submit",
          {
            method: "POST",
            // 3. Add the Authorization header with the token
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedAnswers),
          }
        );

        const data = await response.json();

        // 4. Check if the backend responded with an error (e.g., 401, 500)
        if (!response.ok) {
          throw new Error(
            data.message || "Something went wrong on the server."
          );
        }

        // 5. Success! The data was saved.
        // The hasOnboarded flag is not needed if we rely on the backend data check
        // await AsyncStorage.setItem("hasOnboarded", "true");

        console.log("✅ Questionnaire saved successfully!");
        router.replace("/Main"); // Use replace so user can't go back to questions
      } catch (err) {
        console.error("❌ Failed to save questionnaire:", err);
        Alert.alert("Submission Error", err.message);
      } finally {
        setLoading(false); // Hide loading indicator in all cases
      }
    }
  };
  // const handleAnswer = () => {
  //   const updated = [...answers];
  //   updated[currentIndex] = inputValue;
  //   setAnswers(updated);

  //   if (currentIndex < totalQuestions - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //     setInputValue(updated[currentIndex + 1] || "");
  //   } else {
  //     setLoading(true);
  //     fetch("http://192.168.1.39:8000/api/v1/user/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updated),
  //     })
  //       .then((res) => res.json())
  //       .then(async (data) => {
  //         await AsyncStorage.setItem("hasOnboarded", "true");
  //         setLoading(false); // Hide loading
  //         router.push("/Main");
  //         router.push({
  //           pathname: "/Main",
  //           params: { answers: JSON.stringify(updated) },
  //         });
  //       })
  //       .catch((err) => {
  //         setLoading(false); // Hide loading
  //         console.error("❌ Failed to save questionnaire:", err);
  //       });
  //   }
  // };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setInputValue(answers[prevIndex] || "");
    }
  };

  const renderQuestionComponent = () => {
    switch (current.type) {
      case "language":
        return (
          <Language inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "name":
        return (
          <NameInput inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "age":
        return (
          <AgeInput inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "lastPeriod":
        return (
          <LastPeriodDate
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "periodLength":
        return (
          <PeriodLength inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "cycleRegularity":
        return (
          <CycleRegularity
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "healthGoal":
        return (
          <HealthGoalsScreen
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "ConditionsOrHistory":
        return (
          <KnownConditionsScreen
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "dailyReminders":
        return (
          <DailyRemindersScreen
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      default:
        return null;
    }
  };
  if (loading)
    return (
      <Modal transparent={true} animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#EAA4FA" />
          <Text style={{ marginTop: 10, color: "#666" }}>
            Saving your data...
          </Text>
        </View>
      </Modal>
    );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.backArrow}>
            {currentIndex > 0 && (
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={28} color="#333" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>

        {/* Question and Input */}
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.questionText}>{current.question}</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {renderQuestionComponent()}
          </View>
        </View>

        {/* Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>
              {currentIndex === totalQuestions - 1 ? "Finish" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    backgroundColor: "#fff",
  },
  topBar: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
    height: 28,
  },
  backArrow: {
    width: 24,
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#EAA4FA",
  },
  progressText: {
    fontSize: 14,
    textAlign: "right",
    color: "#666",
  },
  questionText: {
    marginTop: 20,
    marginHorizontal: 30,
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#EAA4FA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 180,
    borderRadius: 50,
    marginBottom: "20%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
