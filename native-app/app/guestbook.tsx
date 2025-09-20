// app/guestbook.tsx
import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { Link } from 'expo-router';
import SignatureModal from '../src/components/SignatureModal';

const GuestbookScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // TODO: 백엔드에서 저장된 서명 목록을 불러오는 로직 추가
  // const { data: signatures } = useQuery(['signatures'], fetchSignatures);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Guestbook</Text>
      <Button title="서명 남기기" onPress={() => setModalVisible(true)} />

      {/* 여기에 불러온 서명 목록을 표시합니다 */}
      {/* signatures?.map(...) */}

      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SignatureModal onClose={() => setModalVisible(false)} />
      </Modal>

      <Link href="/">
        <Text style={{ color: 'blue', marginTop: 20 }}>돌아가기</Text>
      </Link>
    </View>
  );
};

export default GuestbookScreen;