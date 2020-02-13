import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { loop } from "react-native-redash";
import { useMemoOne } from "use-memo-one";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { Button, StyleGuide } from "../components";

const {
  Clock,
  Value,
  useCode,
  set,
  block,
  cond,
  startClock,
  stopClock,
  clockRunning,
  and,
  not,
  timing
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background
  }
});

const runTiming = (clock: Animated.Clock): Animated.Node<number> => {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(2),
    duration: 2000,
    easing: Easing.linear
  };
  return block([
    startClock(clock),
    timing(clock, state, config),
    state.position
  ])
};

export default () => {
  const progress = new Value(0)
  const clock = new Clock()
  useCode(
    () => block([set(progress, runTiming(clock))]), []
  );
  console.log('progress ', progress)
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} bubbles={[0, 1, 2, 3, 4, 5]} />
    </View>
  );
};
