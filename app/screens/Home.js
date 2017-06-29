import React from 'react';
import { AsyncStorage } from 'react-native';
import AlarmSelector from '../components/AlarmSelector';
import initialState from '../../seed';

export default class Home extends React.Component {
   constructor () {
      super();
      this.state = {
         'data': initialState
      }
   }
   componentWillMount () {
      this.setData(this.state.data); // use this while testing to initialize local storage
   }

   componentDidMount() {
      AsyncStorage.getItem('data').then((value) => {
         this.setState({data: value});
      });
   }

   setData (value) {
      AsyncStorage.setItem('data', value);
      this.setState({data: value});
   }

   render() {
      return (
         <AlarmSelector
            data = {JSON.parse(this.state.data)}
            setData = {this.setData}
            navigation = {this.props.navigation}
         />
      );
   }
}