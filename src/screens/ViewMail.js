import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {COLOR, FONT_SIZE, SPACING} from '../theme';

const avatars = [
  '\u{1F466}',
  '\u{1F467}',
  '\u{1F468}',
  '\u{1F469}',
  '\u{1F470}',
  '\u{1F471}',
  '\u{1F472}',
  '\u{1F473}',
  '\u{1F474}',
  '\u{1F475}',
  '\u{1F476}',
  '\u{1F477}',
  '\u{1F478}',
  '\u{1F482}',
  '\u{1F575}',
  '\u{1F9D1}',
  '\u{1F9D2}',
  '\u{1F9D3}',
  '\u{1F9D4}',
  '\u{1F9D5}',
  '\u{1F9DB}',
  '\u{1F385}',
  '\u{1F936}',
  '\u{1F9D9}',
  '\u{1F9B8}',
  '\u{1F9B9}',
  '\u{1F9DC}',
  '\u{1F9DD}',
];

const formatDate = date =>
  date?.toLocaleString('ro-RO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingLeft: SPACING.MEDIUM,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: SPACING.SMALL,
    borderBottomColor: COLOR.GREY,
    borderBottomWidth: 0.25,
  },
  avatar: {
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    marginRight: SPACING.SMALL,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fromText: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: 'bold',
  },
  dateText: {
    alignSelf: 'flex-end',
    color: COLOR.GREY,
    marginRight: SPACING.MEDIUM,
  },
  toText: {
    color: COLOR.GREY,
  },
  subject: {
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontWeight: 'bold',
    marginVertical: SPACING.MEDIUM,
  },
  content: {},
});

export default function ViewMail({route}) {
  const {mailId} = route.params;
  const [mail, setMail] = React.useState();

  React.useEffect(() => {
    const doc = firestore().collection('mails').doc(mailId);
    doc.update({read: true}).then(() => {
      doc.get().then(value => {
        const docData = value.data();
        setMail({
          id: doc.id,
          ...docData,
          date: docData.date?.toDate(),
        });
      });
    });
  }, [mailId]);

  return !mail ? (
    <View>
      <Text>No mail</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>
          {avatars[Math.floor(Math.random() * avatars.length)]}
        </Text>
        <View style={styles.column}>
          <Text style={styles.fromText}>{mail.from}</Text>
          <Text>
            To: <Text style={styles.toText}>Me</Text>
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.dateText}>{formatDate(mail.date)}</Text>
        </View>
      </View>
      <Text style={styles.subject}>{mail.subject}</Text>
      <Text style={styles.content}>{mail.content}</Text>
    </View>
  );
}
