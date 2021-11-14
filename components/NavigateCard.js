import React from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlices'
import { useNavigation } from '@react-navigation/core';
const API_KEY = "AIzaSyDzpKfhmv_n_OyvEZYaCM6l-bDTRUKgp8E"

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation()

    return (
        <SafeAreaView style={[tw`bg-white flex-1`]}>
            <Text>123</Text>
            <View style={[tw`border-t border-gray-200 flex-shrink`]}>
            <GooglePlacesAutocomplete
              placeholder='Where to?'
              fetchDetails={true}
              styles={toInputBoxStyles}
              fetchDetails={true}
              enablePoweredByContainer={false}
              nearbyPlacesAPI='GooglePlacesSearch'
              query={{
                key: API_KEY,
                language: 'en'
              }}
              onPress={(data, details = null) => {
                dispatch(setDestination({
                  location: details.geometry.location,
                  description: data.description
                }))
                navigation.navigate('RideOptionsCard')
              }}
              minLength={2}
              debounce={400}
            />
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingTop: 20,
      flex: 0,
    },
    textInput:{
        backgroundColor:'#DDDDDF',
        borderRadius:0,
        fontSize:18,
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
})
