import { ScrollView, Text, View } from "react-native"
import { Heading, Paragraph, SafeView, Span } from "../../components/atoms/html"
import { TextInput } from "../../components/form/TextInput"
import { useCharacterStore } from "../../components/data/CharacterStore"
import EmptyView from "../../components/atoms/EmptyView"
import EmptyList from "../../components/assets/EmptyList"
import { Link, Stack, Tabs } from "expo-router"
import Button from "../../components/atoms/Button"
import { FlashList } from "@shopify/flash-list"

export default function App() {
    const { characters } = useCharacterStore()
    const characterList = Object.values(characters)

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeView className="bg-gray-900">
                <View className="flex-1 flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4">
                    <Heading className="text-white">Characters</Heading>

                    <TextInput
                        icon="search"
                        pill
                        placeholder="Search your characters..."
                    />

                    <View className="flex flex-row py-2">
                        <Button href="/characters/builder">
                            <Text className="text-black">+ New Character</Text>
                        </Button>
                    </View>

                    <ScrollView
                        contentContainerClassName="flex-grow justify-center"
                        className="flex-1 web:max-h-[calc(100vh-300px)]"
                    >
                        {characterList.length === 0 && (
                            <EmptyView
                                containerClassName="py-8"
                                title="You don't have any characters"
                                label="Make a character right now, your life depends on it"
                                illustration={<EmptyList />}
                            />
                        )}

                        <FlashList
                            estimatedItemSize={50}
                            renderItem={(item) => (
                                <Link
                                    href={`/characters/${item.item.id}`}
                                    className="p-2 my-2 bg-gray-300 rounded-lg active:bg-gray-600 animate-colors"
                                >
                                    <Span className="!text-black">
                                        {item.item.name}
                                    </Span>
                                </Link>
                            )}
                            data={characterList}
                        />
                    </ScrollView>
                </View>
            </SafeView>
        </>
    )
}
