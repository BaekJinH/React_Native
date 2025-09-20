import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { View, Text as RNText, StyleSheet } from 'react-native';
import * as THREE from 'three';
import { Text, Sky, Cloud } from '@react-three/drei';
import { Character } from '../src/components/Character';
// import { useModalStore } from '../src/stores/modalStore'; // 💡 모달 제어를 위한 Zustand 스토어 (추후 생성)
import CameraRig from '../src/components/CameraRig';

// 포트폴리오 섹션들의 위치를 더 넓게 재정의합니다.
const ZONES = [
  { id: 'projects', position: new THREE.Vector3(15, 0.1, 0), label: 'Projects' },
  { id: 'skills', position: new THREE.Vector3(-15, 0.1, 0), label: 'Skills' },
  { id: 'guestbook', position: new THREE.Vector3(0, 0.1, -15), label: 'Guestbook' },
];

// 🎨 [개선] 트리거 존 컴포넌트 디자인 강화
const TriggerZone = ({ position, label }: { position: THREE.Vector3; label: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <Text
        position={[0, 2, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        {label}
      </Text>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial color={hovered ? '#a3b18a' : '#588157'} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// 🎨 [추가] 월드를 꾸미기 위한 장식 요소 컴포넌트
const Decorations = () => {
    const decorations = useMemo(() => 
        Array.from({ length: 100 }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                0.5,
                (Math.random() - 0.5) * 100
            ),
            scale: Math.random() * 0.5 + 0.2,
        })), []
    );

    return (
        <group>
            {decorations.map((props, i) => (
                <mesh key={i} {...props}>
                    <boxGeometry />
                    <meshStandardMaterial color="#344e41" />
                </mesh>
            ))}
        </group>
    );
};


const InteractiveWorld = () => {
  const [target, setTarget] = useState(() => new THREE.Vector3(0, 0, 10));
  const characterRef = useRef<THREE.Group>(null!);
  
  const handleEnterZone = (zoneId: string | null) => {
    console.log('Entered zone:', zoneId);
    // 예시: useModalStore.getState().openModal(zoneId);
  };
  
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    setTarget(new THREE.Vector3(event.point.x, 0, event.point.z));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1d3557' }}>
      <RNText style={styles.debugText}>3D 월드 로딩 중...</RNText>
      <Canvas 
        shadows 
        camera={{ position: [0, 5, 10], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <CameraRig characterRef={characterRef} />
        
        <Sky sunPosition={[100, 20, 100]} />
        <Cloud position={[-10, 10, -15]} speed={0.2} opacity={0.5} />
        
        <fog attach="fog" args={['#1d3557', 20, 80]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}  // 이 부분만 수정됨
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Character 
            ref={characterRef}  // ref 추가
            targetPosition={target} 
            triggerZones={ZONES}
            onEnterZone={handleEnterZone}
          />
        </Suspense>

        {ZONES.map(zone => <TriggerZone key={zone.id} {...zone} />)}
        
        <Decorations />

        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          onPointerDown={handlePointerDown}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#3a5a40" />
        </mesh>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  debugText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 16,
    zIndex: 1000,
  },
});

export default InteractiveWorld;