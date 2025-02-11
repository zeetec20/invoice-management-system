import { Typography } from "@mui/material"
import { FieldError } from "react-hook-form"

interface IInputErrorComponent {
  error?: FieldError
}

export const InputErrorComponent = ({ error }: IInputErrorComponent) => {
  return (
    error && (
      <Typography color="error" variant="caption">
        {error.message}
      </Typography>
    )
  )
}