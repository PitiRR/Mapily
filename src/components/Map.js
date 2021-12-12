import { React, useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { COUNTRY_ID } from '../utils/constants';
mapboxgl.accessToken = 
    'pk.eyJ1IjoiMTAwYWprIiwiYSI6ImNrd2RkdTdkbDBqMzIyb250dml4d3VwenEifQ.GmkIuJ6wK0F1hHuWz6ZECQ';

const Map = (props) => {
    const mapContainer = useRef(null);
    const [lat, setLat] = useState(53.3813); //Maynooth
    const [lng, setLng] = useState(6.5918);
    const [zoom, setZoom] = useState(3.5);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const mapStyle = 'mapbox://styles/100ajk/ckwddf1ub1v3d15su905hd0sk';

    useEffect(() => {
        const handlePlaylistSearch = (event, searchTerm) => {
            event.preventDefault();
        
            if (searchTerm.trim() !== '') {
              setErrorMsg('');
              props.handleSearch(searchTerm);
            } else {
              setErrorMsg('Please enter a search term.');
            }
        };
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom
        });
        map.on('load', function () {
            map.addSource("states", {
                "type": "geojson",
                "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
            });
            map.addLayer({
                "id": "state-fills",
                "type": "fill",
                "source": "states",
                "layout": {},
                "paint": {
                    "fill-color": "#627BC1",
                    "fill-opacity": 0
                }
            });
            map.addLayer({
                "id": "state-borders",
                "type": "line",
                "source": "states",
                "layout": {},
                "paint": {
                    "line-color": "#808080",
                    "line-width": 0
                }
            });
            map.addLayer({
                "id": "state-fills-hover",
                "type": "fill",
                "source": "states",
                "layout": {},
                "paint": {
                    "fill-color": "#1DB954",
                    "fill-opacity": 0.5
                },
                "filter": ["==", "name", ""]
            });
            map.on("mousemove", function (e) {
                var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
                if (features.length) {
                    map.getCanvas().style.cursor = 'pointer';
                    map.setFilter("state-fills-hover", ["==", "name", features[0].properties.name]);
                } else {
                    map.setFilter("state-fills-hover", ["==", "name", ""]);
                    map.getCanvas().style.cursor = '';
                }
            });
            // Reset the state-fills-hover layer's filter when the mouse leaves the map
            map.on("mouseout", function () {
                map.getCanvas().style.cursor = 'auto';
                map.setFilter("state-fills-hover", ["==", "name", ""]);
            });
            map.on("click", function (e) {
                var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
                if (features.length) {
                    handlePlaylistSearch(e, COUNTRY_ID[(features[0].properties.name).toLowerCase()])
                }
            });
        });
    });
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;