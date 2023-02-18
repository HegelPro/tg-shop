import { PropsWithChildren } from "react"
import { useTelegram } from "../../hooks/useTelegram"

type NoTelegramProps = PropsWithChildren
export const NoTelegram = ({children}: NoTelegramProps) => {
    const {isTelegram} = useTelegram()

    return !isTelegram
        ? <>{children}</>
        : null

}