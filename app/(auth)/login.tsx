import { View } from "react-native";
import PrivyUI from "@/components/login/PrivyUI";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PrivyUI />
    </View>
  );
}
