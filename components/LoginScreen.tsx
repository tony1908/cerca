import { View } from "react-native";
import PrivyUI from "./login/PrivyUI";

export default function LoginScreen() {
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
