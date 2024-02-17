import { SafeView, Span } from "../../../../components/atoms/html"
import { HeaderView } from "../../../../components/form/HeaderView"
import { Stack, useRouter } from "expo-router"
import { View, ScrollView, Pressable } from 'react-native';
import { useCharacterStore, useNewCharacterForm } from "../../../../components/data/CharacterStore"
import LoadingView from "../../../../components/atoms/LoadingView"
import { useAlignments } from "../../../../components/api/stats"

export default function AlignmentSelection() {
	const characterStore = useCharacterStore()
	const characterForm = useNewCharacterForm();
	const router = useRouter()
	const alignmentOptions = useAlignments();

	const isLoading = alignmentOptions.isLoading;

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
				<HeaderView title='Alignment Selection' backButton />
				<ScrollView
					contentContainerClassName="flex-grow gap-6 flex flex-col"
				>
					{alignmentOptions.data?.map(option => (
						<Pressable
							key={option.index}
							className={`border ${characterForm.alignment.index === option.index ? 'border-indigo-600' : 'border-white'} rounded-lg`}
							onPress={() => {
								characterStore.setNewCharacterForm({
									...characterForm,
									alignment: {
										index: option.index,
										name: option.name
									}
								})
								router.back();
							}}
						>
							<Span className="text-lg font-heading mt-4 ml-4">
								{option.name} ({option.abbreviation})
							</Span>
							<Span className="m-4">
								{option.desc}
							</Span>
						</Pressable>
					))}
				</ScrollView>
			</SafeView >
		</>
	)
}