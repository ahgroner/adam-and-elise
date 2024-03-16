import { Stack } from "@mui/material";
import React from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {original: "photos/2.jpeg"},
    {original: "photos/1.jpeg"},
    {original: "photos/3.jpeg"},
    {original: "photos/4.jpeg"},
    {original: "photos/5.jpeg"},
    {original: "photos/6.jpeg"},
    {original: "photos/7.jpeg"},
    {original: "photos/8.jpeg"},
    {original: "photos/9.JPG"},
    {original: "photos/10.JPG"},
    {original: "photos/11.JPG"},
    {original: "photos/12.JPG"},
    {original: "photos/13.JPG"},
    {original: "photos/14.JPG"},
    {original: "photos/15.jpeg"},
    // {original: "photos/16.JPG"},
    // {original: "photos/17.JPG"},
    // {original: "photos/18.JPG"},
    // {original: "photos/19.JPG"},

]

export const Gallery = () => {
    return (
        <Stack sx={{ background: 'black', borderRadius: 3, 
        'img': {
            height: 'calc(100vh - 80px)',
        }
        }}>
            <ImageGallery items={images} showThumbnails={false} />
        </Stack>
    );
}