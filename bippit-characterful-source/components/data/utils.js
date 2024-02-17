import { initialCharacter } from "./CharacterStore"

export function removeFromSet(state, key) {
    const filtered = { ...state }
    delete filtered[key]
    return filtered
}

export function removeFromArray(field, list, key) {
    return list.filter((item) => item[field] !== key)
}

export function replaceByField(field, state, entry) {
    return {
        ...state,
		characterForm: initialCharacter(),
		characters: {
			...state.characters,
			[entry[field]]: entry
		}
    }
}

export function replaceOrInsertInArray(field, list, entry) {
    let hasInserted = false
    const mapped = list.map((item) => {
        if (item[field] === entry[field]) {
            hasInserted = true
            return entry
        }
        return item
    })

    if (!hasInserted) {
        mapped.push(entry)
    }

    return mapped
}
