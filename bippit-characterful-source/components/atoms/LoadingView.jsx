import { ActivityIndicator, View } from "react-native"

export default function LoadingView() {
    return (
        <View className="flex-1 flex flex-col justify-center items-center bg-indigo-700">
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}
