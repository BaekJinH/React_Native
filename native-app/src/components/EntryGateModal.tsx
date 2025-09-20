
import React, { useState } from 'react';
import { Modal, Text, TextInput, Button, View, StyleSheet } from 'react-native';

// 1. props의 타입을 정의합니다.
type EntryGateModalProps = {
  visible: boolean;
  onClose: (name: string) => void;
};

// 2. props를 받아 사용하도록 수정합니다.
const EntryGateModal = ({ visible, onClose }: EntryGateModalProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleEnter = () => {
    if (inputValue.trim()) {
      // 3. 입력받은 이름을 onClose 콜백으로 부모에게 전달합니다.
      onClose(inputValue.trim());
    }
  };

  return (
    // 4. visible prop으로 모달의 표시 여부를 제어합니다.
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to my Portfolio</Text>
        <Text style={styles.subtitle}>May I have your name or affiliation?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Toss Hiring Manager"
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Enter" onPress={handleEnter} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 20 },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    marginBottom: 20,
  },
});

export default EntryGateModal;