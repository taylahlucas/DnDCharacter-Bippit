import { SafeView, Span, BoldSpan } from "../../../../components/atoms/html"
import { Stack, useRouter } from "expo-router"
import { HeaderView } from "../../../../components/form/HeaderView"
import { View, ScrollView, Pressable, Text } from 'react-native';
import { useCharacterStore, useNewCharacterForm } from "../../../../components/data/CharacterStore"
import LoadingView from "../../../../components/atoms/LoadingView"
import { useCharacterClasses } from "../../../../components/api/class"

export default function ClassSelection() {
	const characterClasses = useCharacterClasses()
	const characterStore = useCharacterStore()
	const characterForm = useNewCharacterForm();
	const router = useRouter()
	const isLoading = characterClasses.isLoading;

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
				<HeaderView title='Class Selection' backButton />
				<ScrollView
					contentContainerClassName="flex-grow gap-6 flex flex-col"
				>
					{characterClasses.data?.map(charClass => (
						<Pressable
							key={charClass.index}
							className={`border ${characterForm.class.index === charClass.index ? 'border-indigo-600' : 'border-white'} rounded-lg`}
							onPress={() => {
								characterStore.setNewCharacterForm({
									...characterForm,
									class: { index: charClass.index, name: charClass.name }
								})
								router.back();
							}}
						>
							<View className="flex-row items-center">
								<Span className="text-lg font-heading m-4">
									{charClass.name}
								</Span>
								<Span className="ml-4">
									Hit Die: {charClass.hit_die}
								</Span>
							</View>

							<View className="ml-4 mb-4 flex-row">
								<View className="w-6/12 -mr-9">
									<BoldSpan className="mb-4">Proficiencies: </BoldSpan>
									{charClass.proficiencies.map(prof => (
										<Span key={prof.index}>{prof.name}</Span>
									))}
								</View>
								<View className="w-6/12 gap-2">
									<BoldSpan className="mb-4">Subclasses: </BoldSpan>
									{charClass.subclasses.map(subClass => (
										<Span key={subClass.index}>{subClass.name}</Span>
									))}
									<BoldSpan className="mt-4">Starting Equipment: </BoldSpan>
									{charClass.starting_equipment.map(item => (
										<Span key={item.equipment.index}>{item.equipment.name}</Span>
									))}
								</View>
							</View>
						</Pressable>
					))}
				</ScrollView>
			</SafeView >
		</>
	)
}