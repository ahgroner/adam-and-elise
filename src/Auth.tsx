import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent, Stack,
    TextField,
    Typography
} from "@mui/material";
import Cookies from "js-cookie";

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

export const Auth = () => {
    const [authed, setAuthed] = useState<boolean>(isAuthed());
    const [password, setPassword] = useState<string>("");
  
    const checkPassword = () => {
      if (password.toLowerCase().trim() === PASSWORD.toLowerCase()) {
        setAuthCookie();
        setAuthed(true);
      }
    };
    return (
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
          <Stack gap={1}>
            <Typography variant="h5" textTransform="uppercase" > Please enter a password</Typography>
            <TextField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  checkPassword();
                }
              }}
            />
            <Button variant="contained" onClick={checkPassword}>
              Enter Site
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }