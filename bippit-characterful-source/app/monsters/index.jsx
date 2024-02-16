import { View } from "react-native"
import { Heading, SafeView, Span } from "../../components/atoms/html"
import { TextInput } from "../../components/form/TextInput"
import { Link, Tabs } from "expo-router"
import { useMemo, useState } from "react"
import { useMonsterList } from "../../components/api/monsters"
import { FlashList } from "@shopify/flash-list"

export default function App() {
    const [search, setSearch] = useState("")
    const monsters = useMonsterList()

    const monsterList = useMemo(() => {
        if (monsters.data?.data && search) {
            const lowerSearch = search.toLowerCase()
            return monsters.data?.data.filter((item) => {
                return item.name.toLowerCase().includes(lowerSearch)
            })
        } else {
            return monsters.data?.data ?? []
        }
    }, [search, monsters.data])

    return (
        <>
            <Tabs.Screen options={{ headerShown: false }} />
            <SafeView className="bg-gray-900">
                <View className="flex-1 flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4">
                    <Heading className="text-white">Monsters</Heading>

                    <TextInput
                        pill
                        icon="search"
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search monsters"
                    />

                    <View className="native:flex-1 web:max-h-[calc(100vh-300px)]">
                        <FlashList
                            estimatedItemSize={50}
                            renderItem={(item) => (
                                <Link
                                    href={`/monsters/${item.item.index}`}
                                    className="p-2 my-2 bg-gray-300 rounded-lg active:bg-gray-600 animate-colors"
                                >
                                    <Span className="!text-black">
                                        {item.item.name}
                                    </Span>
                                </Link>
                            )}
                            data={monsterList}
                            keyExtractor={(i) => i.index}
                        />
                    </View>
                </View>
            </SafeView>
        </>
    )
}
