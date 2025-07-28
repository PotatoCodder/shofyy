// screens/ScannerScreen.tsx
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { CameraScanner } from '../components/CameraScanner';

export default function ScannerScreen() {
  const handleScan = (data: string) => {
    Alert.alert('Scanned QR Code', data);
    // You can also navigate or handle logic here
  };

  return (
    <View style={styles.container}>
      <CameraScanner onScan={handleScan} />
      <Text style={styles.overlayText}>Scan a QR code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayText: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
