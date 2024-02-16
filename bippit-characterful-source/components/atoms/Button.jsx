import { Link } from "expo-router"
import { Pressable, Text } from "react-native"
import cx from "classnames"

const buttonClassName =
    "flex flex-row justify-center items-center rounded-full bg-yellow-500 px-4 py-2 hover:bg-yellow-500 active:bg-yellow-600 focus:bg-yellow-600 web:focus-visible:outline web:focus-visible:outline-2 web:focus-visible:outline-offset-2 web:focus-visible:outline-yellow-600 web:active:outline web:active:outline-2 web:active:outline-offset-2 web:active:outline-yellow-600"

export default function Button({
    className,
    textClassName,
    href,
    onPress,
    children,
    ...props
}) {
    if (href) {
        return (
            <Link
                href={href}
                className={cx(buttonClassName, className)}
                {...props}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <Pressable
                className={cx(buttonClassName, className)}
                onPress={onPress}
                {...props}
            >
                {children}
            </Pressable>
        )
    }
}
