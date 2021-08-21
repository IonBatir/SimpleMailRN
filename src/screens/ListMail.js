import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Spinner, Mail, ErrorAlert} from '../components';
import {COLOR, FONT_SIZE, SPACING} from '../theme';
import {SCREEN} from '../constants';
import sharedStyles from './styles';

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
  mailList: {
    flex: 1,
  },
});

export default function ListMail({navigation}) {
  const [mail, setMail] = React.useState('ionbatir@gmail.com');
  const [mails, setMails] = React.useState({data: [], loading: true});

  React.useEffect(() => {
    if (mail) {
      return () => {};
    }
    Alert.prompt(
      'Email',
      'Enter your email',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: setMail(mail),
        },
      ],
      'plain-text',
    );
  }, [mail]);

  React.useEffect(() => {
    if (!mail) {
      return () => {};
    }
    return firestore()
      .collection('mails')
      .where('to', '==', mail)
      .orderBy('date', 'desc')
      .onSnapshot(
        querySnapshot => {
          const data = [];
          querySnapshot.forEach(doc => {
            const docData = doc.data();
            data.push({
              id: doc.id,
              ...docData,
              date: docData.date?.toDate(),
            });
          });
          setMails({data, loading: false});
        },
        error => {
          console.log(error);
          ErrorAlert();
          setMails({data: [], loading: false});
        },
      );
  }, [mail]);

  const renderMailItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREEN.VIEW_MAIL, {mailId: item.id})
        }>
        <Mail
          key={item.id}
          read={item.read}
          from={item.from}
          subject={item.subject}
          content={item.content}
          date={item.date}
        />
      </TouchableOpacity>
    );
  };

  if (mails.loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREEN.SEND_MAIL, {from: mail})}>
        <Text style={styles.buttonText}>＋</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inbox</Text>
      </View>

      {mails.data.length ? (
        <View style={styles.mailList}>
          <FlatList
            data={mails.data}
            renderItem={renderMailItem}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <View style={sharedStyles.centerContainer}>
          <Text>No Mails!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
