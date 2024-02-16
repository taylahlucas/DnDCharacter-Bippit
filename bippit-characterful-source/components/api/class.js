import { useQuery } from "@tanstack/react-query"
import { get, queryWithRelated } from "./base"

export const useCharacterClasses = () => {
    return useQuery({
        queryFn: queryWithRelated("classes"),
        queryKey: ["classes", "main"],
    })
}

export const useCharacterSubclasses = () => {
    return useQuery({
        queryFn: () => get("subclasses"),
        queryKey: ["classes", "sub"],
    })
}
