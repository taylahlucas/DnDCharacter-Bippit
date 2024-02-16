import { useFonts } from "expo-font"
import { Bevan_400Regular } from "@expo-google-fonts/bevan"
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik"
import LoadingView from "../atoms/LoadingView"

export default function FontProvider({ children }) {
    let fontsLoaded = useFonts({
        Bevan_400Regular,
        Rubik_400Regular,
        Rubik_700Bold,
    })

    if (!fontsLoaded) {
        return <LoadingView />
    }

    return children
}
