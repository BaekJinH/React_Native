import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 이 컴포넌트는 캐릭터의 ref를 받아서 그 위치를 추적합니다.
const CameraRig = ({ characterRef }: { characterRef: React.RefObject<THREE.Group> }) => {
  const cameraGroupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!characterRef.current || !cameraGroupRef.current) return;

    // 캐릭터의 현재 위치를 가져옵니다.
    const characterPosition = characterRef.current.position;
    
    // 카메라 그룹의 위치를 캐릭터의 위치로 부드럽게 이동시킵니다.
    // lerp의 두 번째 인자(0.1)는 카메라가 따라오는 속도를 조절합니다.
    cameraGroupRef.current.position.lerp(characterPosition, 0.1);
    
    // state.camera는 캔버스의 메인 카메라를 가리킵니다.
    // 카메라가 항상 카메라 그룹의 위치를 바라보도록 설정합니다.
    state.camera.lookAt(cameraGroupRef.current.position);
  });
  
  // 이 그룹 안에 카메라가 있다고 상상하면 됩니다.
  return <group ref={cameraGroupRef} />;
};

export default CameraRig;
