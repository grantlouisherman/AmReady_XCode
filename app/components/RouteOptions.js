import React, {Component} from 'react';
import { StyleSheet, Text, View , Button,TextInput, Image } from 'react-native';


export default function({transit,icon, index, selectRoute, duration}) {
  return (
    <View>
      <Text>{transit} </Text>

      <Text>Duration</Text>
      <Text> {duration} </Text>
      
      <Image  
      style={{width: 20, height: 20}}
      source = {{uri: `https:${icon}`}} 
      />
      <Button  title="Select Route"   onPress={() => { selectRoute(index)}}/>
    </View>
  )
}


// <Text>"Duration: " {props.duration}</Text>