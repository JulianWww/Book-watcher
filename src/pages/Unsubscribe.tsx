import { useTheme } from "@emotion/react";
import { Box, Button, ButtonGroup, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { DenanuLogin, IToken } from "denanu-login";
import { setWatchingbook } from "../api/books";
import { useParams, useNavigate } from 'react-router-dom';
import { NotFound } from "../components/notFound";
import { useState } from "react";
import { lastUrl } from "../components/MainMenu";

interface Props extends IToken {

}

export default function Unsubscribe(props: Props) {
  const { token, setToken } = props;
  const theme = useTheme();
  const { name } = useParams();
  const nav = useNavigate();

  const [ processing, setProcessing ] = useState(false);

  if (!token) {
    return <DenanuLogin backendLocation={process.env.REACT_APP_BACKEND_URL as string} theme={theme} setToken={setToken} signupUrl='signup'/>
  }

  if (!name) {
    return <NotFound item={"unsubscribe"} id={"name"}/>
  }

  return <>
  <Box
    sx={{
      pt: 6,
      pb: 6,
    }}
  >
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Unsubscribe
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Do you only want to unsubscribe from "{ name }" or from all Books
      </Typography>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
      </Stack>
      <ButtonGroup fullWidth>
        <Button
          disabled={processing} 
          onClick={()=> {
            setWatchingbook(name, false, token, () => {
              nav(lastUrl);
            });
            setProcessing(true);
          }}
        >
          Unsubscribe only from this Book
        </Button>
        <Button 
          disabled={processing}
          color="error" 
          onClick={()=> {
            setWatchingbook(undefined, false, token, () => {
              nav(lastUrl);
            });
            setProcessing(true);
          }}
        >
          Unsubscribe from all Books
        </Button>
      </ButtonGroup>
      {
        processing ? 
          <LinearProgress/>
        :
          null
      }
    </Container>
  </Box>
  </>;
}