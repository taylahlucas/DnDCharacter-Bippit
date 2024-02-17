import { removeFromSet, replaceByField } from "./utils"
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from "react"

const SET_NEW_CHARACTER_FORM = "set_new_character_form"
const UPSERT_CHARACTER = "upsert_character"
const DELETE_CHARACTER = "delete_character"

function randomId() {
	return String(Math.floor(Math.random() * 1234567))
}

const initialCharacter = (fields) => ({
	name: '',
	description: [],
	class: {
		index: "fighter",
		name: "Fighter"
	}, // class.index, ** updated to include name ** 
	languages: [{
		index: "common",
		name: "Common"
	}], // language.index  ** updated to include name ** 
	background: {},
	alignment: {}
})

function setNewCharacterForm(state, payload) {
	return {
		...state,
		characterForm: payload,
	};
}

function characterStoreReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case SET_NEW_CHARACTER_FORM:
			return setNewCharacterForm(state, payload);
		case UPSERT_CHARACTER:
			return replaceByField("id", state, payload)
		case DELETE_CHARACTER:
			return removeFromSet(state, payload.id)
		default:
			return {
				...state
			}
	}
}

export const setNewCharacterFormAction = (character) => ({
	type: SET_NEW_CHARACTER_FORM,
	payload: character
})

export const upsertCharacterAction = (character) => ({
	type: UPSERT_CHARACTER,
	payload: character,
})
export const deleteCharacterAction = (character) => ({
	type: DELETE_CHARACTER,
	payload: character,
})

export const CharacterStoreContext = createContext({
	characters: {},
	characterForm: {},
	setNewCharacterForm: () => { },
	upsertCharacter: () => { },
	deleteCharacter: () => { },
})

export const CharacterStoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(characterStoreReducer, {
		characters: {},
		characterForm: initialCharacter()
	})
	const setNewCharacterForm = useCallback(
		(character) => {
			dispatch(setNewCharacterFormAction(character))
		},
		[dispatch],
	)
	const upsertCharacter = useCallback(
		(character) => {
			dispatch(upsertCharacterAction(character))
		},
		[dispatch],
	)
	const deleteCharacter = useCallback(
		(character) => {
			dispatch(deleteCharacterAction(character))
		},
		[dispatch],
	)

	const value = useMemo(
		() => ({
			characters: state.characters,
			characterForm: state.characterForm,
			setNewCharacterForm,
			upsertCharacter,
			deleteCharacter,
		}),
		[state.character, state.characterForm, setNewCharacterForm, upsertCharacter, deleteCharacter],
	)

	return (
		<CharacterStoreContext.Provider value={value}>
			{children}
		</CharacterStoreContext.Provider>
	)
}

export const useCharacterStore = () => useContext(CharacterStoreContext)
export const useCharacter = (id) => {
	const { characters } = useCharacterStore()
	return characters[id]
}
export const useNewCharacterForm = () => {
	const { characterForm } = useCharacterStore()
	return characterForm;
}
