'use client'

import {
  Box,
  useMediaQuery,
} from "@mui/material";
import { SIDEBAR_WIDTH } from "@/constants/sidebar";
import { SidebarComponent } from "@/components/sidebar";
import { NavbarComponent } from "@/components/navbar";
import { ReactNode } from "react";
import { NAVBAR_HEIGHT } from "@/constants/navbar";

const LayoutComponent = ({children}: {children: ReactNode}) => {
  const isMobile = useMediaQuery('(max-width:650px)');
  const sidebarWidth = isMobile ? '0vw' : SIDEBAR_WIDTH;

  return (
    <Box
      bgcolor="#f1f4f9"
      sx={{ width: '100vw' }}
      padding={0}
      margin={0}
      display="flex"
      minHeight="100vh"
    >
      <SidebarComponent />
      <Box display="flex" flexDirection="column" sx={{width: `calc(100vw - ${sidebarWidth})`}}>
        <NavbarComponent isMobile={isMobile} />
        <Box
          sx={{
            paddingX: '10vw',
            paddingTop: "4vw",
            marginLeft: sidebarWidth,
            width: `calc(100vw - ${sidebarWidth} - 20vw)`,
            position: 'relative',
            marginTop: NAVBAR_HEIGHT,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default LayoutComponent;
