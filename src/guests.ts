const guestData = [
    "Test Guy, Guest",
    "*Adam Groner, Elise Levin-Guracar",
    "*Sharon Levin, Ismayil Guracar",
    "*Sasha Levin-Guracar, Joe Shutz",
    "*Susan Groner, Daniel Groner",
    "*Rebecca Groner, Clare Kelley",
    "*Stefanie Waldorf, Sam Waldorf",
    "*Noreen Ohcana, David Ohcana",
    "*Noa Ohcana",
    "*Maya Ohcana",
    "*Michele Madansky,Travis Mowbray, Harris Mowbray, Ezra Mowbray",
    "*Cynthia Madansky",
    "*Paula Madansky",
    "*Michael Groner, Elizabeth Groner",
    "*Marcia Groner",
    "*Gen Guracar",
    "*Osman Guracar,Evren Guracar, Danielle Correa",
    "*Brad Hirschfield,Becky Hirschfield,Avi Hirschfield,Dini Hirschfield",
    "*Hadassah Cohen,Brian Cohen, Caleb Cohen",
    "*Debbie Haizman, Paul Haizman",
    "*Jonathan Klawans,Helaine Denenberg, Ari Klawans, Gabriel Klawans, Elijah Klawans",
    "*Mayer Steibel",
    "Zach Porges,Alyssa Braver",
    "Ryan Kass,Aly Vanderwalde",
    "Kaitlyn Kwan,Eric Morris",
    "Rony Krell,Lisa Fierstein",
    "Dan Greener,Hannah Isakowitz",
    "Ethan Joseph,Guest",
    "Harris Karsh,Manasi Raje",
    "Adam Hackel,Guest",
    "Larry Rosenzweig,Michelle Chipetine",
    "Reid Cohen,Guest",
    "Olivia Wade,Erik Gokbora",
    "Lisa Burtzlaff,Chelsea Mitchell",
    "Cari Vallo,Malik Vallo",
    "Patricia Powell,Barbara Stroud,Kimbal Williams",
    "Abhineet Ram,Guest",
    "Aaron Lit,Molly Ludlow",
    "Sarina Gross,Guest",
    "Bethany Landrum,Guest",
    "Robert Leland,Donna Leland",
    "Taner Aksu",
    "Josse De Lenner,Guest",
    "Kris De Leener,Nikki De Leener",
    "Jean Forstner,Matson Wade",
    "Mayan Moses,Janel Moses,Asher Moses",
    "Jane Woodman,Marion Pavillet",
    "Julia Dagum,Guest",
    "Naa Evans,Guest",
    "Teresa Lara-Meloy,Oli Tenorio-Meloy,Ceci Tenorio-Meloy",
    "Paula Leland,Henry Greenawalt",
    "Ken Rafanan,Natalie Seer",
    "Bao Nguyen,Guest",
    "Brian Powers,Katie Riggs",
    "Eileen Chan,Paul Martin",
    "Michael Kuliga,Naomi Leiserson",
    "Ellen Arad,Graham Arad",
    "Marc Gross,Ellen Gross",
    "Robin Bronk,Richard Schechtman",
    "Kathy Lane,Missy Foegal",
    "David Maskasky,Madhura Maskasky",
    "Edmond Macaluso,Sarah Macaluso",
    "Abbey Zeitlin, Noah Burbank, Ari Burbank",
    "Candice Benge, Oliver Steele",
    "Faryn Borella, Guest",
    "Carolina Zamora and Logan Kelley",
    "Eliese Rulifson, Dave Brisson, and Bo Brisson-Rulifson",
    "Jaime McConachie, Guest",
    "Amanda Astey, Caleb Astey",
    "Sarah Al Sayadi, Robert Mitchell",
    "Matt Mistele, Guest",
    "Rachel Wright, Sean Correa",
    "Sarah Cronin, Guest"
];

const guests = guestData.map(guestConcat => {
    const showFridayInvite = guestConcat.startsWith("*");
    const withoutStar = guestConcat.replace("*", "");
    const names = withoutStar.split(',').map(name => name.trim());
    const namesLower = names.map(name => name.toLowerCase());

    const hasPlusOne = guestConcat.includes("Guest");

    return {
        names,
        showFridayInvite,
        hasPlusOne,
        namesLower
    }
});

export type GuestInfo = {
    names: string[];
    showFridayInvite: boolean;
    hasPlusOne: boolean;
};


export const getGuestInfo = (name?: string): GuestInfo | undefined => {
    if(!name || name === "Guest") {
        return undefined;
    }

    const nameLower = name.toLowerCase();
    return guests.find(({ namesLower }) => {
        return namesLower.includes(nameLower);
    });
}
