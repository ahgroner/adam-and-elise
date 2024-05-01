import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
// @ts-ignore
// import { Map } from './Map';
import { Rsvp } from './Rsvp';
import {
  Button, Divider, Stack, Typography,
  TypographyProps,
  createTheme,
  styled
} from "@mui/material";
import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Auth, getCachedGuestInfo } from "./Auth";
import { colors } from './colors';
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize';
import { Gallery } from "./Gallery";

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

export const Title = (props: TypographyProps) => (
  <section id={typeof props.children === 'string' ? props.children : ""} >
    <Typography sx={{ paddingTop: '60px' }} {...props} variant="h3" textTransform="uppercase" />
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
      justifyContent: 'center',
      flexWrap: 'wrap',
  }}>
      {['Schedule', 'Travel', 'FAQ', 'Lodging', 'Photos', 'RSVP'].map(section => (
        <a href={`#${section}`}>
          <Button>{section}</Button>
        </a>
      ))}
      <Button href="https://www.zola.com/registry/eliseandadam2024">Registry</Button>
    </Box>
  );
}
const confettiColors = [colors.tan, colors.textGreen]


export const App = () => {
  const [guestInfo, setGuestInfo] = useState(getCachedGuestInfo());

  const [confetti, setConfetti] = useState<boolean>(false);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false)
    }, 3000)
  };

  const { width, height } = useWindowSize()

  return (
    <ThemeProvider theme={theme}>
      <Confetti
        width={width}
        height={height}
        colors={confettiColors}
        numberOfPieces={confetti ? 200 : 0}
      />
      {!guestInfo && <Auth {...{ setGuestInfo, triggerConfetti }} />}
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
            <a href="#RSVP"><Button sx={{ fontSize: 30, background: colors.textGreen }} variant="contained" size="large">RSVP</Button></a>
          </Section>
        </Box>
        <Section>
          <Title>Schedule</Title>
          {guestInfo?.showFridayInvite && (
            <>
              <Stack sx={{
                background: colors.textGreen + 40,
                borderRadius: '8px',
                p: 2,
                pb: 0,
                mb: 1,
              }}>
                <Typography sx={{ fontSize: 16 }} fontWeight={800} color={colors.textGreen}>
                  You're invited! Family only event!
                </Typography>
                <Typography sx={{ fontSize: 24 }}>
                  Friday June 28, 6:00pm | Family Shabbat Dinner
                </Typography>
                <Typography sx={{ fontSize: 16 }}>
                  Director's Cottage <br />
                  At Asilomar Conference grounds
                </Typography>
                <br />
              </Stack>
            </>
          )}
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
          <Title>FAQ</Title>
          <b>What is the dress code?</b>
          Semi-formal attire recommended. <br />
          For those who’d like a bit more direction: Suits or slacks + button down. Cocktails or summer dress or romper. A tuxedo or ball gown may be overdressed!
          The weather will be 50-65°F and possibly windy, so dress accordingly
          <br /><br />
          <b>What can I expect from a Jewish Wedding?</b>
          The ceremony will include rituals blessings in both Hebrew and English. In leiu of an alter, Elise and Adam will be gathered under a Chuppah, a ritual canopy symbolizing the home they will build together.
          <br /><br />
          <b>What else is there to do in the area?</b>
          - Asilomar State Beach (right across the street from the hotel!) <br/>
          - Take a scenic drive down 17 Mile Drive <br/>
          - Visit the Monterey Aquarium <br/>
          - Walk Ocean View boulevard to Lover's point. It is seal pupping season you will probably see some! <br/>
          - Explore historic Fisherman's Wharf or Cannery Row <br/>
          - Downtown Carmel and Carmel State beach<br/>
          <br/>
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
        <Divider />
        <Section>
          <Title>Photos</Title>
          <Gallery />
        </Section>
        <Section>
          {/* <Map /> */}
        </Section>
        {guestInfo ? <Rsvp {...{ guestInfo, setGuestInfo }} /> : <Stack sx={{ height: '1000px', background: colors.textGreen }}/>}
      </div>
    </ThemeProvider>
  );
};

export const Section = styled(Stack)({
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
