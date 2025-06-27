// import React, { useState } from "react";
// import { Dimensions, StyleSheet, View } from "react-native";
// import { CalendarList } from "react-native-calendars";

// const screenWidth = Dimensions.get("window").width;

// type MarkedDate = {
//   selected: boolean;
//   marked: boolean;
//   customStyles: {
//     container: object;
//     text: object;
//   };
// };

// const LastPeriodDate = () => {
//   const [selectedDates, setSelectedDates] = useState<
//     Record<string, MarkedDate>
//   >({});

//   const handleDayPress = (day: { dateString: string }) => {
//     const { dateString } = day;
//     const alreadySelected = selectedDates[dateString];
//     const updated = { ...selectedDates };

//     if (alreadySelected) {
//       delete updated[dateString];
//     } else {
//       updated[dateString] = {
//         selected: true,
//         marked: true,
//         customStyles: {
//           container: {
//             backgroundColor: "#fff",
//             borderWidth: 1,
//             borderColor: "#ccc",
//             borderRadius: 100,
//           },
//           text: {
//             color: "#000",
//           },
//         },
//       };
//     }
//     setSelectedDates(updated);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Back and Progress */}
//       <CalendarList
//         current={new Date().toISOString().split("T")[0]}
//         pastScrollRange={1}
//         futureScrollRange={0}
//         scrollEnabled={true}
//         showScrollIndicator={false}
//         markingType={"custom"}
//         markedDates={selectedDates}
//         onDayPress={handleDayPress}
//         theme={{
//           calendarBackground: "#FFF4F4",
//           textMonthFontWeight: "bold",
//           textDayFontSize: 16,
//           textDayHeaderFontSize: 14,
//           textSectionTitleColor: "#000",
//           todayTextColor: "#EAA4FA",
//           arrowColor: "#000",
//         }}
//         style={styles.calendar}
//       />
//     </View>
//   );
// };

// export default LastPeriodDate;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     marginHorizontal: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   stepText: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//     color: "#000",
//   },
//   calendar: {
//     borderRadius: 16,
//     overflow: "hidden",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     margin: 20,
//   },
// });
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";

const LastPeriodDate = ({ inputValue, setInputValue }) => {
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    if (inputValue) {
      // Pre-fill selected date when going back
      setSelectedDates({
        [inputValue]: {
          selected: true,
          marked: true,
          customStyles: {
            container: {
              backgroundColor: "#fff",
              borderColor: "#EAA4FA",
              borderWidth: 1.5,
              borderRadius: 999,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
            },
            text: {
              color: "#000",
              fontWeight: "bold",
            },
          },
        },
      });
    }
  }, [inputValue]);

  // const handleDayPress = (day: { dateString: string }) => {
  //   const { dateString } = day;
  //   // const updated = { ...selectedDates };

  //   if (updated[dateString]) {
  //     delete updated[dateString];
  //   } else {
  //     updated[dateString] = {
  //       selected: true,
  //       marked: true,
  //       customStyles: {
  //         container: {
  //           backgroundColor: "#fff",
  //           borderColor: "#EAA4FA",
  //           borderWidth: 1.5,
  //           borderRadius: 999,
  //           width: 28,
  //           height: 28,
  //           alignItems: "center",
  //           justifyContent: "center",
  //         },
  //         text: {
  //           color: "#000",
  //           fontWeight: "bold",
  //         },
  //       },
  //     };
  //   }
  //   setSelectedDates(updated);
  // };
  const handleDayPress = (day) => {
    const dateString = day.dateString;

    const updated = {
      [dateString]: {
        selected: true,
        marked: true,
        customStyles: {
          container: {
            backgroundColor: "#fff",
            borderColor: "#EAA4FA",
            borderWidth: 1.5,
            borderRadius: 999,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
          },
          text: {
            color: "#000",
            fontWeight: "bold",
          },
        },
      },
    };

    setSelectedDates(updated);
    setInputValue(dateString); // ✅ Store selected value
  };
  return (
    <View style={styles.wrapper}>
      <CalendarList
        current={new Date().toISOString().split("T")[0]}
        pastScrollRange={1}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={false}
        markingType={"custom"}
        markedDates={selectedDates}
        onDayPress={handleDayPress}
        theme={{
          calendarBackground: "#FFF4F4",
          textMonthFontWeight: "bold",
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
          textSectionTitleColor: "#000000",
          todayTextColor: "#EAA4FA",
          arrowColor: "#000",
          textMonthFontSize: 18,
        }}
      />
    </View>
  );
};

export default LastPeriodDate;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: -15,
    backgroundColor: "#FFF4F4",
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  step: {
    fontWeight: "600",
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
});
