import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames'
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions'

const Map = () => {

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const dispatch = useDispatch()
    const mapRef = useRef(null)

    useEffect(() => {
      if(!origin || ! destination) {
        return
      }
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'],{
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,      
        },
      });
    }, [origin, destination])

    useEffect(() => {
      if(!origin || ! destination) {
        return
      }
      const getTravelTime = async () =>{
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units-imperial&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyDzpKfhmv_n_OyvEZYaCM6l-bDTRUKgp8E`)
        .then((res)=>res.json())
        .then((data)=>{
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
      }
      getTravelTime()
    }, [origin, destination])
  
    return (
        <MapView
          ref={mapRef}
          mapType='mutedStandard'
          style={[tw`flex-1`]}
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            description={origin.description}
            apikey="AIzaSyDzpKfhmv_n_OyvEZYaCM6l-bDTRUKgp8E"
            strokeColor="black"
            strokeWidth={3}
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng
            }}
            title='Destination'
            description={destination.description}
            identifier='destination'
            />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng
            }}
            title='Origin'
            description={origin.description}
            identifier='origin'
            />
          
        )}
        
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({})
