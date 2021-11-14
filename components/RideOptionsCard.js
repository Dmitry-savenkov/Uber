import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: 'Uber-X',
        title: 'UberX',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Uber-XL',
        title: 'UberXL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'UberLux',
        title: 'Uber LUX',
        multiplier: 1.74,
        image: 'https://links.papareact.com/7pf',
    }
]
const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null)
    return (
        
        <SafeAreaView style={[tw`bg-white flex-grow`]}>
            <View style={{flexDirection:'row'}}>
                <View>
                <TouchableOpacity 
                  onPress={()=> navigation.navigate('NavigateCard')
                  }
                  style={tw`-mt-10 p-3 top-3 z-50 left-5 left-5 mr-5 rounded-full`}
                >
                    <Icon name='chevron-left' type='fontawesome' size={25}/>
                </TouchableOpacity>
                </View>
                <Text style={[tw`-mt-10 text-center py-5 text-xl ml-20`]}>Select a Ride</Text>
            </View>
            <FlatList 
              data={data}
              keyExtractor={(item)=>item.id}
              renderItem={({item:{ id, title, multiplier, image}, item})=>(
                <TouchableOpacity 
                  style={[tw`pr-8 flex-row justify-between items-center ${id === selected?.id && 'bg-gray-200'}`]}
                  onPress={()=>{
                      setSelected(item)
                  }}
                >
                    <Image 
                      style={{
                          width:100,
                          height:100,
                          resizeMode:'contain',
                          marginLeft:30,
                      }}
                      source={{uri:image}}
                    />
                    <View style={[tw`-ml-6`]}>
                      <Text style={[tw`text-xl font-semibold`]}>{title}</Text>
                      <Text>Travel time</Text>
                    </View>
                    <View>
                      
                      <Text style={[tw`text-xl`]}>99$</Text>
                    </View>
                    
                    
                </TouchableOpacity>
                
              )}
            />
            <View> 
                <TouchableOpacity disabled={!selected} style={[tw`-mt-10 bg-black py-3 m-3 ${!selected && 'bg-gray-200'}`]}>
                    <Text style={[tw`text-xl text-white text-center`]}>Chouse {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
