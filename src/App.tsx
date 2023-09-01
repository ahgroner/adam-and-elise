import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { Button, Dialog, DialogContent, Divider, TextField, Typography, TypographyProps, createTheme, styled } from '@mui/material';
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  typography: {
    fontFamily: "'DM Serif Text', monospace ",
  },
  components: {
  },
});

const colors = {
  tan: '#f3edd8',
  textGreen: "#1e6550"
}


const ResponsiveBanner = styled(Typography)`
position: absolute;
text-align: end;
width: 100%;
color: white;
bottom: 0;
line-height: 0.75;
padding-right: 5vw;
padding-bottom: 5vw;

font-size: 120px;
  @media (max-width: 750px) {
    font-size: 120px;
  }

  @media (min-width: 751px) and (max-width: 1200px) {
    font-size: 140px;
  }

  @media (min-width: 1201px) {
    font-size: 180px;
  }
`;

const PASSWORD = 'A&E';

const AuthCookieKey = "IS_AUTHED";

const isAuthed = () => {
  return !!Cookies.get(AuthCookieKey)
}

const setAuthCookie = () => {
  return !!Cookies.set(AuthCookieKey, "AUTHED", {
    expires: 30,
  });
}

const Title = (props: TypographyProps) => (<Typography {...props} variant="h3" />)
export const App = () => {

  const [authed, setAuthed] = useState<boolean>(isAuthed());
  const [password, setPassword] = useState<string>('');

  const checkPassword = () => {
    if (password.toLowerCase().trim() === PASSWORD.toLowerCase()) {
      setAuthCookie();
      setAuthed(true);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      {<Dialog open={!authed}
        slotProps={{
          backdrop: {
            sx: {
              background: 'rgba(0,0,0, 0.9)',
            }
          }
        }}
      >
        <DialogContent>
          <Typography variant="h5">
            Please enter a password
          </Typography>
          <TextField placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={e => {
              console.log('keydown');
              if (e.key === 'Enter' || e.keyCode === 13) {
                console.log('isEnter');
                checkPassword();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={checkPassword} >Enter</Button>
        </DialogContent>
      </Dialog>}
      <div className="App">
        <CssBaseline />

        <Box sx={{
          width: '100vw',
          height: '80vh',
          backgroundImage: `url('${process.env.PUBLIC_URL}/sunnys.jpeg')`,
          backgroundSize: "cover",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
          position: 'relative'
        }} >
          <ResponsiveBanner fontWeight={400}>Save <br /> the<br /> date</ResponsiveBanner>
        </Box>
        <Box sx={{ textAlign: 'center', py: '120px', background: colors.tan }}>
          <Typography variant="h3" sx={{ color: colors.textGreen }}>
            <div>
              Adam Groner & Elise Levin-Güracar
            </div>
            <div>
              June 30, 2024
            </div>
            <div>
              Asilomar Conference Grounds
            </div>
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Box sx={{ p: 4 }}>
          <Title>Schedule</Title>
          <Typography sx={{ fontSize: 24 }}>
            Saturday June 29, evening | Welcome event
          </Typography>
          <Typography sx={{ fontSize: 24 }}>
            Sunday June 30 4pm-10pm | Ceremony and reception
          </Typography>
        </Box>
        <Box sx={{ p: 4 }}>
          <Title>Travel Recommendations</Title>
          For guests visiting from out of town:
          We recommend guests fly into San Jose International Airport (SJC) which is the closest major airport to Pacific Grove. The drive from SJC to Pacific Grove is 1.5 to 2 hours long without traffic

          You can also fly into San Francisco International Airport (SFO) but that will add an additional 45 minutes to and hour+ to the trip depending on traffic.
        </Box>
        <Box sx={{ pb: '200px', mt: 6, background: '#1e6550', color: 'white' }}>
          {`A&E designs <3`}
        </Box>
      </div>

    </ThemeProvider >
  );
}
