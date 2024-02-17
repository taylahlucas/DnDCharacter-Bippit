import { Link } from "expo-router"
import { Pressable, Text } from "react-native"
import cx from "classnames"

const buttonClassName =
    "flex flex-row justify-center items-center rounded-full bg-yellow-500 px-4 py-2 hover:bg-yellow-500 active:bg-yellow-600 focus:bg-yellow-600 web:focus-visible:outline web:focus-visible:outline-2 web:focus-visible:outline-offset-2 web:focus-visible:outline-yellow-600 web:active:outline web:active:outline-2 web:active:outline-offset-2 web:active:outline-yellow-600"

const textButtonClassName = "rounded-md px-4 flex flex-row w-full py-3 items-center gap-2 border-gray-400 border-2"

export default function Button({
    className,
    textClassName,
	type = 'default',
    href,
    onPress,
    children,
    ...props
}) {
	const buttonStyle = type === 'default' ? buttonClassName : textButtonClassName;

    if (href) {
        return (
            <Link
                href={href}
                className={cx(buttonStyle, className)}
                {...props}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <Pressable
                className={cx(buttonStyle, className)}
                onPress={onPress}
                {...props}
            >
                {children}
            </Pressable>
        )
    }
}
