import React from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlices'
import { useNavigation } from '@react-navigation/core';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
const API_KEY = "AIzaSyDzpKfhmv_n_OyvEZYaCM6l-bDTRUKgp8E"

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation()

    return (
        <SafeAreaView style={[tw`bg-white flex-1`]}>
            <Text style={[tw`bg-white text-center p-3 pl-0 text-lg`]}>Hello Dmitry!</Text>
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
            </View >
            <NavFavourites/>
            <View style={[tw`flex-row bg-white justify-evenly py-2 mt-auto`]}>
              <TouchableOpacity style={[tw`flex flex-row justify-between bg-black w-24 py-3 rounded-full px-4`]}
                onPress={()=>{
                  navigation.navigate('RideOptionsCard')
                }}>
                <Icon name='car' type='font-awesome' color='white' size={16}/>
                <Text style={[tw`text-white text-center`]}>Rides</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`flex flex-row justify-between bg-white w-24 py-3 rounded-full px-4`]}>
                <Icon name='fast-food-outline' type='ionicon' color='black' size={16}/>
                <Text style={[tw`text-black text-center`]}>Eats</Text>
              </TouchableOpacity>
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
