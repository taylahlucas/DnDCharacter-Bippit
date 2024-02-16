import { useQuery } from "@tanstack/react-query"
import { get, queryWithRelated } from "./base"

export const useMonsterList = () => {
    return useQuery({
        queryFn: () => get("monsters"),
        queryKey: ["monsters", "list"],
    })
}

export const useMonster = (index) => {
    return useQuery({
        queryFn: ({ queryKey: [_, id] }) => get(`monsters/${id}`),
        queryKey: ["monsters", index],
    })
}
