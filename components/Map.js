import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames'
import { selectOrigin, selectDestination } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions'

const Map = () => {

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
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
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng
            }}
            title='Origin'
            description={destination.description}
            identifier='origin'
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
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({})
