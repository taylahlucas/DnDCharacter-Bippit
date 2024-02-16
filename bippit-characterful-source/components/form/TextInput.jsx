import { Pressable, Text, TextInput as BaseTextInput, View } from "react-native"
import cx from "classnames"
import { MaterialIcons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { cssInterop } from "nativewind"

cssInterop(MaterialIcons, {
    className: {
        target: "style",
        nativeStyleToProp: {
            color: true,
            fontSize: "size",
        },
    },
})

export function TextInput({ className, icon, pill = false, ...props }) {
    const [hasFocus, setHasFocus] = useState(false)
    const inputRef = useRef(null)

    const radiusClassName = pill ? "rounded-3xl px-4" : "rounded-md px-4"
    return (
        <Pressable
            onPress={() => inputRef.current?.focus()}
            className={cx(
                radiusClassName,
                "flex flex-row w-full py-3 items-center transition-colors gap-2",
                hasFocus ? "border-amber-400" : "border-gray-400",
                "border-2",
            )}
        >
            {!!icon && (
                <MaterialIcons
                    name={icon}
                    className={cx(
                        "transition-colors !text-xl",
                        hasFocus ? "text-amber-400" : "text-gray-400",
                    )}
                />
            )}
            <BaseTextInput
                ref={inputRef}
                onBlur={() => setHasFocus(false)}
                onFocus={() => setHasFocus(true)}
                className={cx(
                    "flex flex-row w-full items-center",
                    "text-white text-lg placeholder:text-gray-400 sm:text-sm sm:leading-6",
                    "web:outline-none web:ring-0 border-0",
                    className,
                )}
                type="text"
                {...props}
            ></BaseTextInput>
        </Pressable>
    )
}
