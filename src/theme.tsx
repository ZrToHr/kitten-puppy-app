import { createTheme, Divider, styled } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    subtext: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    subtext?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    subtext: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6234D5',
    },
    secondary: {
      main: '#5E9EFF',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
    },
    divider: 'rgba(255, 255, 255, 0.4)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    title: {
      color: 'text.primary',
      display: 'block;',
      fontSize: '1.8rem',
      fontWeight: 'bold',
    },
    subtext: {
      color: 'text.primary',
      display: 'block;',
      fontSize: '0.8rem',
    },
  },
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(0),
  marginRight: theme.spacing(0),
}));

export const BtnStyleOutline = {
  color: 'text.primary',
  border: 'none',
  borderRadius: '15px',
  background: 'rgba(0, 0, 0, 0.2)',
  padding: '8px 15px',
  textTransform: 'capitalize',
};
