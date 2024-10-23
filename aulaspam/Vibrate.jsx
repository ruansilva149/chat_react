import React from "react";
import { Vibration, View, Text, Pressable, StyleSheet } from "react-native";

export function Vibrate() {
    const vibrateDevice = () => {
        Vibration.vibrate(500) //Vibrar por 500ms
    };

    return (
        <View>
            <Pressable style={styles.pressable} onPress={vibrateDevice}>
            <Text style={styles.pressableText}>Vibrar</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    pressable: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        backgroundColor: "1e0bd0",
        paddingTop: 14,
        paddingBottom: 14,
        marginTop: 14,
        marginHorizontal: 14
    },
    pressableText: {
        fontSize: 20,
        color: "#fff"
    }
})