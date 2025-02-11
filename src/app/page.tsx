'use client';

import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1C2434',
      }}
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        fontSize="50px"
        fontWeight={800}
        color="white"
      >
        Invoice Hub
      </Typography>
      <Typography
        fontSize="16px"
        color="white"
        maxWidth="500px"
        marginTop="18px"
        marginX="20px"
      >
        Streamline your invoicing process with our powerful and intuitive invoice management system. Generate, track, and manage invoices seamlessly all in one place.
      </Typography>
      <Button
        onClick={() => router.push('/invoices/add')}
        variant="outlined"
        fullWidth={true}
        color="info"
        sx={{
          maxWidth: {
            xs: '230px',
            sm: '300px',
          },
          paddingY: '8px',
          color: 'white',
          borderColor: 'white',
          marginTop: '20px',
        }}
      >
        Add Invoice
      </Button>
    </Stack>
  );
}

export default HomePage;