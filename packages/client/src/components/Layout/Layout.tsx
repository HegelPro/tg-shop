import { PropsWithChildren } from 'react'
import './Layout.css'

export const Layout = ({children}: PropsWithChildren) => (
    <div>
        <div className='layout__content'>
            {children}
        </div>
    </div>
)