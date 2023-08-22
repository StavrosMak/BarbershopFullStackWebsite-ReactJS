import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapBox.css';
import { ThreeDots } from 'react-loader-spinner';

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(23.7275);
  const [lat] = useState(37.9838);
  const [zoom] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (map.current) return;

    setLoading(true);
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([139.7525, 35.6846])
        .addTo(map.current);

      setTimeout(() => {
        setLoading(false);
      }, 5000);
    });
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ThreeDots
            height={80}
            width={80}
            color="black"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div ref={mapContainer} className="map" />
      )}
    </div>
  );

}
