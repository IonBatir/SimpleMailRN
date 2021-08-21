import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {COLOR, FONT_SIZE, SPACING} from '../theme';
import {SCREEN} from '../constants';
import {Spinner} from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingTop: SPACING.MEDIUM,
  },
  input: {
    fontSize: FONT_SIZE.MEDIUM,
    marginLeft: SPACING.LARGE,
    marginRight: SPACING.SMALL,
    marginTop: SPACING.LARGE,
    paddingVertical: SPACING.SMALL,
    borderBottomWidth: 0.25,
    borderBottomColor: COLOR.GREY,
  },
  button: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: SPACING.MEDIUM,
    borderRadius: 12,
    backgroundColor: COLOR.SUCCESS,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLOR.WHITE,
  },
});

export default function SendMail({route, navigation}) {
  const [to, setTo] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSendMail = () => {
    setLoading(true);
    firestore()
      .collection('mails')
      .add({
        to,
        subject,
        content,
        from: route.params.from,
        date: firestore.FieldValue.serverTimestamp(),
        read: false,
      })
      .then(() => {
        setLoading(false);
        navigation.navigate(SCREEN.LIST_MAIL);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTo}
        value={to}
        placeholder="To"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSubject}
        value={subject}
        placeholder="Subject"
      />
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
        placeholder="Content"
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendMail}
        disabled={!to || !subject || !content}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}
