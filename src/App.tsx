import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
// @ts-ignore
import JotformEmbed from 'react-jotform-embed';

import {
  Button, Divider, Typography,
  TypographyProps,
  createTheme,
  styled
} from "@mui/material";
import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Auth } from "./Auth";

const colors = {
  tan: "#f3edd8",
  textGreen: "#1e6550",
};

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
  },
  palette: {
    primary: {
      main: colors.textGreen,
    }
  },
  components: {},
});



const ResponsiveBanner = styled(Typography)`
  position: absolute;
  text-align: end;
  width: 100%;
  color: white;
  bottom: 0;
  line-height: 0.75;
  padding-right: 5vw;
  padding-bottom: 5vw;
  font-weight: 200;

  font-size: 120px;
  @media (max-width: 750px) {
    font-size: 80px;
  }

  @media (min-width: 751px) and (max-width: 1200px) {
    font-size: 100px;
  }

  @media (min-width: 1201px) {
    font-size: 120px;
  }
`;

const Title = (props: TypographyProps) => (
  <section id={typeof props.children === 'string' ? props.children : ""} style={{ paddingTop: '60px' }}>
    <Typography {...props} variant="h3" textTransform="uppercase" />
  </section>
);

const getDays = () => {
  const june30_2024 = new Date(2024, 5, 30); // Note: Months are zero-based (0-Jan, 1-Feb, ...)  
  const difference = june30_2024.getTime() - (new Date()).getTime();
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

const Nav = () => {
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255,255,255,0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center'
    }}>
      {['Schedule', 'Travel', 'Lodging', 'rsvp', 'Registry'].map(section => (
        <a href={`#${section}`}>
          <Button>{section}</Button>
        </a>
      ))}
    </Box>
  );
}


export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Auth />
      <div className="App">
        <Nav />
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
            {`${getDays()} days to go!`.toUpperCase()}
          </ResponsiveBanner>
        </Box>
        <Box sx={{ textAlign: "center", py: "50px", background: colors.tan }}>
          <Section>
            <Typography variant="h3" sx={{ color: colors.textGreen }} pb={2}>
              <div>ADAM GRONER & <br /> ELISE LEVIN-GÜRACAR</div>
              <br />
              <div>June 30, 2024</div>
              <div>Asilomar Conference Grounds</div>
            </Typography>
            <a href="#rsvp"><Button sx={{ fontSize: 30, background: colors.textGreen }} variant="contained" size="large">RSVP</Button></a>
          </Section>
        </Box>
        {/* <Divider sx={{ mb: 4 }} /> */}
        <Section>
          <Title>Schedule</Title>
          <Typography sx={{ fontSize: 24 }}>
            Saturday June 29, evening | Welcome Event
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            George Washington Park picnic area <br />
            Sinex and Adder Street, Pacific Grove, CA 93950
          </Typography>
          <br />
          <Typography sx={{ fontSize: 24 }}>
            Sunday June 30 4pm-10pm | Ceremony and reception
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            "The Circle" Meadow behind Hearst Social Hall <br />
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
        <RsvpForm />
      </div>
    </ThemeProvider>
  );
};

const Section = styled("div")({
  maxWidth: 800,
  margin: "0px auto",
  marginBottom: '50px',
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

const RsvpForm = () => {
  return (
    <section id="rsvp" style={{ position: 'relative' }}>
      <JotformEmbed src="https://form.jotform.com/240488027380053" />
      <div style={{
        position: 'absolute',
        bottom: 0,
        height: '120px',
        width: '100%',
        background: colors.textGreen,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {`A&E designs <3`}
      </div>
    </section>);
}