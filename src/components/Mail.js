import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLOR, FONT_SIZE, SPACING} from '../theme';

const formatDate = date =>
  date?.toLocaleString('ro-RO', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginVertical: SPACING.MEDIUM,
    marginRight: 10,
    marginLeft: SPACING.MEDIUM,
  },
  dotUnread: {
    backgroundColor: 'blue',
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    borderBottomColor: COLOR.GREY,
    borderBottomWidth: 0.25,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromText: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: 'bold',
  },
  dateText: {
    color: COLOR.GREY,
    marginRight: SPACING.MEDIUM,
  },
  contentText: {
    color: COLOR.GREY,
    marginTop: SPACING.EXTRA_SMALL,
  },
});

export default function Mail({read, from, subject, content, date}) {
  return (
    <View style={styles.container}>
      <View style={read ? styles.dot : [styles.dot, styles.dotUnread]} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.fromText}>{from}</Text>
          <Text style={styles.dateText}>{`${formatDate(date)} ›`}</Text>
        </View>
        <Text>{subject}</Text>
        <Text style={styles.contentText} numberOfLines={1}>
          {content}
        </Text>
      </View>
    </View>
  );
}
