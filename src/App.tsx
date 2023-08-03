import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {
  getPermissionCamera,
  getPermissionReadStorage,
  getPermissionWriteStorage,
} from './libs/permission';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Camera} from 'react-native-vision-camera';

export default function App() {
  const [device, setDevice] = useState<any>(null);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    async function _getCameras() {
      await getPermissionCamera();
      await getPermissionReadStorage();
      await getPermissionWriteStorage();
      const arrayDev = await Camera.getAvailableCameraDevices();
      const devFront = arrayDev.find(e => e.position === 'front');
      setDevice(devFront);
    }
    _getCameras();
  }, []);

  useEffect(() => {
    if (barcodes && barcodes.length > 0) {
      console.log(barcodes[0].rawValue);
    }
  }, [barcodes]);

  return (
    <View style={styles.container}>
      {device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
