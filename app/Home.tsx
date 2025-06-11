import { Ionicons } from "@expo/vector-icons"; // Icon package
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BirthdayPickerScreen from "./Questions_Screen/Birthday";
import CycleLasts from "./Questions_Screen/CycleLasts";
import HeightInput from "./Questions_Screen/HeightInput";
import LastPeriodDate from "./Questions_Screen/LastPeriodDate";
import NameInput from "./Questions_Screen/NameInput";
import PeriodLasts from "./Questions_Screen/PeriodLasts";
import WeightInput from "./Questions_Screen/WeightInput";

const questions = [
  { type: "name", question: "What is your name ?" },
  { type: "birthday", question: "When is your Birthday ?" },
  { type: "weight", question: "What is your Weight ?" },
  { type: "height", question: "How tall are you ?" },
  { type: "periodLasts", question: "How long does your Period usually last ?" },
  { type: "cycleLasts", question: "How long does your Cycle usually last ?" },
  { type: "lastPeriod", question: "When did your last Period start ?" },
];

export default function QuestionFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState(answers[0] || "");

  const current = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex + 1) / totalQuestions;

  // console.log(
  //   current.question,
  //   current.type,
  //   currentIndex,
  //   // inputValue,
  //   totalQuestions
  //   // progress
  // );
  const handleAnswer = () => {
    const updated = [...answers];
    updated[currentIndex] = inputValue.trim();
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue(updated[currentIndex + 1] || ""); // Load next answer if exists
    } else {
      console.log("User Responses:", updated);
      // Navigate or save final answers
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setInputValue(answers[prevIndex] || "");
    }
  };

  const renderQuestionComponent = () => {
    switch (current.type) {
      case "name":
        return (
          <NameInput
            inputValue={answers[currentIndex]}
            setInputValue
            // onSubmit={handleAnswer}
          />
        );
      case "birthday":
        return (
          <BirthdayPickerScreen
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      case "weight":
        return (
          <WeightInput
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      case "height":
        return (
          <HeightInput
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      case "periodLasts":
        return (
          <PeriodLasts
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      case "cycleLasts":
        return (
          <CycleLasts
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      case "lastPeriod":
        return (
          <LastPeriodDate
          // question={current.question}
          // initialValue={answers[currentIndex]}
          // onSubmit={handleAnswer}
          />
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          {/* Back Arrow */}
          <View style={styles.backArrow}>
            {currentIndex > 0 && (
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={28} color="#333" />
              </TouchableOpacity>
            )}
          </View>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>

          <Text style={styles.progressText}>
            {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* Question */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.questionText}>{current.question}</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {renderQuestionComponent()}
          </View>
        </View>

        {/* Answer Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>
              {currentIndex === questions.length - 1 ? "Finish" : "Continue"}
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
    // marginBottom: 12,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#EAA4FA",
  },
  progressText: {
    fontSize: 14,
    textAlign: "right",
    // marginBottom: 24,
    color: "#666",
  },
  questionText: {
    marginTop: 20,
    marginHorizontal: 30,
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
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
});
