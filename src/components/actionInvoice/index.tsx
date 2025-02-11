import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useState } from "react";
import { IInvoice, InvoiceStatus } from "@/lib/types/invoice";
import { useInvoice } from '@/hooks/useInvoice';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { STATUS_COLOR } from '@/constants/invoice';

export const ActionInvoiceComponent = ({ invoice, index }: { invoice: IInvoice, index: number }) => {
  const { remove, setStatus } = useInvoice();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <DehazeRoundedIcon
          sx={{
            color: '#1C2434',
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {invoice.status !== InvoiceStatus.Paid && (
          <MenuItem onClick={() => setStatus(index, InvoiceStatus.Paid)}>
            <ListItemIcon>
              <CheckCircleOutlineRoundedIcon sx={{
                width: '18px',
                color: STATUS_COLOR[InvoiceStatus.Paid].color,
              }} />
            </ListItemIcon>
            <Typography fontSize="14px" color="#1C2434">
              Set Paid
            </Typography>
          </MenuItem>
        )}
        {invoice.status !== InvoiceStatus.Unpaid && (
          <MenuItem onClick={() => setStatus(index, InvoiceStatus.Unpaid)}>
            <ListItemIcon>
              <PlaylistRemoveRoundedIcon sx={{
                width: '18px',
                color: STATUS_COLOR[InvoiceStatus.Unpaid].color,
              }} />
            </ListItemIcon>
            <Typography fontSize="14px" color="#1C2434">
              Set Unpaid
            </Typography>
          </MenuItem>
        )}
        {invoice.status !== InvoiceStatus.Pending && (
          <MenuItem onClick={() => setStatus(index, InvoiceStatus.Pending)}>
            <ListItemIcon>
              <PendingActionsRoundedIcon sx={{
                width: '18px',
                color: STATUS_COLOR[InvoiceStatus.Pending].color,
              }} />
            </ListItemIcon>
            <Typography fontSize="14px" color="#1C2434">
              Set Pending
            </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => remove(index)}>
          <ListItemIcon>
            <DeleteOutlineRoundedIcon sx={{
              width: '18px',
              color: '#D33434FF'
            }} />
          </ListItemIcon>
          <Typography fontSize="14px" color="#1C2434">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}