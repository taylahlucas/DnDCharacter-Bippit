import { ActivityIndicator, ScrollView, View } from "react-native"
import { Heading, Paragraph, SafeView, Span } from "../../components/atoms/html"
import { TextInput } from "../../components/form/TextInput"
import { Link, Tabs, useLocalSearchParams, useRouter } from "expo-router"
import { useMemo, useState } from "react"
import { useMonster, useMonsterList } from "../../components/api/monsters"
import { FlashList } from "@shopify/flash-list"
import { MaterialIcons } from "@expo/vector-icons"

export default function MonsterView() {
    const params = useLocalSearchParams()
    const monster = useMonster(params.id)
    const router = useRouter()

    const data = monster?.data?.data

    return (
        <>
            <Tabs.Screen options={{ headerShown: false }} />
            <SafeView className="bg-gray-900">
                <View className="flex-1 flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4">
                    <View className="flex flex-row items-center gap-4">
                        <MaterialIcons
                            name="close"
                            color="white"
                            size={32}
                            onPress={() => router.back()}
                            className="border border-white flex justify-center items-center rounded-lg"
                        />
                        <Heading className="text-white flex-1">
                            {data ? data.name : "Loading..."}
                        </Heading>
                    </View>

                    {monster.isLoading && <ActivityIndicator />}
                    {!!data && (
                        <ScrollView
                            contentContainerClassName="flex-grow"
                            className="flex-1"
                        >
                            <Heading level={4} className="text-3xl">
                                Actions
                            </Heading>
                            {data.actions.map((action) => (
                                <View key={action.name}>
                                    <Heading level={5} className="text-2xl">
                                        {action.name}
                                    </Heading>
                                    <Paragraph>{action.desc}</Paragraph>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </SafeView>
        </>
    )
}
