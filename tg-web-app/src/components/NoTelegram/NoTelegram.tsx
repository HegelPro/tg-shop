import { PropsWithChildren } from "react"
import { isTelegram } from "../../util/tg"

type NoTelegramProps = PropsWithChildren
export const NoTelegram = ({children}: NoTelegramProps) =>
    !isTelegram
        ? <>{children}</>
        : null