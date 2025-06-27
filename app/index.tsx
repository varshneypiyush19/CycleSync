import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import Mainwelcome from "../app/Mainwelcome";
import Welcome1 from "../assets/images/welcome1.png";
import Welcome2 from "../assets/images/welcome2.png";

export default function WelcomeLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Texts = [
    {
      image: Welcome1,
      heading: "Welcome to CYCLESYNC",
      subHeading: "Best app for effective period and cycle tracking",
    },
    {
      image: Welcome2,
      heading: "Tested and trusted",
      subHeading:
        "Recommended by over 300 OB-GYN for prioritizing women's health",
    },
  ];
  // Show the first screen for now

  useEffect(() => {
    const checkLoginAndOnboarding = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // or token/email, depending on your app
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

        if (userId && hasOnboarded === "true") {
          router.replace("/Main");
        } else if (userId) {
          router.replace("/Home"); // If logged in but not onboarded
        } else {
          setCheckingAuth(false);
        }
      } catch (error) {
        console.log("Error checking onboarding/login status:", error);
        setCheckingAuth(false);
      }
    };
    checkLoginAndOnboarding();
  }, [router]);

  const handleNext = () => {
    if (currentIndex < Texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/LoginSignup");
    }
  };

  if (checkingAuth) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EAA4FA",
        }}
      >
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAA4FA" }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />
      <Mainwelcome current={Texts[currentIndex]} onNext={handleNext} />
    </SafeAreaView>
  );
}
