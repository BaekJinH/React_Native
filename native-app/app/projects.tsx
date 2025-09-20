// app/projects.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const ProjectsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>프로젝트 목록 화면</Text>
      <Link href="/">
        <Text style={{ color: 'blue', marginTop: 20 }}>책상으로 돌아가기</Text>
      </Link>
    </View>
  );
};

export default ProjectsScreen;