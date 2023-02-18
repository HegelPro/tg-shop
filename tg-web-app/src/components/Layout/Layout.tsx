import { PropsWithChildren, ReactNode } from 'react'
import { NoTelegram } from '../NoTelegram/NoTelegram';
import './Layout.css'

interface LayoutProps extends PropsWithChildren {
    toolpanel: ReactNode;
}
export const Layout = ({children, toolpanel}: LayoutProps) => {
    return (
        <div>
            <NoTelegram>
                <div>
                    {toolpanel}
                </div>
            </NoTelegram>
            <div className='layout__content'>{children}</div>
        </div>
    )
}