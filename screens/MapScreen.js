import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions';

export default function MapScreen() {
  return (
      <SafeAreaView style={[tw`bg-white h-full`]}>
        <Text>hi</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
  },
});
