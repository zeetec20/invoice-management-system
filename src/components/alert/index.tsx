import { Box, SxProps, Theme, Typography } from "@mui/material"
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface IAlertComponent {
  sx?: SxProps<Theme>
  title: string,
  subtitle: string,
  isSuccess: boolean,
}

export const AlertComponent = ({
  sx,
  isSuccess,
  title,
  subtitle,
}: IAlertComponent) => {
  const {
    backgroundColor,
    mainColor,
    titleColor,
    subtitleColor,
  } = isSuccess ? {
      backgroundColor: '#E1F9F0',
      mainColor: '#34D399',
      titleColor: '#004434',
      subtitleColor: '#637381',
    } : {
      backgroundColor: '#F9E1E1FF',
      mainColor: '#D33434FF',
      titleColor: '#440000FF',
      subtitleColor: '#816363FF',
    } 

  return (
    <Box display="flex" width="100%" sx={{
      minHeight: '86px',
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '30px',
      ...sx
    }}>
      <Box sx={{
        backgroundColor: mainColor,
        width: '6px',
      }} />
      <Box display="flex" alignItems="center">
        <Box sx={{
          backgroundColor: mainColor,
          borderRadius: '5px',
          paddingX: '6px',
          marginX: '26px',
          ...(isSuccess ? {
            paddingBottom: '2px',
            paddingTop: '6px',
          } : {
            paddingBottom: '2px',
            paddingTop: '6px',
          }),
        }}>
          {isSuccess ? (
            <CheckRoundedIcon sx={{
              width: '16px',
              height: '16px',
              color: 'white',
            }} />
          ) : (
            <CloseRoundedIcon sx={{
              width: '16px',
              height: '16px',
              color: 'white',
            }} />
          )}
        </Box>
        <Box>
          <Typography fontSize="16px" fontWeight={700} color={titleColor}>
            {title}
          </Typography>
          <Typography fontSize="16px" fontWeight={400} color={subtitleColor}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}