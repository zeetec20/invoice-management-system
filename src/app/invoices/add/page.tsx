'use client'

import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardContent,
  FormControl,
  Grid2,
  InputBase,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorComponent, InputLabelComponent } from "@/components/input";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IInvoice } from "@/lib/types/invoice";
import { invoiceSchema } from "@/lib/schema/invoice";
import { useInvoice } from "@/hooks/useInvoice";
import { useAlert } from "@/hooks/useAlert";
import { isFieldRequired } from "@/utils/schema";
import { formatNumberCurrency } from "@/utils/number";
import { INPUT_STYLE } from "@/constants/form";

const AddInvoicePage = () => {
  const { 
    control, 
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      number: '',
      dueDate: null,
      amount: '',
      status: '',
    }
  });
  const { create, isLoading } = useInvoice();
  const { AlertContainer, showAlert } = useAlert()

  const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#3C50E0'),
    backgroundColor: '#3C50E0',
    width: '250px',
    marginTop: '20px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#3C4FE0E2',
    },
  }));

  const onSubmit = (data: IInvoice) => {
    create(data).then(() => {
      reset();
      showAlert({
        title: 'Invoice added successfully!',
        subtitle: 'You can view and manage your invoice in the \'My Invoices\' section.',
        isSuccess: true,
      });
    }).catch((err) => {
      showAlert({
        title: 'Invoice added failed!',
        subtitle: err.message,
        isSuccess: false,
      });
    })
  };

  return (
    <>
      <Typography fontSize={26} color="#1C2434" fontWeight={700}>
        Add Invoice
      </Typography>

      <Card sx={{
        marginTop: "26px",
      }}>
        <CardContent style={{padding: 0}}>
          <Typography variant="h6" gutterBottom style={{borderBottom: 'solid #E2E8F0 1px'}} paddingX="25px" paddingY="10px">
            Invoice Form
          </Typography>
          <Box paddingX="25px" paddingY="10px" marginY="18px">
            <form onSubmit={handleSubmit(onSubmit as () => Promise<void>)} noValidate>
              <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid2 size={{xs: 12, sm: 12, md: 7}}>
                  <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabelComponent isRequired={isFieldRequired(invoiceSchema, 'name')}>
                        Name
                      </InputLabelComponent>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <InputBase
                            {...field}
                            fullWidth
                            error={!!errors.name}
                            placeholder="Enter your invoice name"
                            sx={{
                              ...INPUT_STYLE,
                              borderColor: errors.name ? 'error.main' : '#E2E8F0'
                            }}
                          />
                        )}
                      />
                      <InputErrorComponent error={errors.name} />
                    </FormControl>
                  </Box>
                </Grid2>
                <Grid2 size={{xs: 12, sm: 12, md: 5}}>
                  <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabelComponent isRequired={isFieldRequired(invoiceSchema, 'number')}>
                        Number
                      </InputLabelComponent>
                      <Controller
                        name="number"
                        control={control}
                        render={({ field: {onChange, ...field} }) => (
                          <InputBase
                            onChange={(event) => {
                              const value = event.target.value.replace(/\D/g, ""); // Strip non-numeric characters
                              event.target.value = value;
                              onChange(event);
                            }}
                            {...field}
                            fullWidth
                            error={!!errors.number}
                            placeholder="Enter your invoice number"
                            sx={{
                              ...INPUT_STYLE,
                              borderColor: errors.number ? 'error.main' : '#E2E8F0'
                            }}
                          />
                        )}
                      />
                      <InputErrorComponent error={errors.number} />
                    </FormControl>
                  </Box>
                </Grid2>
                <Grid2 size={{xs: 12, sm: 12, md: 7}}>
                  <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabelComponent isRequired={isFieldRequired(invoiceSchema, 'name')}>
                        Due Date
                      </InputLabelComponent>
                      <Controller
                        name="dueDate"
                        control={control}
                        render={({ field: { onChange, value, ...field} }) => ( 
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                              {...field}
                              value={value ? dayjs(value) : null}
                              onChange={(e) => onChange(e?.toDate())}
                              shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), "day")}
                              format="DD/MM/YYYY"
                              sx={{
                                ...INPUT_STYLE,
                                '& fieldset': {
                                  border: 'none !important',
                                },
                                '& input': {
                                  height: INPUT_STYLE.height,
                                  padding: 0,
                                },
                                borderColor: errors.dueDate ? 'error.main' : '#E2E8F0', 
                              }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      <InputErrorComponent error={errors.dueDate} />
                    </FormControl>
                  </Box>
                </Grid2>
                <Grid2 size={{xs: 12, sm: 12, md: 5}}>
                  <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabelComponent isRequired={isFieldRequired(invoiceSchema, 'amount')}>
                        Amount
                      </InputLabelComponent>
                      <Controller
                        name="amount"
                        control={control}
                        render={({ field: {onChange, value, ...field} }) => (
                          <InputBase
                            {...field}
                            onChange={(e) => {
                              e.target.value = e.target.value.replaceAll('.', '');
                              onChange(e);
                            }}
                            value={formatNumberCurrency(value)}
                            fullWidth
                            error={!!errors.amount}
                            placeholder="Enter your invoice amount"
                            startAdornment={(
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                  backgroundColor: '#D9D9D95C',
                                  paddingX: '15px',
                                  height: '45px',
                                  marginRight: '8px',
                                  borderRadius: '4px',
                                }}
                              >
                                <Typography
                                  fontWeight={400}
                                  fontSize="14px"
                                  color="#64748B"
                                >
                                  Rp
                                </Typography>
                              </Box>
                            )}
                            sx={{
                              ...INPUT_STYLE,
                              paddingX: 0,
                              '& input': {
                                paddingX: '5px',
                              },
                              borderColor: errors.amount ? 'error.main' : '#E2E8F0'
                            }}
                          />
                        )}
                      />
                      <InputErrorComponent error={errors.amount} />
                    </FormControl>
                  </Box>
                </Grid2>
                <Grid2 size={{xs: 12, sm: 12, md: 7}}>
                  <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabelComponent isRequired={isFieldRequired(invoiceSchema, 'status')}>
                        Status
                      </InputLabelComponent>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            sx={{
                              ...INPUT_STYLE,
                              '& fieldset': {
                                border: 'none !important',
                              },
                              paddingX: 'none',
                              borderColor: `${errors.status ? 'error.main' : '#E2E8F0'}`
                            }}
                            error={!!errors.status}
                            displayEmpty
                            renderValue={(selected) => {
                              if (selected === '') {
                                return (
                                  <Typography fontSize="14px" fontWeight={400} color="#64748B">
                                    Choose the status
                                  </Typography>
                                );
                              }
                              return selected;
                            }}
                          >
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
                        )}
                      />
                      <InputErrorComponent error={errors.status} />
                    </FormControl>
                  </Box>
                </Grid2>
              </Grid2>

              <Box textAlign="right">
                <SubmitButton
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  fullWidth={true}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '100%',
                      md: '250px',
                    },
                  }}
                >
                  <AddRoundedIcon
                    sx={{
                      mr: '2px',
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  Add Invoice
                </SubmitButton>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>

      <AlertContainer />
    </>
  );
}

export default AddInvoicePage;
