import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import NativeInfo from '../../NativeInfo';
import NativeInfoIos from '../../NativeInfoIos';
const OS = Platform.OS;
export default function Native() {
  const [serviceKeyIos, setServiceKeyIos] = useState('');
  useEffect(() => {
    //set ios service key
    if (OS === 'ios') {
      NativeInfoIos.showServiceKey((error, key) => {
        if (error) {
          console.error(error);
        } else {
          setServiceKeyIos(key);
        }
      });
    }
  }, []);
  return (
    <View style={styles.container}>
      {OS === 'android' ? (
        <View>
          <Text style={styles.title}>ANDROID</Text>
          <Text style={styles.label}>
            Service Key: {NativeInfo.SERVICE_KEY}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>IOS</Text>
          <Text style={styles.label}>Service Key: {serviceKeyIos}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  title: { fontSize: 26 },
  label: { fontSize: 20 },
});
