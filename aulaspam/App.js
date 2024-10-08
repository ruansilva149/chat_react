import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import socket from "./socket"; // Certifique-se de que o socket está configurado corretamente

export default function App() {
  const [room] = useState('default'); // Define a sala padrão
  const [messageUser1, setMessageUser1] = useState('');
  const [messageUser2, setMessageUser2] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const sendMessageUser1 = () => {
    if (messageUser1.trim()) {
      const message = { sender: 'Tico', message: messageUser1 };
      socket.emit('send_message', { room, ...message });
      setReceivedMessages(prev => [...prev, message]);
      setMessageUser1('');
    }
  };

  const sendMessageUser2 = () => {
    if (messageUser2.trim()) {
      const message = { sender: 'Teco', message: messageUser2 };
      socket.emit('send_message', { room, ...message });
      setReceivedMessages(prev => [...prev, message]);
      setMessageUser2('');
    }
  };

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (msg) => {
      setReceivedMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'Tico' ? styles.messageUser1 : styles.messageUser2}>
      <Text style={styles.senderText}>{item.sender}:</Text>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <Text style={styles.title}>Chat User 1</Text>
        <FlatList
          data={receivedMessages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageList}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={messageUser1}
          onChangeText={setMessageUser1}
        />
        <Pressable style={styles.button} onPress={sendMessageUser1}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </Pressable>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.title}>Chat User 2</Text>
        <FlatList
          data={receivedMessages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageList}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={messageUser2}
          onChangeText={setMessageUser2}
        />
        <Pressable style={styles.button} onPress={sendMessageUser2}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Mudança para alinhamento lado a lado
    backgroundColor: '#f4f4f4',
  },
  chatContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageUser1: {
    alignSelf: 'flex-start', // User 1 à esquerda
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageUser2: {
    alignSelf: 'flex-end', // User 2 à direita
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  senderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageText: {
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
