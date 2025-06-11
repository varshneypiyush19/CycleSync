import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const PeriodLasts = () => {
  const [selectedIndex, setSelectedIndex] = useState(4); // default: 5 days
  const pickerRef = useRef(null);

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const handleValueChange = (data: string | undefined, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollPicker
        ref={pickerRef}
        dataSource={days}
        selectedIndex={selectedIndex}
        renderItem={(data, index) => (
          <Text style={styles.itemText}>{data}</Text>
        )}
        onValueChange={handleValueChange}
        wrapperBackground="#fff"
        itemHeight={80}
        highlightColor="#EAA4FA"
        highlightBorderWidth={2}
        activeItemTextStyle={{ color: "#EAA4FA", fontSize: 50 }}
        itemTextStyle={{ color: "#999", fontSize: 40 }}
      />
    </View>
  );
};

export default PeriodLasts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  itemText: {
    textAlign: "center",
    fontSize: 30,
  },
  selection: {
    marginTop: 20,
    fontSize: 18,
    color: "#444",
  },
});
