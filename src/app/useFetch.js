import react, { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () =>
{
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect((API_KEY) => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        });

        if (lat != null && lng != null) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [lat,lng]);

    return {data, loading, error}
}

export default useFetch; 