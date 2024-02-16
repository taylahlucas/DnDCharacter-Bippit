import { Heading, SafeView, Span } from "../../../components/atoms/html"
import { Stack, useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { useRef, useState } from "react"
import { TextInput } from "../../../components/form/TextInput"
import LoadingView from "../../../components/atoms/LoadingView"
import Button from "../../../components/atoms/Button"
import { useCharacterClasses } from "../../../components/api/class"
import { MaterialIcons } from "@expo/vector-icons"
import { useCharacterStore } from "../../../components/data/CharacterStore"

function randomId() {
    return String(Math.floor(Math.random() * 1234567))
}

const defaultCharacter = (fields) => ({
    id: randomId(),
    name: fields.name ?? "",
    description: fields.description?.split("\n") ?? [],
    class: fields.class ?? "fighter", // class.index
    languages: fields.languages ?? [], // language.index
    background: fields.background,
    alignment: fields.alignment,
})

export default function CharacterBuilder() {
    const characterOptions = useCharacterClasses()
    const characterStore = useCharacterStore()

    let isLoading = characterOptions.isLoading

    const router = useRouter()

    const name = useRef("")
    const description = useRef("")

    const [languages, setLanguages] = useState(["common"])
    const [background, setBackground] = useState("acolyte")
    const [alignment, setAlignment] = useState("neutral")
    const [clazz, setClass] = useState("fighter")

    const createCharacter = () => {
        if (name.current.trim() === "") {
            throw TypeError("Name must contain at least 1 character")
        }

        if (description.current.trim() === "") {
            throw TypeError("Description must contain at least 1 character")
        }

        characterStore.upsertCharacter(
            defaultCharacter({
                name: name.current,
                description: description.current,
                languages,
                class: clazz,
                background,
                alignment,
            }),
        )

        router.back()
    }

    if (isLoading) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <SafeView className="bg-gray-900">
                    <View className="flex-1 flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4">
                        <LoadingView />
                    </View>
                </SafeView>
            </>
        )
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeView className="bg-gray-900">
                <View className="flex-1 flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4">
                    <View className="flex flex-row justify-between items-center">
                        <Heading className="text-white">New Character</Heading>
                        <MaterialIcons
                            name="close"
                            color="white"
                            size={32}
                            onPress={() => router.back()}
                            className="border border-white flex justify-center items-center rounded-lg"
                        />
                    </View>

                    <ScrollView
                        contentContainerClassName="flex-grow gap-6 flex flex-col"
                        className="flex-1"
                    >
                        <View className="flex flex-col gap-2">
                            <Span className="text-white font-bold native:text-lg">
                                Character Name
                            </Span>
                            <TextInput
                                onChangeText={(value) => (name.current = value)}
                            />
                        </View>

                        <View className="flex flex-col gap-2">
                            <Span className="text-white font-bold native:text-lg">
                                Character Description
                            </Span>
                            <TextInput
                                rows={4}
                                className="!items-start align-top"
                                multiline
                                onChangeText={(value) =>
                                    (description.current = value)
                                }
                            />
                        </View>

                        <Button onPress={createCharacter}>
                            <Span className="!text-black">
                                Create Character
                            </Span>
                        </Button>
                    </ScrollView>
                </View>
            </SafeView>
        </>
    )
}
