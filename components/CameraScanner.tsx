// components/CameraScanner.tsx
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type CameraScannerProps = {
  onScan: (data: string) => void;
  facing?: CameraType;
  scanOnce?: boolean; // disables scanning after first match
};

export const CameraScanner = ({
  onScan,
  facing = 'back',
  scanOnce = true,
}: CameraScannerProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanOnce && scanned) return;
    setScanned(true);
    onScan(data);
  };

  if (!permission) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera permission to continue.</Text>
        <Text onPress={() => requestPermission()} style={styles.permissionButton}>Grant</Text>
      </View>
    );
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      facing={facing}
      onBarcodeScanned={handleBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'], // can extend to barcodes, PDF417, etc
      }}
    >
      {/* Optional UI overlays can be added here */}
    </CameraView>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    fontSize: 16,
    color: '#007bff',
  },
});
