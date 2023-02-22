import { PropsWithChildren, ReactNode } from 'react'
import { NoTelegram } from '../NoTelegram/NoTelegram';
import './Layout.css'
import {version} from '../../../package.json'

interface LayoutProps extends PropsWithChildren {
    toolpanel: ReactNode;
}
export const Layout = ({children, toolpanel}: LayoutProps) => {
    return (
        <div>
            <NoTelegram>
                <div>{version}</div>
                <div>
                    {toolpanel}
                </div>
            </NoTelegram>
            <div className='layout__content'>
                {children}
            </div>
        </div>
    )
}