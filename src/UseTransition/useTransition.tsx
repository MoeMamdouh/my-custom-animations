import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, useTimingTransition, useSpringTransition, interpolateColor } from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject
  }
});


export default () => {
  const [toggled, setToggled] = useState<0 | 1>(0)

  const transition = useTransition(toggled, { duration: 500 });

  const color = interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: ["red", "yellow"]
  });
  return (
    <Animated.View style={[styles.container, { backgroundColor: color }]}>
      {cards.map((card, index) => {
        const direction = interpolate(index, {
          inputRange: [0, 5],
          outputRange: [-1, 1]

        })

        // const rotate = direction * (toggled ? Math.PI / 6 : 0)
        const rotate = multiply(direction, interpolate(transition, {
          inputRange: [0, 1],
          outputRange: [0, Math.PI / 6]
        }))
        const scale = multiply(1, interpolate(transition, {
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        }))
        // const transformOrigin = -300
        const transformOrigin = multiply(direction, interpolate(transition, {
          inputRange: [0, 1],
          outputRange: [0, 100]
        }))
        return (
          <Animated.View key={card.id} style={[styles.overlay, {
            transform: [
              { translateX: transformOrigin },
              // { translateX: transformOrigin },
              { rotate },
              { scale },
              // { translateX: 20 },
            ]
          }
          ]}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggled(toggled ^ 1)} />
    </Animated.View >
  );
};
