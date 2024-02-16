import { useQuery } from "@tanstack/react-query"
import { queryWithRelated } from "./base"

/**
 * Hooks return a list of data objects as outlined in the linked page for each function.
 * The shape looks like:
 *
 * {
 *   ok: true,
 *   status: 200,
 *   data: { - object schema here - }
 * }
 */

/**
 * Gets a list of available alignments
 * https://www.dnd5eapi.co/docs/#cmp--schemas-alignment
 */
export const useAlignments = () => {
    return useQuery({
        queryFn: queryWithRelated("alignments"),
        queryKey: ["stats", "alignments"],
    })
}

/**
 * Get meta information about ability scores
 * https://www.dnd5eapi.co/docs/#cmp--schemas-abilityscore
 */
export const useAbilityScores = () => {
    return useQuery({
        queryFn: queryWithRelated("ability-scores"),
        queryKey: ["stats", "ability-scores"],
    })
}

/**
 * Get a list of character backgrounds. SRD data only
 * covers the acolyte background, so this list will contain at most one
 * background
 * https://www.dnd5eapi.co/docs/#cmp--schemas-background
 */
export const useBackgrounds = () => {
    return useQuery({
        queryFn: queryWithRelated("backgrounds"),
        queryKey: ["stats", "backgrounds"],
    })
}

/**
 * Get a list of all languages that a character or monster could
 * use. This may not necessarily cover _every_ languages, but
 * it's good enough for the purposes of the character sheet
 * https://www.dnd5eapi.co/docs/#cmp--schemas-language
 */
export const useLanguages = () => {
    return useQuery({
        queryFn: queryWithRelated("languages"),
        queryKey: ["stats", "languages"],
    })
}

/**
 * Get a list of all of the skills
 * @return {UseQueryResult<*|undefined, DefaultError>}
 */
export const useSkills = () => {
    return useQuery({
        queryFn: queryWithRelated("skills"),
        queryKey: ["stats", "skills"],
    })
}
export const useProficiencies = () => {
    return useQuery({
        queryFn: queryWithRelated("proficiencies"),
        queryKey: ["stats", "proficiencies"],
    })
}
