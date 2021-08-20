import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
  },
});

export default function SendMail() {
  return (
    <View style={styles.container}>
      <Text>Send Mail</Text>
    </View>
  );
}
