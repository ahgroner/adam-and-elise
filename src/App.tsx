import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  TextField,
  Typography,
  TypographyProps,
  createTheme,
  styled,
} from "@mui/material";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  typography: {
    fontFamily: "'DM Serif Text', monospace ",
  },
  components: {},
});

const colors = {
  tan: "#f3edd8",
  textGreen: "#1e6550",
};

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

const PASSWORD = "A&E";

const AuthCookieKey = "IS_AUTHED";

const isAuthed = () => {
  return !!Cookies.get(AuthCookieKey);
};

const setAuthCookie = () => {
  return !!Cookies.set(AuthCookieKey, "AUTHED", {
    expires: 30,
  });
};

const Title = (props: TypographyProps) => (
  <Typography {...props} variant="h3" />
);
export const App = () => {
  const [authed, setAuthed] = useState<boolean>(isAuthed());
  const [password, setPassword] = useState<string>("");

  const checkPassword = () => {
    if (password.toLowerCase().trim() === PASSWORD.toLowerCase()) {
      setAuthCookie();
      setAuthed(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      {
        <Dialog
          open={!authed}
          slotProps={{
            backdrop: {
              sx: {
                background: "rgba(0,0,0, 0.9)",
              },
            },
          }}
        >
          <DialogContent>
            <Typography variant="h5">Please enter a password</Typography>
            <TextField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                console.log("keydown");
                if (e.key === "Enter" || e.keyCode === 13) {
                  console.log("isEnter");
                  checkPassword();
                }
              }}
            />
            <Button variant="contained" onClick={checkPassword}>
              Enter
            </Button>
          </DialogContent>
        </Dialog>
      }
      <div className="App">
        <CssBaseline />

        <Box
          sx={{
            width: "100vw",
            height: "80vh",
            backgroundImage: `url('${process.env.PUBLIC_URL}/sunnys.jpeg')`,
            backgroundSize: "cover",
            backgroundPositionY: "center",
            backgroundPositionX: "center",
            position: "relative",
          }}
        >
          <ResponsiveBanner fontWeight={400}>
            Save <br /> the
            <br /> date
          </ResponsiveBanner>
        </Box>
        <Box sx={{ textAlign: "center", py: "120px", background: colors.tan }}>
          <Section>
            <Typography variant="h3" sx={{ color: colors.textGreen }}>
              <div>Adam Groner & Elise Levin-Güracar</div>
              <div>June 30, 2024</div>
              <div>Asilomar Conference Grounds</div>
            </Typography>
          </Section>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Section>
          <Title>Schedule</Title>
          <Typography sx={{ fontSize: 24 }}>
            Saturday June 29, evening | Welcome Event
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            George Washington Park picnic area <br/>
            Sinex and Adder Street, Pacific Grove, CA 93950
          </Typography>
          <Typography sx={{ fontSize: 24 }}>
            Sunday June 30 4pm-10pm | Ceremony and reception
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            "The Circle" Meadow behind Hearst Social Hall <br/>
            800 Asilomar Ave, Pacific Grove, CA 93950
          </Typography>
        </Section>
        <Divider sx={{ my: 4 }} />
        <Section>
          <Title>Travel</Title>
          <Typography fontFamily={"sans-serif"}>
            <p>
              <i>For out of town guests... </i> <br />
              <b>San Jose International Airport (SJC)</b> is the closest
              major airport to Pacific Grove. The drive from SJC to Pacific
              Grove is 1.5-2 hours depending on traffic.
              <br />
              There is also a shuttle service{" "}
              <Link
                href={"https://groometransportation.com/monterey/reservations"}
              >
                (Groome Shuttle)
              </Link>{" "}
              that is $60-75 per/person each way.
            </p>
            <p>
              <i>Alternative options </i><br />
              <b>San Francisco International Airport (SFO)</b> is the next closest major airport. The drive from SFO to Pacific Grove is 2-2.5 hours.
            </p>
            <p>
              <b>Monterey Regional Airport (MRY)</b> is 15 minutes from Asilomar. It has a few flights every day
              but most will include at least a short layover from/to major cities. Car rental is available from this airport as well.
            </p>
          </Typography>
        </Section>
        <Divider sx={{ my: 4 }} />
        <Section>
          <Title>Lodging</Title>
          <Typography fontFamily={"sans-serif"}>
            <p>
              We recommend guests stay at our venue{" "}
              <Link href={"https://www.visitasilomar.com/"}>
                Asilomar Hotel
              </Link>.
            </p>
            You can book a room online{" "}
            <Link href="https://reservations.ahlsmsworld.com/Asilomar/Plan-Your-Trip/Accommodations">
              here
            </Link>{" "}
            or by phone <Link href="tel:+8886355310">888.635.5310</Link>.
            <br /><br />

            In lieu of a group reservation code, please reach out to us after you've booked your room (email <Link href="mailto:1627Burrows@gmail.com">1627Burrows@gmail.com</Link> or text
            Adam <Link href="tel:+9144207627">914.420.7627</Link>) We'll be coordinating with the venue to ensure our guests are accommodated close to one another!
            <p>
              <i>Alternative options</i> <br />
              There are many other hotel options in the area include a few inns
              that are right across the street from Asilomar and an easy walk from our events.
            </p>
          </Typography>
        </Section>

        <Box sx={{ pb: "200px", mt: 6, pt: 2, background: colors.textGreen, color: "white" }}>
          <Section>{`A&E designs <3`}</Section>
        </Box>
      </div>
    </ThemeProvider>
  );
};

const Section = styled("div")({
  maxWidth: 800,
  margin: "0px auto",
});

const Link = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    target="_blank"
    rel="noreferrer"
    style={{
      color: colors.textGreen,
      fontWeight: 800,
    }}
    {...props}
    children={props.children}
  />
);
