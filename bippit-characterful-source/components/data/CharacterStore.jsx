import { removeFromSet, replaceByField } from "./utils"
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react"

const UPSERT_CHARACTER = "upsert_character"
const DELETE_CHARACTER = "delete_character"

function characterStoreReducer(state, action) {
    const { type, payload } = action
    switch (type) {
        case UPSERT_CHARACTER:
            return replaceByField("id", state, payload)
        case DELETE_CHARACTER:
            return removeFromSet(state, payload.id)
        default:
            return state
    }
}

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
    upsertCharacter: () => {},
    deleteCharacter: () => {},
})

export const CharacterStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(characterStoreReducer, {})
    const upsertCharacter = useCallback(
        (character) => {
            console.log("CHAR", character)
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
            characters: state,
            upsertCharacter,
            deleteCharacter,
        }),
        [state, upsertCharacter, deleteCharacter],
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
