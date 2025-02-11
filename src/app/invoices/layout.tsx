'use client'

import LayoutComponent from "@/components/layout";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <CookiesProvider>
      <LayoutComponent>
        {children}
      </LayoutComponent>
    </CookiesProvider>
  )
}

export default Layout;