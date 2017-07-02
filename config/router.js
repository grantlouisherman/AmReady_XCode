import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Button } from 'react-native';
import Home from '../app/screens/Home';
import AlarmForm from '../app/screens/AlarmForm';
import { getAlarmsFromAsyncStorage, createAlarmsInAsyncStorage, selectAlarm } from '../app/redux';

class MainNavigator extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {
		this.props.seedDatabase(require('../seed').alarms); // only need to do this once for seeding async storage
		// this.props.getAlarms();
	}

	render () {
		return <Navigator screenProps={{...this.props}} />
	}
}

const Navigator = StackNavigator({
	home: {
		screen: Home,
		navigationOptions: ({navigation}) => ({
			title: 'My Alarms',
			headerRight: <Button title={'+'} onPress={ () =>
				navigation.navigate('alarmDetail', {alarms: null})
			} />
		})
	},
	alarmDetail: {
		screen: AlarmForm,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.alarmName,
			headerRight: <Button title={'Save'} onPress={ () =>
				navigation.state.params.handleSave() } />
		})
	}
})

const mapStateToProps = ({name, alarms, locations, currentAlarm}) => {
	return {
		name,
		alarms,
		locations,
		currentAlarm
	}
}

const mapDispatchToProps = (dispatch) => ({
	getAlarms: () => dispatch(getAlarmsFromAsyncStorage()),
	setCurrentAlarm: (alarm, alarmIndex) => dispatch(selectAlarm(alarm, alarmIndex)),
	seedDatabase: (alarms) => dispatch(createAlarmsInAsyncStorage(alarms))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
