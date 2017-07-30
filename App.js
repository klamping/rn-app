import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';

let AnimatedCircle = Animated.createAnimatedComponent(Svg.Circle);

class BreathingIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r: new Animated.Value(50)
    };

    this.state.r.addListener( (circleRadius) => {
      this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
    });

    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    Animated.timing(this.state.r, { toValue: 100, easing: Easing.ease, duration: 1000 }).start();

    setTimeout( () => {
      Animated.timing(this.state.r, { toValue: 50, easing: Easing.ease, duration: 1000 }).start();
    }, 2000)
  }

  render() {
    return (
      <Svg height="200" width="200">
        <AnimatedCircle
          cx="50"
          cy="50"
          r={this.state.r}
          ref={ ref => this._myCircle = ref }
          fill="green"
          onPress={this._onPressButton}
        />
      </Svg>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BreathingIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
