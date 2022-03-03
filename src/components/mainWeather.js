import React, {useEffect ,useState} from 'react';


function MainWeather(props) {

    const [latitude, setLatitude] = useState([]);
    const [longitude, setlongitude] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
        });
    
        console.log("Latitude is:", latitude)
        console.log("Longitude is:", longitude)
      }, [latitude, longitude]);
}

export default MainWeather;

