// // import { Text, View } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // const Login = () => {
// //   return (
// //     <SafeAreaView
// //       style={{ flex: 1, backgroundColor: "#EAA4FA" }}
// //       edges={["top", "left", "right"]}
// //     >
// //       <View
// //         style={{
// //           flex: 1,
// //           backgroundColor: "#EAA4FA",
// //         }}
// //       >
// //         <View
// //           style={{
// //             flex: 1 / 4,
// //             backgroundColor: "#EAA4FA",
// //             width: "100%",
// //             alignItems: "center",
// //           }}
// //         >
// //           <Text>Hello</Text>
// //         </View>
// //         <View
// //           style={{
// //             flex: 1,
// //             borderTopRightRadius: 125,
// //             borderTopLeftRadius: 125,
// //             backgroundColor: "#FFFFFF",
// //             paddingHorizontal: 30,
// //             paddingTop: 80,
// //             width: "100%",
// //           }}
// //         >
// //           <Text>Login</Text>
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default Login;
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function LogInScreen() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <View style={styles.topSection}>
//         <Text style={styles.title}>
//           Log in to keep track of your cycle{"\n"}and maintain wellness
//         </Text>
//       </View>

//       <View style={styles.bottomSection}>
//         {/* Email */}
//         <TextInput
//           placeholder="E-mail"
//           style={styles.input}
//           keyboardType="email-address"
//         />

//         {/* Password */}
//         <View style={styles.passwordContainer}>
//           <TextInput placeholder="Password" secureTextEntry={!showPassword} />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Ionicons
//               name={showPassword ? "eye-off-outline" : "eye-outline"}
//               size={22}
//               color="gray"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Confirm Password */}

//         {/* Or sign up with */}
//         <Text style={styles.or}>– or log in with –</Text>

//         <View style={styles.socialContainer}>
//           <Image
//             source={require("../assets/images/apple.png")}
//             style={styles.socialIcon}
//           />
//           <Image
//             source={require("../assets/images/google.png")}
//             style={styles.socialIcon}
//           />
//           <Image
//             source={require("../assets/images/facebook.png")}
//             style={styles.socialIcon}
//           />
//         </View>

//         {/* Sign Up Button */}
//         <TouchableOpacity
//           style={styles.signUpButton}
//           onPress={() => router.push("/Home")}
//         >
//           <Text style={styles.signUpText}>Sign In</Text>
//         </TouchableOpacity>

//         {/* Already have account */}
//         <Text style={styles.footer}>
//           Don{"'"}t have an account?
//           <Text
//             style={styles.loginLink}
//             onPress={() => router.push("/Register")}
//           >
//             Sign up
//           </Text>
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EAA4FA",
//   },
//   topSection: {
//     flex: 1 / 6,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#EAA4FA",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#000",
//   },
//   bottomSection: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 125,
//     borderTopRightRadius: 125,
//     paddingHorizontal: 30,
//     paddingTop: 80,
//     alignItems: "center",
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginBottom: 20,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     // paddingVertical: 10,
//     marginBottom: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   inputPassword: {
//     flex: 1,
//   },
//   or: {
//     color: "#444",
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: "row",
//     gap: 20,
//     marginBottom: 30,
//   },
//   socialIcon: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//   },
//   signUpButton: {
//     backgroundColor: "#EAA4FA",
//     paddingVertical: 12,
//     paddingHorizontal: 60,
//     borderRadius: 25,
//     marginBottom: 20,
//   },
//   signUpText: {
//     color: "#FFF",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   footer: {
//     color: "#000",
//     fontSize: 14,
//   },
//   loginLink: {
//     color: "#EAA4FA",
//     fontWeight: "600",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogInScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.39:8000/api/v1/user/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (data.user && data.user.accessToken) {
        await AsyncStorage.setItem("accessToken", data.user.accessToken);
        console.log("Access Token saved successfully!");

        // Navigate to the correct screen (make sure the route name is correct)
        // If your main screen file is MainScreen.js, the route might be '/MainScreen' or '/(tabs)/home' etc.
        // I see you used "/Home" before, so I'll keep it.
        router.push("/Home");
      } else {
        // This is a good practice check in case the backend response changes
        throw new Error("Login successful, but no access token received.");
      }
      // await AsyncStorage.setItem("userId", data?.user?._id || "tempUserId");
      // router.push("/Home");
    } catch (error) {
      Alert.alert("Login error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topSection}>
        <Text style={styles.title}>
          Log in to keep track of your cycle{"\n"}and maintain wellness
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={{ flex: 1 }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>– or log in with –</Text>

        <View style={styles.socialContainer}>
          {/* <Image
            source={require("../assets/images/apple.png")}
            style={styles.socialIcon}
          /> */}
          <Image
            source={require("../assets/images/google.png")}
            style={styles.socialIcon}
          />
          {/* <Image
            source={require("../assets/images/facebook.png")}
            style={styles.socialIcon}
          /> */}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don{"'"}t have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => router.push("/Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAA4FA",
  },
  topSection: {
    flex: 1 / 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAA4FA",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 125,
    borderTopRightRadius: 125,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputPassword: {
    flex: 1,
  },
  or: {
    color: "#444",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  signUpButton: {
    backgroundColor: "#EAA4FA",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  signUpText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    color: "#000",
    fontSize: 14,
  },
  loginLink: {
    color: "#EAA4FA",
    fontWeight: "600",
  },
});
