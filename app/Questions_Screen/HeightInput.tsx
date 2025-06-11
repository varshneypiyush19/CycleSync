import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const HeightInput = () => {
  const [unit, setUnit] = useState<"CM" | "FT">("CM");
  const [valueCm, setValueCm] = useState(170); // Always store the base value in cm

  const isCm = unit === "CM";

  // Calculate display value based on current unit
  const displayValue = isCm
    ? valueCm
    : parseFloat((valueCm / 30.48).toFixed(1)); // 1 ft = 30.48 cm

  const handleUnitChange = (newUnit: "CM" | "FT") => {
    if (newUnit !== unit) {
      setUnit(newUnit);
    }
  };

  const handleValueChangeEnd = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      // Always convert the input value back to cm for storage
      const newCmValue = isCm ? num : num * 30.48;
      setValueCm(parseFloat(newCmValue.toFixed(1)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isCm && styles.activeButton]}
          onPress={() => handleUnitChange("CM")}
        >
          <Text style={[styles.toggleText, isCm && styles.activeText]}>CM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isCm && styles.activeButton]}
          onPress={() => handleUnitChange("FT")}
        >
          <Text style={[styles.toggleText, !isCm && styles.activeText]}>
            FT
          </Text>
        </TouchableOpacity>
      </View>

      <RulerPicker
        key={unit} // Only reset when unit changes
        min={0}
        max={isCm ? 250 : 8.2} // 250cm = ~8.2ft
        step={isCm ? 1 : 0.1}
        fractionDigits={isCm ? 0 : 1}
        initialValue={displayValue}
        onValueChangeEnd={handleValueChangeEnd}
        unit={unit}
        indicatorColor="#EAA4FA"
        stepWidth={4}
        shortStepHeight={40}
        longStepHeight={80}
        unitTextStyle={{ fontSize: 22, fontWeight: "bold" }}
        valueTextStyle={{ fontSize: 30, fontWeight: "bold" }}
      />
    </View>
  );
};

export default HeightInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "#EAA4FA",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  toggleText: {
    color: "#EAA4FA",
    fontWeight: "600",
  },
  activeButton: {
    backgroundColor: "#EAA4FA",
  },
  activeText: {
    color: "#fff",
  },
  heightDisplay: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#EAA4FA",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    position: "absolute",
    bottom: 40,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
