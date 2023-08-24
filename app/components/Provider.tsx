"use client"

import { ReactNode } from "react"
import {SessionProvider} from "next-auth/react"
import { Session } from "next-auth"

interface Props {
    children: React.ReactNode,
    session: Session | null
}


const Provider =({children, session}: Props) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Provider;