import { InputLabel, SxProps, Theme, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IInputLabelComponent {
  children: ReactNode
  isRequired?: boolean,
  sx?: SxProps<Theme>
}

export const InputLabelComponent = ({ children, sx, isRequired = false }: IInputLabelComponent) => {
  return (
    <InputLabel shrink sx={{
      marginLeft: '-15px',
      color: '#1C2434 !important',
      ...sx,
    }}>
      {children}
      {isRequired && (
        <Typography color="red" display="inline-block" ml="4px">
          *
        </Typography>
      )}
    </InputLabel>
  )
}