import { View } from "react-native"
import { Heading, Paragraph } from "./html"
import cx from "classnames"

export default function EmptyView({
    illustration,
    title,
    label,
    containerClassName,
    imageClassName,
    titleClassName,
    labelClassName,
}) {
    return (
        <View
            className={cx(
                containerClassName,
                "flex-1 flex flex-col items-center justify-center gap-4",
            )}
        >
            {illustration}
            <Heading
                level={3}
                className={cx(titleClassName, "text-white text-center mt-4")}
            >
                {title}
            </Heading>
            <Paragraph className={cx(labelClassName, "text-white text-center")}>
                {label}
            </Paragraph>
        </View>
    )
}
