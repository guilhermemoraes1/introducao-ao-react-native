import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type VendaProps = {
    id: number;
    produto: string;
    preco: string;
};

export default function Venda({ produto, preco, id }: VendaProps) {
    return (
        <View style={styles.box}>
            <Text style={styles.field}>{produto}</Text>
            <Text style={styles.field2}>Preço: R${preco}</Text>
            <Text style={styles.field2}>Id da venda: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },
    field: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    field2: {
        fontSize: 15,
    },
});