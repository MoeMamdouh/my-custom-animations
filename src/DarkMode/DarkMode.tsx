import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";


import { Button, Text } from "../components";
import { useTransition, useTimingTransition, useSpringTransition, interpolateColor } from "react-native-redash";
import Switch from "./Switch";
import ProfilePic from "./ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import Followers from "./Followers";

export { profilePic } from "./ProfilePic";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={500} />
  </Transition.Together>
);
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "space-between"
  },
  darkMask: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "black"
  },
  text: {
    textAlign: "center"
  }
});

export default () => {
  const [dark, setDark] = useState<0 | 1>(0)
  const transition = useTransition(dark, { duration: 500 });
  const backgroundColor = interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: ["white", "black"]
  });

  return (
    <View style={styles.container} >
      <Animated.View style={[styles.darkMask, { backgroundColor }]} />
      <Switch
        value={Boolean(dark)}
        onValueChange={value => {
          setDark(Number(value));
        }}
      />
      <ProfilePic />
      <View>
        <Text type="title3" style={styles.text} {...{ dark }}>
          Krzysztof Magiera
        </Text>
        <Text type="headline" style={styles.text} {...{ dark }}>
          Kraków, Poland
        </Text>
      </View>
      <Followers followers={3569} following={310} {...{ dark }} />
      <SocialMediaIcons />
      <Text type="body" style={styles.text} {...{ dark }}>
        When speaking of animations, the key to success is to avoid frame drops
      </Text>
      <Button label="Follow" primary onPress={() => true} />
    </View>
  );
};
