// src/components/DraggableItem.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type DraggableItemProps = {
  children: ReactNode;
  initialX?: number;
  initialY?: number;
};

const DraggableItem = ({ children, initialX = 0, initialY = 0 }: DraggableItemProps) => {
  const x = useSharedValue(initialX);
  const y = useSharedValue(initialY);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: x.value, y: y.value };
    })
    .onUpdate((event) => {
      x.value = event.translationX + context.value.x;
      y.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      // 제스처가 끝나면 원래 위치로 돌아가게 하려면 아래 주석 해제
      // x.value = withSpring(initialX);
      // y.value = withSpring(initialY);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ position: 'absolute' }, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableItem;