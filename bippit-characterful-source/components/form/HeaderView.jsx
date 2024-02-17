import { View } from 'react-native';
import { Heading } from "../atoms/html"
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"

export function HeaderView({ title, backButton }) {
	const router = useRouter()

	return (
		<View className="flex flex-col justify-start w-full max-w-4xl mx-auto p-6 gap-4 pr-10">
			<View className={`flex flex-row ${backButton ? 'gap-4' : 'justify-between'} items-center`}>
				{!!backButton ?
				
					<MaterialIcons
						name='arrow-back'
						color='white'
						size={24}
						onPress={() => router.back()}
					/> : null
				}
				<Heading className="text-white wrap">{title}</Heading>
			</View>
		</View>
	)
}