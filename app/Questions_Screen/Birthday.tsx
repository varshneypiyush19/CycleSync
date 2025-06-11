import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

// Arrays for pickers
const months = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, "0"),
  value: String(i + 1).padStart(2, "0"),
}));

const days = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1).padStart(2, "0"),
  value: String(i + 1).padStart(2, "0"),
}));

const years = Array.from({ length: 60 }, (_, i) => {
  const year = 1965 + i;
  return { label: String(year), value: String(year) };
});

export default function BirthdayPickerScreen() {
  const [monthIndex, setMonthIndex] = useState(8);
  const [dayIndex, setDayIndex] = useState(10);
  const [yearIndex, setYearIndex] = useState(40); // e.g. 2005

  return (
    <View style={styles.container}>
      {/* Wheel Pickers */}
      {/* <View style={styles.wheelRow}> */}
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>MM</Text>
        <WheelPickerExpo
          initialSelectedIndex={monthIndex}
          items={months}
          onChange={({ index }) => setMonthIndex(index)}
          height={400}
          width={70}
          backgroundColor="white"
          selectedStyle={styles.selectedText}
        />
      </View>
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>DD</Text>
        <WheelPickerExpo
          initialSelectedIndex={dayIndex}
          items={days}
          onChange={({ index }) => setDayIndex(index)}
          height={400}
          width={70}
          backgroundColor="white"
          selectedStyle={styles.selectedText}
        />
      </View>
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>YYYY</Text>
        <WheelPickerExpo
          initialSelectedIndex={yearIndex}
          items={years}
          onChange={({ index }) => setYearIndex(index)}
          height={400}
          width={120}
          backgroundColor="white"
          selectedStyle={styles.selectedText}
        />
      </View>
      {/* </View> */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pickerWrapper: {
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 24,
  },
  selectedText: {
    borderColor: "#EAA4FA",
    borderWidth: 3,
  },
  indicator: {
    borderTopColor: "#EAA4FA",
    borderBottomColor: "#EAA4FA",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  continueButton: {
    backgroundColor: "#EAA4FA",
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: "auto",
  },
  continueText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
