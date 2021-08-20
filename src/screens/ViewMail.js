import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ViewMail() {
  return (
    <View style={styles.container}>
      <Text>View Mail</Text>
    </View>
  );
}
