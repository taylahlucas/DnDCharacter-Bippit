import cx from "classnames"
import { Platform, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const paragraphClassName = "font-body text-base text-white"
export const Paragraph = Platform.select({
    native: ({ className, ...props }) => (
        <Text className={cx(paragraphClassName, className)} {...props} />
    ),
    web: ({ className, ...props }) => (
        <p className={cx(paragraphClassName, className)} {...props} />
    ),
})

const boldSpanClassName = "font-bold text-base text-white"
export const BoldSpan = Platform.select({
    native: ({ className, ...props }) => (
        <Text className={cx(boldSpanClassName, className)} {...props} />
    ),
    web: ({ className, ...props }) => (
        <span className={cx(boldSpanClassName, className)} {...props} />
    ),
})

const spanClassName = "font-body text-base text-white"
export const Span = Platform.select({
    native: ({ className, ...props }) => (
        <Text className={cx(spanClassName, className)} {...props} />
    ),
    web: ({ className, ...props }) => (
        <span className={cx(spanClassName, className)} {...props} />
    ),
})

const headingClassName = "text-4xl font-heading pt-4 text-white"
export const Heading = Platform.select({
    native: ({ level, className, ...props }) => (
        <Text className={cx(headingClassName, className)} {...props} />
    ),
    web: ({ level, className, ...props }) => {
        const Tag = `h${level || 1}`
        return <Tag className={cx(headingClassName, className)} {...props} />
    },
})

const safeClassName = "flex flex-col flex-1"
export const SafeView = Platform.select({
    native: ({ className, ...props }) => (
        <SafeAreaView className={cx(safeClassName, className)} {...props} />
    ),
    web: ({ className, ...props }) => (
        <div className={cx(safeClassName, className)} {...props} />
    ),
})