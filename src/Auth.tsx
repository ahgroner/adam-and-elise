import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent, Stack,
  TextField,
  Typography
} from "@mui/material";
import Cookies from "js-cookie";
import { isInvited, showFridayInvite } from "./guests";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { colors } from './colors';

export const NAME_COOKIE_KEY = "AUTH_NAME";

export const getAuthStatus = () => checkName(Cookies.get(NAME_COOKIE_KEY))

export const checkName = (name: string | undefined): AuthState => {
  return {
    isInvited: isInvited(name),
    showFridayInvite: showFridayInvite(name),
  };
};

const setAuthCookie = (name: string) => {
  return !!Cookies.set(NAME_COOKIE_KEY, name, {
    expires: 30,
  });
};

type AuthState = {
  isInvited: boolean;
  showFridayInvite: boolean;
}

const confettiColors = [colors.tan, colors.textGreen]

export const Auth = ({ authState, setAuthState }: { setAuthState: (state: AuthState) => void; authState: AuthState }) => {
  const [name, setName] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const { width, height } = useWindowSize()
  const [confetti, setConfetti] = useState<boolean>(false);

  const checkPassword = () => {
    const newAuthState = checkName(name)
    if (newAuthState.isInvited) {
      setAuthCookie(name);
      setAuthState(newAuthState);
      setConfetti(true);
      setTimeout(() => {
        setConfetti(false)
      }, 3000)
    } else {
      setInvalid(true)
    }
  };
  return (
    <>
      <Dialog
        open={!authState.isInvited}
        maxWidth="lg"
        slotProps={{
          backdrop: {
            sx: {
              background: "rgba(0,0,0, 0.9)",
            },
          },
        }}
      >
        <DialogContent>
          <Stack gap={1}>
            <Typography variant="h5" textTransform="uppercase" > Please enter your name</Typography>
            <TextField
              placeholder="Password"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  checkPassword();
                }
              }}
            />
            {invalid && (<Typography>Hmm... that name isn't on our invite list. Try the name as printed on your invitation? </Typography>)}
            <Button variant="contained" onClick={checkPassword}>
              Enter Site
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Confetti
        width={width}
        height={height}
        colors={confettiColors}
        numberOfPieces={confetti ? 200 : 0}
      />
    </>
  )
}