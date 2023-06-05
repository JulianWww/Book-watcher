import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { Theme, ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import { DenanuLogin, DenanuRegister, DenanuSignup, TextWraper, useToken } from "denanu-login";
import { NotFound } from './components/notFound';
import MainMenu, { Footer } from './components/MainMenu';
import BookList from './pages/BookList';
import Unsubscribe from './pages/Unsubscribe';
import AboutPage from './pages/AboutPage';
import{ SaveUkraineBanScreen, SaveUkraineRibbon } from "stand-with-ukraine-react";
import CookieConsent from "react-cookie-consent";

const themeProps: ThemeOptions = {
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard"
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      }
    }
  },
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...themeProps,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...themeProps,
});


/*
<SaveUkraineRibbon style={{height: "100px"}}/>
        <SaveUkraineBanScreen isCancelable/>
*/

// Apply Dark mode more prevelently

function App() {
  const [_token, setToken] = useToken();
  const nav = useNavigate();
  const location = useLocation();

  const theme: Theme = darkTheme;

  const token = {
    token: _token,
    setToken: setToken
  }

  return (<>
    <ThemeProvider theme={theme}>
      <CookieConsent
        location="bottom"
        expires={150}
      >
        This website uses Cookies to improve your experiance. Please read the <Link onClick={()=>nav("/about")}>User Agreement</Link> for mor infomation
      </CookieConsent>
      <SaveUkraineBanScreen isCancelable/>
      <SaveUkraineRibbon/>
      <Box sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
        
        <TextWraper theme={theme}>
          <MainMenu {...token}/>
          <main style={{marginTop: "80px"}}>
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/About"/>}/>
              <Route path="/Book-List" element={<BookList {...token}/>}/>
              <Route path="/About" element={<AboutPage/>}/>
              <Route path="/unsubscribe/:name" element={<Unsubscribe {...token}/>}/>

              <Route path="/login" element={<DenanuLogin backendLocation={process.env.REACT_APP_BACKEND_URL as string} theme={theme} {...token} signupUrl='signup' onLogIn={()=>nav(-1)}/>}/>
              <Route path="/signup" element={<DenanuSignup backendLocation={process.env.REACT_APP_BACKEND_URL as string} theme={theme} loginUrl='login'/>}/>
              <Route path="/register" element={<DenanuRegister backendLocation={process.env.REACT_APP_BACKEND_URL as string} {...token} onLogIn={() => nav("/")}/>}/>
              <Route path="*" element={<NotFound item="page" id="unknown" />}/>
            </Routes>
          </main>
          <Footer/>
        </TextWraper>
      </Box>
    </ThemeProvider>
    </>
  );

}

export default App;