import { NAVBAR_HEIGHT } from "@/constants/navbar"
import { SIDEBAR_WIDTH } from "@/constants/sidebar"
import ImageMenu1 from "@/../public/iconMenu1.png"
import ImageMenu2 from "@/../public/iconMenu2.png"
import Profile from "@/../public/profile.png"
import { Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SwipeableDrawer, Typography } from "@mui/material"
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"
import { SwitchModeComponent } from "../switchMode"

interface INavbarComponent {
  isMobile: boolean
}

export const NavbarComponent = ({ isMobile }: INavbarComponent) => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const toggleDark = () => setDark(!dark);

  return (
    <>
      <Stack
        sx={{ height: NAVBAR_HEIGHT, width: isMobile ? '100vw' : `calc(100vw - ${SIDEBAR_WIDTH})` }}
        bgcolor="white"
        position="fixed"
        marginLeft={isMobile ? 0 : SIDEBAR_WIDTH}
        zIndex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent={isMobile ? 'space-between' : 'right'}
      >
        <Box marginLeft="16px" display={isMobile ? undefined : 'none'}>
          <IconButton aria-label="delete" onClick={toggleOpen}>
            <DehazeRoundedIcon
              sx={{
                color: '#1C2434',
              }}
            />
          </IconButton>
        </Box>

        <Stack flexDirection="row" alignItems="center">
          <SwitchModeComponent
            checked={dark}
            onChange={toggleDark}
            sx={{
              marginRight: '2px',
              ["& .MuiSwitch-thumb"]: {
                filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.2))",
              },
              ["& .MuiSwitch-track"]: {
                filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  background: dark
                    ? `linear-gradient(to right,
                        transparent 0%,
                        transparent calc(100% - 26px),
                        #f1f4f9 calc(100% - 26px),
                        #f1f4f9 100%
                      )`
                    : `linear-gradient(to right,
                        #f1f4f9 0%,
                        #f1f4f9 26px,
                        transparent 26px,
                        transparent 100%
                      )`,
                  borderRadius: "14px",
                },
              },
            }}
          />
          <Box marginLeft="16px">
            <IconButton
              aria-label="notification"
              onClick={toggleOpen}
              sx={{
                backgroundColor: '#f1f4f9',
                border: '1px solid #E2E8F0',
              }}
            >
              <NotificationsNoneOutlinedIcon
                sx={{
                  width: '20px',
                  height: '20px',
                  color: '#64748B',
                }}
              />
            </IconButton>
          </Box>
          <Box marginLeft="16px">
            <Badge color="error" variant="dot" invisible={false}>
              <IconButton
                aria-label="message"
                onClick={toggleOpen}
                sx={{
                  backgroundColor: '#f1f4f9',
                  border: '1px solid #E2E8F0',
                  margin: '0',
                }}
              >
                <TextsmsOutlinedIcon
                  sx={{
                    width: '20px',
                    height: '20px',
                    color: '#64748B',
                  }}
                />
              </IconButton>
            </Badge>
          </Box>
          <Stack
            flexDirection="row"
            alignItems="center"
            marginRight={isMobile ? '14px' : '20px'}
            marginLeft={isMobile ? '8px' : '26px'}
            sx={{
              cursor: 'pointer',
            }}
          >
            {!isMobile && (
              <Box textAlign="right">
                <Typography fontSize="14px" color="#1C2434">John Doe</Typography>
                <Typography fontSize="12px" color="#637381">Verified Member</Typography>
              </Box>
            )}
            <Image
              src={Profile.src}
              alt="image profile"
              width="48"
              height="48"
              style={{
                marginLeft: '8px',
                marginRight: '6px',
              }}
            />
            {!isMobile && (
              <ExpandMoreRoundedIcon
                sx={{
                  width: '30px',
                  height: '30px',
                  color: '#637381',
                }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      <MenuOnMobile isMobile={isMobile} open={open} toggleOpen={toggleOpen} />
    </>
  )
}

interface IMenuOnMobile {
  isMobile: boolean
  open: boolean
  toggleOpen: () => void
}

const MenuOnMobile = ({ isMobile, open, toggleOpen }: IMenuOnMobile) => {
  const items = [
    {
      text: 'Add Invoice',
      icon: ImageMenu1.src,
      href: '/invoices/add',
    },
    {
      text: 'My Invoices',
      icon: ImageMenu2.src,
      href: '/invoices/list',
    }
    ];
  
  return isMobile && (
    <SwipeableDrawer
      anchor="top"
      open={open}
      onClose={toggleOpen}
      onOpen={toggleOpen}
    >
      <Box
        sx={{ width: 'auto', backgroundColor: '#1c2333' }}
        role="presentation"
        onClick={toggleOpen}
      >
        <List>
          <ListItem disablePadding>
            <Link href={items[0].href} style={{color: 'white', textDecoration: 'none'}}>
              <ListItemButton
                sx={{
                  marginY: '8px',
                }}
              >
                <ListItemIcon sx={{minWidth: 'auto', marginRight: '16px'}}>
                  <Image
                    src={items[0].icon}
                    alt="image menu"
                    width={18}
                    height={16}
                  />
                </ListItemIcon>
                <ListItemText primary={<Typography fontSize="14px">Add invoice</Typography>} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href={items[1].href} style={{color: 'white', textDecoration: 'none'}}>
              <ListItemButton sx={{
                marginY: '8px',
              }}>
                <ListItemIcon sx={{minWidth: 'auto', marginRight: '16px'}}>
                  <Image
                    src={items[1].icon}
                    alt="image menu"
                    width={18}
                    height={16}
                  /> 
                </ListItemIcon>
                <ListItemText primary={<Typography fontSize="14px">My invoices</Typography>} />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  )
}