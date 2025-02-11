import { styled, Switch } from "@mui/material";

export const SwitchModeComponent = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 28,
  padding: 0,
  overflow: "visible",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    border: "none",
    transform: "translateX(2px)",
    "&.Mui-checked": {
      transform: "translateX(34px)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" fill="%23666"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "#f1f4f9",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundColor: "#fff",
    marginTop: '3px',
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 20 20"><circle cx="10" cy="10" r="2.5" fill="%23666"/><circle cx="10" cy="4" r="1" fill="%23666"/><circle cx="16" cy="10" r="1" fill="%23666"/><circle cx="10" cy="16" r="1" fill="%23666"/><circle cx="4" cy="10" r="1" fill="%23666"/><circle cx="14.5" cy="5.5" r="1" fill="%23666"/><circle cx="14.5" cy="14.5" r="1" fill="%23666"/><circle cx="5.5" cy="14.5" r="1" fill="%23666"/><circle cx="5.5" cy="5.5" r="1" fill="%23666"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: "#f1f4f9",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}))