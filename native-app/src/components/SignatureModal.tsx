// src/components/SignatureModal.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignatureView from 'react-native-signature-canvas';
import { useVisitorStore } from '../stores/visitorStore';
import axios from 'axios';

const SignatureModal = ({ onClose }: { onClose: () => void }) => {
  const visitorName = useVisitorStore((state) => state.name);

  const handleSave = async (signature: string) => {
    try {
      // ❗️주의: YOUR_SERVER_IP는 실제 백엔드 서버의 주소로 변경해야 합니다.
      await axios.post('http://192.168.0.1:3001/api/signatures', {
        name: visitorName,
        signatureImage: signature,
      });
      alert('서명이 저장되었습니다!');
      onClose();
    } catch (error) {
      console.error("서명 저장 실패:", error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleEmpty = () => {
    console.log('서명이 비어있습니다.');
  };

  return (
    <View style={{ flex: 1 }}>
      <SignatureView
        onOK={handleSave}
        onEmpty={handleEmpty}
        descriptionText="방명록에 서명을 남겨주세요."
        clearText="다시 그리기"
        confirmText="저장"
        webStyle={`.m-signature-pad--footer {display: none;} body {background-color: #f0f0f0;}`}
      />
    </View>
  );
};

export default SignatureModal;