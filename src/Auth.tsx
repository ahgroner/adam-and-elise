import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent, Stack,
  TextField,
  Typography
} from "@mui/material";
import Cookies from "js-cookie";
import { GuestInfo, getGuestInfo } from "./guests";

export const NAME_COOKIE_KEY = "AUTH_NAME";

const setAuthCookie = (name: string) => {
  return !!Cookies.set(NAME_COOKIE_KEY, name, {
    expires: 30,
  });
};

export const getAuthCookie = () => {
  return Cookies.get(NAME_COOKIE_KEY)
}

export const clearAuthCookie = () => {
  return Cookies.remove(NAME_COOKIE_KEY)
}


export const getCachedGuestInfo = () => getGuestInfo(getAuthCookie())


export const Auth = ({ setGuestInfo, triggerConfetti }: {
  setGuestInfo: (state: GuestInfo) => void;
  triggerConfetti: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const checkPassword = () => {
    const newGuestInfo = getGuestInfo(name)
    if (!!newGuestInfo) {
      setAuthCookie(name);
      setGuestInfo(newGuestInfo);
      triggerConfetti();
    } else {
      setInvalid(true)
    }
  };
  return (
    <>
      <Dialog
        open={true}
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
              placeholder="Name"
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
    </>
  )
}