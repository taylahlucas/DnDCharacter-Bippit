import { Slot, Tabs } from "expo-router"
import FontProvider from "../components/providers/FontProvider"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { CharacterStoreProvider } from "../components/data/CharacterStore"
import { StatusBar } from "expo-status-bar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../global.css"
import BottomTabs from "../components/atoms/BottomTabs"

const queryClient = new QueryClient()

export default () => (
    <FontProvider>
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <CharacterStoreProvider>
                    <StatusBar style="dark" />
                    <Tabs tabBar={BottomTabs}>
                        <Tabs.Screen name="index" options={{ href: null }} />
                        <Tabs.Screen
                            name="characters"
                            options={{ title: "Characters" }}
                        />
                    </Tabs>
                </CharacterStoreProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    </FontProvider>
)
