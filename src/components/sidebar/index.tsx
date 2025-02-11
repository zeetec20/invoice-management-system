import Image from "next/image";
import ImageMenu1 from "@/../public/iconMenu1.png"
import ImageMenu2 from "@/../public/iconMenu2.png"
import ImageSidebar from "@/../public/iconSidebar.png"
import { Passion_One } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { SIDEBAR_WIDTH } from "@/constants/sidebar";

const passionOne = Passion_One({
  subsets: ['latin-ext'],
  weight: ['400', '700', '900'],
});

export const SidebarComponent = () => {
  const matches = useMediaQuery('(max-width:650px)');

  const sidebarItem = [
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

  const Item = ({text, icon, href}: {text: string, icon: string, href: string}) => {
    const routePath = usePathname();
    const isActive = routePath === href;

    return (
      <Link
        href={href}
        style={{
          color: isActive ? '#ffffff' : '#9D9D9D',
          cursor: 'pointer',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <Image
          src={icon}
          alt="image menu"
          width={18}
          height={16}
          style={{
            opacity: isActive ? 1 : 0.6,
          }}
        />
        <Typography fontSize="16px" sx={{
          textWrap: 'nowrap',
        }}>
          {text}
        </Typography>
      </Link>
    )
  }

  const SidebarItems = () => (
    sidebarItem.map((item, index) => (
      <Item
        text={item.text}
        icon={item.icon}
        href={item.href}
        key={index}
      />
    ))
  )

  return (
    <Box
      sx={{
        height: '100vh',
        width: `calc(${SIDEBAR_WIDTH} - 6vw)`,
        paddingX: '3vw',
        maxWidth: SIDEBAR_WIDTH,
      }}
      bgcolor="#1c2333"
      position="fixed"
      display={matches ? 'none' : 'flex'}
      flexDirection="column"
      zIndex={2}
    >
      <Stack
        flexDirection={{
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
        }}
        justifyContent="center"
        gap="10px"
        alignItems="center"
        mt="40px"
      >
        <Image src={ImageSidebar.src} alt="logo" width={50} height={50} />
        <Typography
          className={passionOne.className}
          fontWeight={700}
          fontSize={24}
          color="#ffffff"
        >
          InvoiceHub
        </Typography>
      </Stack>
      <Typography color="#9D9D9D" fontSize="14px" marginTop="60px">MENU</Typography>
      <SidebarItems />
    </Box>
  )
}