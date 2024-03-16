import React, { useMemo, useState } from "react";

import { GuestInfo } from "./guests";
import { FormControl, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Stack, TextField, Alert, AlertTitle } from "@mui/material";
import { Section, Title } from "./App";
import { colors } from "./colors";
import { clearAuthCookie, getAuthCookie } from "./Auth";

export const events = {
    friday: {
        title: "Friday June 28, 6:00pm | Family Shabbat Dinner",
        location: "Director's Cottage at Asilomar Conference grounds"
    },
    saturday: {
        title: "Saturday June 29, evening | Welcome Event",
        location: (<>George Washington Park picnic area <br />
            Sinex and Adder Street, Pacific Grove, CA 93950</>)
    },
    sunday: {
        title: "Sunday June 30 4pm-10pm | Ceremony and Reception",
        location: (<>Asilomar Conference Center<br />
            800 Asilomar Ave, Pacific Grove, CA 93950</>)
    }
};

const EventInfo = ({ day }: { day: (keyof typeof events) }) => {
    return (
        <Stack sx={{ py: 1, pt: 5 }}>
            <Typography variant="h5">{events[day].title}</Typography>
            <Typography variant="subtitle1">{events[day].location}</Typography>
        </Stack>
    )
}

const AttendDecline = ({ name, label, formState, setFormState, guestName, includeGuest }: {
     name: string;
     label: string;
     formState: any;
     setFormState: any;
     guestName: string,
     includeGuest: boolean
    }) => {
    if (name === "Guest" && !includeGuest) {
        return <></>;
    }
    const k = `${name}_${label}`;
    const value = formState[k];

    const labelName = name === "Guest" && guestName ? guestName : name;
    return (
        <FormControl sx={{
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 1,
            pt: '2px',
            '&:hover': {
                background: '#ffffff50'
            }
        }}>
            <FormLabel sx={{ width: 220, fontWeight: '800' }}>{labelName}</FormLabel>
            <RadioGroup
                sx={{ display: 'flex', flexDirection: "row" }}
                name={k}
                value={value}
                onChange={(_, value) => {
                    setFormState({
                        ...formState,
                        [k]: value
                    });
                }}
            >
                <FormControlLabel
                    sx={{
                        background: value === "Attending" ? colors.textGreen + '30' : undefined,
                        borderRadius: 1,
                        pr: 2
                    }}
                    value="Attending"
                    control={<Radio />}
                    label="Attending"
                />
                <FormControlLabel
                    sx={{
                        background: value === "Declined" ? colors.textGreen + '30' : undefined,
                        borderRadius: 1,
                        pr: 2
                    }}
                    value="Declined"
                    control={<Radio />}
                    label="Declined"
                />
            </RadioGroup>
        </FormControl>
    )
}


export const Rsvp = ({
    guestInfo,
    setGuestInfo }:
    {
        guestInfo: GuestInfo;
        setGuestInfo: any;
    }) => {

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [includeGuest, setIncludeGuest] = useState<undefined | 'Yes' | 'No'>(undefined);
    const includeGuestBool = includeGuest === "Yes";
    const [guestName, setGuestName] = useState("");

    const [note, setNote] = useState("");

    const [formState, setFormState] = useState(
        () => Object.fromEntries(guestInfo.names.flatMap(
            name => ([
                ...(guestInfo.showFridayInvite ? [[`${name}_friday`, undefined]] : []) as any,
                [`${name}_saturday`, undefined],
                [`${name}_sunday`, undefined],
                [`${name}_diet`, ''],
                [`${name}_allergy`, ''],
            ])
        ))
    );

    const isValid = useMemo(() => {
        return Object.entries(formState).every(([key, value]) => {
            if (!includeGuestBool && key.startsWith('Guest')) {
                return true;
            }
            return value !== undefined;
        });
    }, [formState, includeGuestBool]);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        setError(false);

        const formData = new FormData();
        formData.append('access_key', "c3c07773-698a-4e49-902d-89e127900eab");

        Object.entries(formState).forEach(([k, v]) => {
            if (typeof v === 'string' || typeof v === 'boolean') {
                const skipGuest = !includeGuestBool && k.startsWith('Guest');
                if (!skipGuest) {
                    formData.append(k, v.toString());
                }
            }
        });
        if (includeGuestBool && guestName) {
            formData.append('plus_one_name', guestName);
        }
        if (note) {
            formData.append('note', note);
        }

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setSubmitting(false);
            setSubmitted(true);
        } else {
            setError(true)
            setSubmitting(false);
        }
    };

    const unAuth = () => {
        clearAuthCookie();
        setGuestInfo(undefined);
    }
    if (submitted) {
        return (
            <Stack sx={{ background: colors.textGreen }}>
                <Section
                    sx={{ p: 5, my: 10, background: colors.tan, borderRadius: 1 }}
                    width="800px"
                >
                    <Title sx={{}}>RSVP</Title>
                    <Typography variant="h4">We've recieved your response! </Typography>
                    <Typography sx={{
                        color: 'blue',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }} onClick={() => { setSubmitted(false) }}> Made a mistake? Left something out? Click to resubmit </Typography>
                </Section>
            </Stack >
        );
    }

    const args = { formState, setFormState, guestName, includeGuest: includeGuestBool };

    const plusOne = () => {
        if (!guestInfo.hasPlusOne) {
            return;
        }
        return (
            <>
                <FormControl sx={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 1,
                    pt: '2px',
                    '&:hover': {
                        background: '#ffffff50'
                    }
                }}>
                    <FormLabel sx={{ fontWeight: '800', pr: 2 }}>Will you be bringing a plus one?</FormLabel>
                    <RadioGroup
                        sx={{ display: 'flex', flexDirection: "row" }}
                        value={includeGuest}
                        onChange={(_, value: 'Yes' | 'No') => {
                            setIncludeGuest(value);
                        }}
                    >
                        <FormControlLabel
                            sx={{
                                background: includeGuest === "Yes" ? colors.textGreen + '30' : undefined,
                                borderRadius: 1,
                                pr: 2
                            }}
                            value={"Yes"}
                            control={<Radio />}
                            label="Yes"
                        />
                        <FormControlLabel
                            sx={{
                                background: includeGuest === "No" ? colors.textGreen + '30' : undefined,
                                borderRadius: 1,
                                pr: 2
                            }}
                            value={"No"}
                            control={<Radio />}
                            label="No"
                        />
                    </RadioGroup>
                </FormControl>
                {includeGuestBool && (
                    <Stack
                        direction="row"
                        gap={1}
                        pb={1}
                        alignItems="center"
                        pt={1}
                    >
                        <FormLabel sx={{ fontWeight: '800', flexShrink: 0 }}>Guest name</FormLabel>
                        <TextField
                            fullWidth
                            size="small" variant="filled"
                            label="Name of additional guest"
                            value={guestName}
                            onChange={e => setGuestName(e.target.value)}
                            autoFocus
                        />
                    </Stack>
                )
                }
            </>
        )
    }


    return (
        <Stack sx={{ background: colors.textGreen }}>
            <Section sx={{ p: 5, my: 10, background: colors.tan, borderRadius: 1 }}>
                <Title sx={{}}>RSVP</Title>
                <Typography sx={{
                    color: 'blue',
                    fontWeight: 600,
                    cursor: 'pointer',
                }} onClick={unAuth}>Not {getAuthCookie()}? </Typography>
                <form onSubmit={onSubmit}>
                    {plusOne()}

                    {guestInfo.showFridayInvite && (
                        <>
                            <EventInfo day="friday" />
                            {guestInfo.names.map(name => <AttendDecline name={name} label="friday" {...args} />)}
                        </>
                    )}
                    <EventInfo day="saturday" />
                    {guestInfo.names.map(name => <AttendDecline name={name} label="saturday" {...args} />)}
                    <EventInfo day="sunday" />
                    {guestInfo.names.map(name => <AttendDecline name={name} label="sunday" {...args} />)}
                    <Typography variant="h5" pt={2}>Additional Info</Typography>
                    {guestInfo.names.map(
                        name => (
                            <Stack direction="row" gap={1} pb={1} alignItems="center">
                                <FormLabel sx={{ width: 200, fontWeight: '800', flexShrink: 0 }}>{name}</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small" variant="filled"
                                    name={name}
                                    label="Dietary restrictions"
                                    value={formState[`${name}_diet`]}
                                    onChange={e => setFormState({ ...formState, [`${name}_diet`]: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="filled"
                                    name={name}
                                    label="Allergies"
                                    value={formState[`${name}_allergy`]}
                                    onChange={e => setFormState({ ...formState, [`${name}_allergy`]: e.target.value })}
                                />
                            </Stack>
                        ))}
                    <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="Leave a note, song request, etc. for Adam & Elise!"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                    {error && (
                        <Alert severity="error" variant="filled">
                            <AlertTitle>Something went wrong :( </AlertTitle>
                            Try again later. or just text Adam 9144207627
                        </Alert>
                    )}
                    <Button sx={{ mt: 2 }} type="submit" fullWidth disabled={!isValid || submitting} variant="contained">Submit</Button>
                </form>
            </Section>
        </Stack>
    )

}