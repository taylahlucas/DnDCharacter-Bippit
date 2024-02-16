import { Pressable, View } from "react-native"
import cx from "classnames"
import { useKeyboard } from "@react-native-community/hooks"
import Button from "./Button"
import { Span } from "./html"

export default function BottomTabs(props) {
    return <InnerBottomTabs {...props} />
}

const links = [
    { label: "Characters", href: "characters" },
    { label: "Monsters", href: "monsters" },
]

const isActive = (current, href) => !!current?.key?.startsWith(href)

// The root function isn't used in a hook compatible way, so we render an inner component to use hooks
function InnerBottomTabs({ insets, descriptors, state }) {
    const current = state.history[state.history.length - 1]
    const keyboard = useKeyboard()

    if (keyboard.keyboardShown) {
        return null
    }

    return (
        <View
            className="bg-gray-950 border-t border-t-gray-700 flex flex-row"
            style={{
                paddingRight: insets.right,
                paddingLeft: insets.left || 4,
                paddingBottom: insets.bottom || 4,
            }}
        >
            <View className="flex flex-row items-center justify-center px-2 py-4 gap-8 w-full">
                {links.map(({ label, href }) => (
                    <Button
                        key={href}
                        href={`/${href}`}
                        className={cx(
                            "flex-grow flex-shrink-0",
                            isActive(current, href) && "!bg-purple-600",
                        )}
                    >
                        <Span
                            className={cx(
                                "text-center font-bold",
                                isActive(current, href) && "text-white",
                            )}
                        >
                            {label}
                        </Span>
                    </Button>
                ))}
            </View>
        </View>
    )
}
