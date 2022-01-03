import { React, useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { COUNTRY_ID } from '../utils/constants';
mapboxgl.accessToken = 
    'pk.eyJ1IjoiMTAwYWprIiwiYSI6ImNrd2RkdTdkbDBqMzIyb250dml4d3VwenEifQ.GmkIuJ6wK0F1hHuWz6ZECQ';

const Map = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(53.3813); //Maynooth
    const [lng, setLng] = useState(6.5918);
    const [zoom, setZoom] = useState(3.5);
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
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('load', function () {
            map.current.resize();
            map.current.addSource("mapbox.country-boundaries-v1", {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1'
            });
            map.current.addSource("states", {
                'type': 'geojson',
                'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
            });
            map.current.addLayer({
                "id": "state-fills",
                "type": "fill",
                "source": "states",
                "layout": {},
                "paint": {
                    "fill-color": "#627BC1",
                    "fill-opacity": 0
                }
            });
            map.current.addLayer({
                "id": "state-borders",
                "type": "line",
                "source": "states",
                "layout": {},
                "paint": {
                    "line-color": "#808080",
                    "line-width": 0
                }
            });
            map.current.addLayer({
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
            map.current.on("mousemove", function (e) {
                var features = map.current.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
                if (features.length) {
                    map.current.getCanvas().style.cursor = 'pointer';
                    map.current.setFilter("state-fills-hover", ["==", "name", features[0].properties.name]);
                } else {
                    map.current.setFilter("state-fills-hover", ["==", "name", ""]);
                    map.current.getCanvas().style.cursor = '';
                }
            });
            // Reset the state-fills-hover layer's filter when the mouse leaves the map
            map.current.on("mouseout", function () {
                map.current.getCanvas().style.cursor = 'auto';
                map.current.setFilter("state-fills-hover", ["==", "name", ""]);
            });
            map.current.on("click", function (e) {
                var features = map.current.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
                if (features.length) {
                    //window.alert(`Selected country:\n${features[0].properties.name.replace(' ', '_').toLowerCase()}`)
                    handlePlaylistSearch(e, COUNTRY_ID[(features[0].properties.name).replace(' ', '_').toLowerCase()])
                    /* TODO:
                    Make this work to work on countries. Documentation but with points, not polygons/set of different points:
                        * https://docs.mapbox.com/mapbox-gl-js/example/center-on-feature/
                    map.flyTo({
                        center: features[0].geometry.coordinates
                    });
                    */
                    /* TODO:
                    Create a 'pop up'/context menu to show up here, with song results
                        * https://docs.mapbox.com/mapbox-gl-js/example/popup/
                        * https://stackoverflow.com/questions/48077141/how-to-add-a-custom-context-menu-to-the-map
                    */
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