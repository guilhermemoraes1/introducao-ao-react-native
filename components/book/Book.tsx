import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type BookProps = {
    title: string;
    author: string;
    publisher: string;
    pages: string;
    isbn: string;
};

export default function Book({ title, author, publisher, pages, isbn }: BookProps) {
    return (
        <View style={styles.box}>
            <Text style={styles.field}>{title}</Text>
            <Text style={styles.field2}>Author: {author}</Text>
            <Text style={styles.field2}>Publisher: {publisher}</Text>
            <Text style={styles.field2}>{pages} pages</Text>
            <Text style={styles.field2}>ISBN: {isbn}</Text>
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