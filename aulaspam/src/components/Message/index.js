import React, {useEffect, useState} from "react";
import { TextInput, View, Text, Pressable, FlatList } from "react-native";
import socket from "../../../socket";
import style from "./style";

export default function Message(){
    const [message, setMessage] = useState ('');
    const [messageList, setMessageList] = useState ([]);

    function sendMessage() {
       // socket.emit('chat', message)

        //socket.on("chat", () => {
                setMessageList((arr) => [...arr, message]);
        //})

        setMessage("");
    }

    return(
        <View>
            <Text style={style.title}>Digite uma mensagem:</Text>
            <TextInput
                style={style.inputMessage}
                onChangeText={setMessage}
                placeholder="Escreva sua mensagem"
                inputMode="text"
                value={message}
            />
            <Pressable title='Enviar' style={style.button} onPress={() => sendMessage()}>
                <Text>Enviar</Text>
            </Pressable>

            <Text style={{fontWeight:'bold'}}>Mensagens enviadas:</Text>
            <FlatList
                data={messageList.reverse()}
                renderItem={({item}) => {
                    console.log("render", item)
                    return (
                        <Text>{item}</Text>
                    )
                }}
                keyExtractor={(item) => {item}}
            />
        </View>
    );
}