import { SafeView, Span, BoldSpan } from "../../../../components/atoms/html"
import { HeaderView } from "../../../../components/form/HeaderView"
import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useCharacterStore, useNewCharacterForm } from "../../../../components/data/CharacterStore"
import LoadingView from "../../../../components/atoms/LoadingView"
import { useBackgrounds } from "../../../../components/api/stats"

export default function BackgroundSelection() {
	const characterStore = useCharacterStore()
	const characterForm = useNewCharacterForm();
	const router = useRouter()
	const backgroundOptions = useBackgrounds();

	const isLoading = backgroundOptions.isLoading;

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
				<HeaderView title='Background Selection' backButton />
				<ScrollView
					contentContainerClassName="flex-grow gap-6 flex flex-col"
				>
					{backgroundOptions.data?.map(option => (
						<Pressable
							key={option.index}
							className={`border ${characterForm.alignment.index === option.index ? 'border-indigo-600' : 'border-white'} rounded-lg`}
							onPress={() => {
								characterStore.setNewCharacterForm({
									...characterForm,
									background: {
										index: option.index,
										name: option.name
									}
								})
								router.back();
							}}
						>
							<Span className="text-lg font-heading m-4">
								{option.name}
							</Span>

							<View className="m-4">
								<BoldSpan className="mb-4">Features: </BoldSpan>
								<BoldSpan className="mb-4">{option.feature.name}</BoldSpan>
								<Span>{option.feature.desc}</Span>

								<BoldSpan className="mt-4 mb-4">Bonds: </BoldSpan>
								{option.bonds.from.options.map((item, index) => (
									<Span key={index}>- {item.string}</Span>
								))}

								<BoldSpan className=" mb-4 mt-4">Flaws: </BoldSpan>
								{option.flaws.from.options.map((flaw, index) => (
									<Span key={index}>- {flaw.string}</Span>
								))}

								<BoldSpan className="mt-4">Ideals: </BoldSpan>
								{option.ideals.from.options.map((ideal, index) => (
									<View key={index}>
										<Span>- {ideal.desc}</Span>
										<Span>ALIGNMENTS: </Span>
										<View className="flex-row gap-4 mb-4">
											{ideal.alignments.map(align => (
												<Span key={align.index}>{align.name}</Span>
											))}
										</View>
									</View>
								))}

								<BoldSpan className="mb-4 mt-4">Personality Traits: </BoldSpan>
								{option.personality_traits.from.options.map((trait, index) => (
									<Span key={index}>- {trait.string}</Span>
								))}

								<BoldSpan className="mb-4 mt-4">Starting Equipment: </BoldSpan>
								{option.starting_equipment.map(item => (
									<Span key={item.equipment.index}>- {item.equipment.name}</Span>
								))}

								<BoldSpan className="mb-4 mt-4">Starting Equipment: </BoldSpan>
								{option.starting_proficiencies.map(item => (
									<Span key={item.index}>- {item.name}</Span>
								))}
							</View>

						</Pressable>
					))}
				</ScrollView>
			</SafeView >
		</>
	)
}