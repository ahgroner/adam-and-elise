import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRhbWhncm9uZXIiLCJhIjoiY2xzc2gxbnFuMGR5cTJrbXFwcHBza254cCJ9.QtD-zHJdMd-iXdTXJOfGLw';

const points = [
    {
        name: 'The Circle Lawn @ Asilomar Conference Center',
        location: {
            'lat': 36.619141,
            'lng': -121.938470,
        }
    },
    {
        name: 'Welcome Picnic area',
        location: {
            lat: 36.618114,
            lng: -121.929274
        }
    }
]

export const Map = () => {
    const map = useRef<mapboxgl.Map | null>();

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: MAPBOX_TOKEN,
            center: {
                'lat': 36.619141,
                'lng': 121.938470,
            },
            zoom: 12,
        });
        // @ts-ignore
        map.current.on('load', () => {
            map.current?.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features':

                        points.map(point => ({
                            'type': 'Feature',
                            'properties': {
                                'name': point.name
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [point.location.lat, point.location.lng]
                            }
                        }))
                }
            })
            // map.current.addLayer({
            //     'id': 'points',
            //     'type': 'symbol',
            //     'source': 'points',
            //     'layout': {
            //         'icon-image': 'custom-marker',
            //         // get the title name from the source's "title" property
            //         'text-field': ['get', 'title'],
            //         'text-font': [
            //             'Open Sans Semibold',
            //             'Arial Unicode MS Bold'
            //         ],
            //         'text-offset': [0, 1.25],
            //         'text-anchor': 'top'
            //     }
            // });
        })

        }, []);

        return (
            <div
                id="map"
                style={{
                    borderRadius: '8px',
                    width: '500px',
                    height: '500px'
                }}>Map!</div>
        );
    }