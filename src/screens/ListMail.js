import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {SCREEN} from '../constants';
import {COLOR, FONT_SIZE, SPACING} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
    padding: SPACING.EXTRA_SMALL,
  },
  buttonText: {
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: '#007AFF',
  },
  titleContainer: {
    borderBottomColor: COLOR.GREY,
    borderBottomWidth: 0.25,
  },
  title: {
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    fontWeight: 'bold',
    padding: SPACING.SMALL,
  },
});

export default function ListMail({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREEN.SEND_MAIL)}>
        <Text style={styles.buttonText}>＋</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inbox</Text>
      </View>
    </SafeAreaView>
  );
}
