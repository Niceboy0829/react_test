import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#EBAFE',
      light: '#5E7BFD',
      dark: '#3A53A2',
    },
    secondary: {
      main: '#EBD4F7',
      light: '#FFC5F6',
      dark: '#FF9FB1',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
