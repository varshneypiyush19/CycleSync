// // import React, { useRef, useState } from "react";
// // import { StyleSheet, Text, View } from "react-native";
// // import ScrollPicker from "react-native-wheel-scrollview-picker";

// // const CycleLasts = () => {
// //   const [selectedIndex, setSelectedIndex] = useState(26); // default: 5 days
// //   const pickerRef = useRef(null);

// //   const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

// //   const handleValueChange = (data: string | undefined, index: number) => {
// //     setSelectedIndex(index);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <ScrollPicker
// //         ref={pickerRef}
// //         dataSource={days}
// //         selectedIndex={selectedIndex}
// //         onValueChange={handleValueChange}
// //         wrapperBackground="#fff"
// //         itemHeight={80}
// //         highlightColor="#EAA4FA"
// //         highlightBorderWidth={4}
// //         renderItem={(data, index) => (
// //           <View style={{ height: 80, justifyContent: "center" }}>
// //             <Text
// //               style={[
// //                 styles.itemText,
// //                 index === selectedIndex
// //                   ? styles.activeItem
// //                   : styles.inactiveItem,
// //               ]}
// //             >
// //               {data}
// //               {index === selectedIndex ? " Days" : ""}
// //             </Text>
// //           </View>
// //         )}
// //       />
// //     </View>
// //   );
// // };
// // export default CycleLasts;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //     marginVertical: 30,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     marginBottom: 40,
// //     paddingHorizontal: 20,
// //     textAlign: "center",
// //   },
// //   itemText: {
// //     textAlign: "center",
// //     fontSize: 30,
// //   },
// //   selection: {
// //     marginTop: 20,
// //     fontSize: 18,
// //     color: "#444",
// //   },
// //   activeItem: {
// //     fontSize: 50,
// //     color: "#EAA4FA",
// //     fontWeight: "bold",
// //   },
// //   inactiveItem: {
// //     fontSize: 40,
// //     color: "#999",
// //   },
// // });
// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import ScrollPicker from "react-native-wheel-scrollview-picker";

// const CycleLasts = () => {
//   const [selectedType, setSelectedType] = useState<"regular" | "irregular">(
//     "regular"
//   );
//   const [regularIndex, setRegularIndex] = useState(26);
//   const [irregularStartIndex, setIrregularStartIndex] = useState(24);
//   const [irregularEndIndex, setIrregularEndIndex] = useState(29);

//   const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

//   const renderPicker = (
//     selectedIndex: number,
//     onChange: (val: string | undefined, index: number) => void
//   ) => (
//     <ScrollPicker
//       dataSource={days}
//       selectedIndex={selectedIndex}
//       onValueChange={onChange}
//       wrapperBackground="#fff"
//       itemHeight={80}
//       highlightColor="#EAA4FA"
//       highlightBorderWidth={4}
//       style={{ marginHorizontal: 10 }}
//       renderItem={(data, index) => (
//         <View style={{ height: 80, justifyContent: "center" }}>
//           <Text
//             style={[
//               styles.itemText,
//               index === selectedIndex ? styles.activeItem : styles.inactiveItem,
//             ]}
//           >
//             {data}
//             {index === selectedIndex ? " Days" : ""}
//           </Text>
//         </View>
//       )}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       {/* Toggle Buttons */}
//       <View style={styles.toggleContainer}>
//         {["regular", "irregular"].map((type) => (
//           <TouchableOpacity
//             key={type}
//             onPress={() => setSelectedType(type as "regular" | "irregular")}
//             style={[
//               styles.toggleButton,
//               selectedType === type && styles.toggleButtonSelected,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.toggleText,
//                 selectedType === type && styles.toggleTextSelected,
//               ]}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Show Pickers */}
//       {selectedType === "regular" ? (
//         renderPicker(regularIndex, (_, i) => setRegularIndex(i))
//       ) : (
//         <View style={styles.irregularPickers}>
//           {renderPicker(irregularStartIndex, (_, i) =>
//             setIrregularStartIndex(i)
//           )}
//           {renderPicker(irregularEndIndex, (_, i) => setIrregularEndIndex(i))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default CycleLasts;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#fff",
//     marginVertical: 30,
//   },
//   itemText: {
//     textAlign: "center",
//     fontSize: 30,
//   },
//   activeItem: {
//     fontSize: 50,
//     color: "#EAA4FA",
//     fontWeight: "bold",
//   },
//   inactiveItem: {
//     fontSize: 40,
//     color: "#999",
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//     gap: 10,
//   },
//   toggleButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     borderWidth: 1,
//     marginRight: 50,
//     borderColor: "#EAA4FA",
//   },
//   toggleButtonSelected: {
//     backgroundColor: "#EAA4FA",
//   },
//   toggleText: {
//     fontSize: 16,
//     color: "#EAA4FA",
//   },
//   toggleTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   irregularPickers: {
//     flexDirection: "row",
//     justifyContent: "center",
//     width: "100%",
//   },
// });
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const CycleLasts = () => {
  const [selectedType, setSelectedType] = useState<"regular" | "irregular">(
    "regular"
  );
  const [regularIndex, setRegularIndex] = useState(26);
  const [irregularStartIndex, setIrregularStartIndex] = useState(24);
  const [irregularEndIndex, setIrregularEndIndex] = useState(27);

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const renderPicker = (
    selectedIndex: number,
    onChange: (val: string | undefined, index: number) => void
  ) => (
    <ScrollPicker
      dataSource={days}
      selectedIndex={selectedIndex}
      onValueChange={onChange}
      wrapperBackground="#fff"
      itemHeight={70}
      highlightColor="#EAA4FA"
      highlightBorderWidth={3}
      // style={{ width: 10 }}
      renderItem={(data, index) => (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Text
            style={[
              styles.itemText,
              index === selectedIndex ? styles.activeItem : styles.inactiveItem,
            ]}
          >
            {data}
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedType === "regular" && styles.toggleButtonSelected,
          ]}
          onPress={() => setSelectedType("regular")}
        >
          <Text
            style={[
              styles.toggleText,
              selectedType === "regular" && styles.toggleTextSelected,
            ]}
          >
            Regular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedType === "irregular" && styles.toggleButtonSelected,
          ]}
          onPress={() => setSelectedType("irregular")}
        >
          <Text
            style={[
              styles.toggleText,
              selectedType === "irregular" && styles.toggleTextSelected,
            ]}
          >
            Irregular
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pickers */}
      {selectedType === "regular" ? (
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            width: 150,
            justifyContent: "center",
            marginLeft: 40,
          }}
        >
          {renderPicker(regularIndex, (_, i) => setRegularIndex(i))}
          <Text style={styles.daysLabel}>Days</Text>
        </View>
      ) : (
        <View style={styles.irregularRow}>
          {renderPicker(irregularStartIndex, (_, i) =>
            setIrregularStartIndex(i)
          )}
          <Text style={styles.dash}>–</Text>
          {renderPicker(irregularEndIndex, (_, i) => setIrregularEndIndex(i))}
          <Text style={styles.daysLabel}>Days</Text>
        </View>
      )}
    </View>
  );
};

export default CycleLasts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EAA4FA",
  },
  toggleButtonSelected: {
    backgroundColor: "#EAA4FA",
  },
  toggleText: {
    fontSize: 16,
    color: "#EAA4FA",
  },
  toggleTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  irregularRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dash: {
    fontSize: 40,
    fontWeight: "600",
    marginHorizontal: 10,
    color: "#EAA4FA",
  },
  daysLabel: {
    fontSize: 18,
    color: "#888",
    marginLeft: 5,
  },
  itemText: {
    textAlign: "center",
    fontSize: 22,
  },
  activeItem: {
    fontSize: 32,
    color: "#EAA4FA",
    fontWeight: "bold",
  },
  inactiveItem: {
    fontSize: 24,
    color: "#777",
  },
  continueButton: {
    backgroundColor: "#EAA4FA",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    position: "absolute",
    bottom: 40,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
