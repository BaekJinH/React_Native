import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useVisitorStore } from '../src/stores/visitorStore';
import EntryGateModal from '../src/components/EntryGateModal';
import { View } from 'react-native';

export default function RootLayout() {
  const { name, setName, loadName } = useVisitorStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const checkVisitor = () => {
      // visitorStore의 loadName 함수 사용
      loadName();
      
      // 잠시 후 이름이 로드되었는지 확인
      setTimeout(() => {
        const currentName = useVisitorStore.getState().name;
        if (currentName) {
          // 이름이 있으면 게이트를 보여주지 않음
          setShowGate(false);
        } else {
          // 이름이 없으면 게이트를 보여줌
          setShowGate(true);
        }
        setIsLoading(false);
      }, 100);
    };
    checkVisitor();
  }, [loadName]);

  const handleGateClose = (enteredName: string) => {
    setName(enteredName); // Zustand와 AsyncStorage에 이름 저장
    setShowGate(false);
  };

  if (isLoading) {
    // 로딩 중에는 빈 화면을 보여줍니다.
    return <View style={{ flex: 1, backgroundColor: '#1a1a1a' }} />;
  }

  return (
    <>
      <EntryGateModal visible={showGate} onClose={handleGateClose} />
      
      <Stack screenOptions={{ headerShown: false }}>
        {/* 'index'는 app/index.tsx 파일을 가리킵니다. */}
        <Stack.Screen name="index" /> 
        
        {/* 나중에 만들 다른 화면들의 경로입니다. */}
        <Stack.Screen name="projects" options={{ presentation: 'modal' }} />
        <Stack.Screen name="terminal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="guestbook" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
