import React, { useState, useRef } from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { FlexibleCard as Card, Selection, StyleGuide, cards } from "../components";
const { width } = Dimensions.get("window");
const layouts: Layout[] = [
  {
    id: "column",
    name: "Column",
    layout: {
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  },
  {
    id: "row",
    name: "Row",
    layout: {
      container: {
        flexDirection: "row",
        alignItems: "center"
      }
    }
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: {
      container: {
        flexDirection: "row",
        flexWrap: "wrap"
      },
      child: {
        flex: 0,
        width: width / 2 - StyleGuide.spacing * 2
      }
    }
  }
];

const transition = (
  <Transition.Change interpolation="easeInOut" durationMs={400} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});


export default () => {
  const ref = useRef<TransitioningView>(null);
  const [currentLayout, selectCurrentLayout] = useState(layouts[0].layout)
  return (
    <>
      <Transitioning.View style={[styles.container, currentLayout.container]}  {...{ transition, ref }}>
        {cards.map(card => (
          <Card key={card.id} style={currentLayout.child} {...{ card }} />
        ))}
      </Transitioning.View>
      {layouts.map(({ id, name, layout }) => (
        <Selection
          key={id}
          onPress={() => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            selectCurrentLayout(layout);
          }}
          isSelected={currentLayout === layout}
          {...{ name }}
        />
      ))}
    </>
  );
};
