import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Mainwelcome from "../app/Mainwelcome";
import Welcome1 from "../assets/images/welcome1.png";
import Welcome2 from "../assets/images/welcome2.png";

export default function WelcomeLayout() {
  const router = useRouter();
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < Texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/LoginSignup");
    }
  };
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
