import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Text } from '@react-three/drei';
import { useVisitorStore } from '../stores/visitorStore';

type CharacterProps = {
  targetPosition: THREE.Vector3;
  triggerZones: { id: string; position: THREE.Vector3 }[];
  onEnterZone: (zoneId: string | null) => void;
};

// forwardRef 추가 - 이것만 변경
export const Character = forwardRef<THREE.Group, CharacterProps>(
  ({ targetPosition, triggerZones, onEnterZone }, ref) => {
    const meshRef = useRef<THREE.Group>(null!);
    const keyboard = useKeyboardControls();
    const currentZone = useRef<string | null>(null);
    const visitorName = useVisitorStore((state) => state.name);
    
    // 컴포넌트 마운트 시 저장된 이름 로드
    useEffect(() => {
      useVisitorStore.getState().loadName();
    }, []);

    // ref 연결 추가
    useImperativeHandle(ref, () => meshRef.current!, []);

    useFrame((state, delta) => {
      if (!meshRef.current) return;

      const currentPosition = meshRef.current.position;
      const moveSpeed = 5;
      const moveDirection = new THREE.Vector3();
      let isMoving = false;

      // --- 1. 이동 방향 결정 ---
      if (keyboard.forward) { moveDirection.z -= 1; isMoving = true; }
      if (keyboard.backward) { moveDirection.z += 1; isMoving = true; }
      if (keyboard.left) { moveDirection.x -= 1; isMoving = true; }
      if (keyboard.right) { moveDirection.x += 1; isMoving = true; }
      
      // 키보드 입력이 없으면, 마우스/터치 타겟으로 방향 설정
      const distanceToTarget = currentPosition.distanceTo(targetPosition);
      if (!isMoving && distanceToTarget > 0.1) {
        moveDirection.subVectors(targetPosition, currentPosition);
        isMoving = true;
      }

      // --- 2. 이동 및 회전 적용 ---
      if (isMoving) {
        moveDirection.normalize();
        const moveDistance = Math.min(distanceToTarget, moveSpeed * delta);
        
        // 키보드 이동일 경우 거리를 무시하고 일정한 속도로 이동
        const finalMoveDistance = (keyboard.forward || keyboard.backward || keyboard.left || keyboard.right) 
          ? moveSpeed * delta 
          : moveDistance;

        const velocity = moveDirection.multiplyScalar(finalMoveDistance);
        currentPosition.add(velocity);

        // 키보드로 움직일 땐 타겟 위치를 현재 위치로 계속 갱신
        if (keyboard.forward || keyboard.backward || keyboard.left || keyboard.right) {
          targetPosition.copy(currentPosition);
        }
        
        // 회전 로직
        const targetQuaternion = new THREE.Quaternion();
        const matrix = new THREE.Matrix4();
        matrix.lookAt(currentPosition.clone().add(moveDirection), currentPosition, meshRef.current.up);
        targetQuaternion.setFromRotationMatrix(matrix);
        meshRef.current.quaternion.slerp(targetQuaternion, 0.2);
      }
      
      // --- 3. 트리거 존 계산 ---
      let inZone = false;
      for (const zone of triggerZones) {
        if (currentPosition.distanceTo(zone.position) < 2.5) {
          if (currentZone.current !== zone.id) {
            onEnterZone(zone.id);
            currentZone.current = zone.id;
          }
          inZone = true;
          break;
        }
      }
      if (!inZone && currentZone.current !== null) {
        onEnterZone(null);
        currentZone.current = null;
      }
    });

    return (
      <group ref={meshRef}>
        {/* 닉네임 Text 컴포넌트 */}
        {visitorName && (
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="black"
          >
            {visitorName}
          </Text>
        )}

        {/* 캐릭터 모델 */}
        <mesh castShadow>
          <boxGeometry args={[0.8, 1.6, 0.8]} />
          <meshStandardMaterial color="tomato" />
        </mesh>
      </group>
    );
  }
);