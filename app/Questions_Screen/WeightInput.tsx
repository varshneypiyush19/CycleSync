import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

const WeightInput = () => {
  const [unit, setUnit] = useState<"Kg" | "Lb">("Kg");
  const [valueKg, setValueKg] = useState(60); // Always store the base value in kg

  const isKg = unit === "Kg";

  // Calculate display value based on current unit
  const displayValue = isKg
    ? valueKg
    : parseFloat((valueKg * 2.20462).toFixed(1));

  const handleUnitChange = (newUnit: "Kg" | "Lb") => {
    if (newUnit !== unit) {
      setUnit(newUnit);
    }
  };

  const handleValueChangeEnd = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      // Always convert the input value back to kg for storage
      const newKgValue = isKg ? num : num / 2.20462;
      setValueKg(parseFloat(newKgValue.toFixed(1)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isKg && styles.activeButton]}
          onPress={() => handleUnitChange("Kg")}
        >
          <Text style={[styles.toggleText, isKg && styles.activeText]}>KG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isKg && styles.activeButton]}
          onPress={() => handleUnitChange("Lb")}
        >
          <Text style={[styles.toggleText, !isKg && styles.activeText]}>
            Lb
          </Text>
        </TouchableOpacity>
      </View>

      <RulerPicker
        key={unit} // Only reset when unit changes
        min={0}
        max={isKg ? 240 : 530}
        step={0.5}
        fractionDigits={1}
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

export default WeightInput;

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
  weightDisplay: {
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
