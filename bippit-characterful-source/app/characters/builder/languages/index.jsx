import { SafeView, Span } from "../../../../components/atoms/html"
import { Stack, useRouter } from "expo-router"
import { useState, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useLanguages } from "../../../../components/api/stats"
import { useCharacterStore, useNewCharacterForm } from "../../../../components/data/CharacterStore"
import Button from "../../../../components/atoms/Button";
import LoadingView from "../../../../components/atoms/LoadingView"
import { HeaderView } from "../../../../components/form/HeaderView";

export default function LanguageSelection() {
	const languageOptions = useLanguages()
	const characterStore = useCharacterStore()
	const characterForm = useNewCharacterForm();
	const [languages, setLanguages] = useState(characterForm.languages);
	const [shouldUpdate, setShouldUpdate] = useState(false);
	const router = useRouter()

	useEffect(() => {
		if (shouldUpdate) {
			characterStore.setNewCharacterForm({
				...characterForm,
				languages: languages
			})
			router.back();
		}
	}, [shouldUpdate])


	const isLoading = languageOptions.isLoading;

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
				<HeaderView title='Language Selection' backButton />
				<ScrollView
					contentContainerClassName="flex-grow gap-6 flex flex-col"
				>
					{languageOptions.data?.map(language => {
						const isSelected = languages.find(item => item.index === language.index);
						return (
							<Pressable
								key={language.index}
								className={`border ${isSelected ? 'border-indigo-600' : 'border-white'} rounded-lg`}
								onPress={() => setLanguages((prevState) => isSelected
									? [...prevState].filter(item => item.index !== language.index)
									: [...prevState, { index: language.index, name: language.name }]
								)}
							>
								<Span className="text-lg font-heading m-4">
									{language.name}
								</Span>
								<View className="flex-row">
									<Span className="font-bold native:text-lg ml-4">
										{`Type: ${language.type}`}
									</Span>
									{!!language.script
										? <Span className="font-bold native:text-lg ml-4">
											{`Script: ${language.script}`}
										</Span>
										: <></>
									}
								</View>
								{!!language.desc
									? <Span className="text-white font-bold native:text-lg m-4">
										{language.desc}
									</Span> : <View className="m-2" />
								}
							</Pressable>
						);
					})}
				</ScrollView>
				<Button onPress={() => setShouldUpdate(true)}>
					<Span>Confirm</Span>
				</Button>
			</SafeView >
		</>
	)
}