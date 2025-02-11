'use client'

import { useInvoice } from "@/hooks/useInvoice";
import { formatNumberCurrency } from "@/utils/number";
import { Box, Card, CardContent, Chip, InputBase, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { STATUS_COLOR } from "@/constants/invoice";
import { ActionInvoiceComponent } from "@/components/actionInvoice";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { InvoiceStatus } from "@/lib/types/invoice";
import { INPUT_STYLE } from "@/constants/form";
import { invoiceSchema } from "@/lib/schema/invoice";

const InvoicesPage = () => {
  const {
    invoices,
    filter,
    setFilter,
    search,
    setSearch,
  } = useInvoice();
  
  const SearchAndFilter = () => {
    return (
      <Stack
        direction="row"
        gap="28px"
        marginTop={{ xs: '46px', sm: '46px', md: 0 }}
        justifyContent={{ xs: 'space-between', sm: 'space-between', md: 'right' }}
        sx={{
          height: INPUT_STYLE.height,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: 'white',
            borderRadius: '12px',
          }}
          paddingX="10px"
        >
          <SearchRoundedIcon sx={{
            marginRight: '4px',
            width: '16px',
            color: '#7E7E7E',
          }} />
          <InputBase
            placeholder="Search"
            sx={{
              fontSize: '12px',
              color: '#1C2434',
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Stack>
        
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as InvoiceStatus)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            '& fieldset': {
              border: 'none !important',
            },
            backgroundColor: 'white',
            fontSize: '12px',
            borderRadius: '12px',
            minWidth: '120px',
          }}
        >
          <MenuItem
            value=""
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: INPUT_STYLE.color,
            }}
          >
            All Status
          </MenuItem>
          {invoiceSchema.shape.status.options.map((status, index) => (
            <MenuItem
              value={status}
              key={index}
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: INPUT_STYLE.color,
              }}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    );
  }

  return (
    <>
      <Stack direction={{sm: 'column', md: 'row'}} justifyContent="space-between">
        <Typography fontSize={26} color="#1C2434" fontWeight={700}>
          My Invoices
        </Typography>

        <SearchAndFilter />
      </Stack>

      <Card sx={{
        marginTop: { xs: '16px', sm: '16px', md: '26px' },
        marginBottom: '10vh',
        width: '100%',
      }}>
        <CardContent style={{padding: 0}}>
          <Box paddingX="25px" paddingY="10px" marginY="18px">
            <TableContainer component={Paper} sx={{boxShadow: 'none'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{backgroundColor: '#F7F9FC'}}>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography fontSize="14px" color="#1C2434">
                          {invoice.name}
                        </Typography>
                        <Typography fontSize="14px" color="#64748B">
                          {invoice.number}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography fontSize="14px" color="#1C2434">
                          {dayjs(invoice.dueDate).format('MMM D, YYYY')}
                        </Typography>  
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={invoice.status} sx={STATUS_COLOR[invoice.status]} />
                      </TableCell>
                      <TableCell align="left">
                        <Typography fontSize="14px" color="#1C2434">
                          Rp {formatNumberCurrency(invoice.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <ActionInvoiceComponent invoice={invoice} index={index} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {invoices.length === 0 && (
              <Box
                marginTop="14px"
                paddingY="18px"
                sx={{
                  backgroundColor: '#f1f4f9',
                  borderRadius: '4px',
                }}
              >
                <Typography fontSize="14px" textAlign="center" fontWeight={500} color="#1C2434">
                  Invoices data is empty
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default InvoicesPage;