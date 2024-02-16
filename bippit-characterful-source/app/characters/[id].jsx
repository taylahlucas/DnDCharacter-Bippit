import { ActivityIndicator, ScrollView, View } from "react-native"
import { Heading, Paragraph, SafeView, Span } from "../../components/atoms/html"
import { TextInput } from "../../components/form/TextInput"
import {
    Link,
    Redirect,
    Tabs,
    useLocalSearchParams,
    useRouter,
} from "expo-router"
import { useEffect, useMemo, useState } from "react"
import { useMonster, useMonsterList } from "../../components/api/monsters"
import { FlashList } from "@shopify/flash-list"
import { MaterialIcons } from "@expo/vector-icons"
import { useCharacter } from "../../components/data/CharacterStore"
import { useCharacterClasses } from "../../components/api/class"
import { useAlignments, useBackgrounds } from "../../components/api/stats"

function findInApiResponse(query, index) {
    if (query.isLoading) {
        return {}
    }

    return query.data?.find((item) => item.index === index) ?? {}
}

export default function CharacterView() {
    const params = useLocalSearchParams()
    const character = useCharacter(params.id)
    const router = useRouter()

    const alignments = useAlignments()
    const backgrounds = useBackgrounds()
    const classes = useCharacterClasses()

    if (character == null) {
        return <Redirect href="/characters" replace />
    }

    const characterClass = findInApiResponse(classes, character.class)
    const characterAlignment = findInApiResponse(
        alignments,
        character.alignment,
    )
    const characterBackground = findInApiResponse(
        backgrounds,
        character.background,
    )

    console.log(characterAlignment)

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
                        <Heading className="text-white flex-1 mt-0">
                            {character.name}
                        </Heading>
                    </View>

                    <ScrollView
                        contentContainerClassName="flex-grow"
                        className="flex-1"
                    >
                        <Heading level={4} className="text-2xl">
                            Class
                        </Heading>
                        <Span>
                            {characterAlignment.name} {characterBackground.name}{" "}
                            {characterClass.name}
                        </Span>

                        <Heading level={4} className="text-2xl">
                            Proficient With
                        </Heading>
                        <View className="flex flex-row">
                            <View className="flex-1">
                                {characterClass.saving_throws?.map((thro) => (
                                    <Paragraph
                                        key={thro.index}
                                        level={5}
                                        className="text-xl"
                                    >
                                        {thro.name}
                                    </Paragraph>
                                ))}
                            </View>

                            <View className="flex-1">
                                {characterClass.proficiencies?.map((prof) => (
                                    <Paragraph
                                        key={prof.index}
                                        level={5}
                                        className="text-xl"
                                    >
                                        {prof.name}
                                    </Paragraph>
                                ))}
                            </View>
                        </View>

                        <Heading level={4} className="text-2xl">
                            About
                        </Heading>
                        {character.description.map((item, idx) => (
                            <Paragraph key={idx}>{item}</Paragraph>
                        ))}
                    </ScrollView>
                </View>
            </SafeView>
        </>
    )
}
