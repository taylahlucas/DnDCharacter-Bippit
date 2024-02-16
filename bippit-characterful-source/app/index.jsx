import { Redirect } from "expo-router"
import { View } from "react-native"

export default function root() {
    return (
        <View className="flex-1 bg-gray-900">
            <Redirect href="/characters" />
        </View>
    )
}
