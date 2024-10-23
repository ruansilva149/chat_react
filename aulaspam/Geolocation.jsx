import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export function Geolocation(){
    const [location, setLocation] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
            
            },
            (error) => {
                console.error(error)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }, []);

    return (
        <View>
            {location ? (
                <Text>
                    Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                </Text>
            ) : (
                <Text>Obtendo localização...</Text>
            )}
        </View>
    );
}

