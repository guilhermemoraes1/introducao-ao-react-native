import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { IBook } from '@/interfaces/IBook';

export type BookModalProps = {
    visible: boolean;
    onAdd: (title: string, author: string,publisher: string, pages: string, isbn: string) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    book?: IBook;
};

export default function BookModal({ visible, onAdd, onCancel, onDelete, book }: BookModalProps) { 

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState('');
    const [isbn, setIsbn] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        if(book){
            setTitle(book.name);
            setAuthor(book.author);
            setPublisher(book.publisher);
            setPages(book.pages);
            setIsbn(book.isbn);
            setId(book.id);
        } else {
            setTitle('');
            setAuthor('');
            setPublisher('');
            setPages('');
            setIsbn('');
            setId(0);
        }
    }, [book])

    return (
        <Modal visible={visible} animationType="fade" transparent={true} >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    value={title}
                    onChangeText={text => setTitle(text)}
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    value={author}
                    onChangeText={text => setAuthor(text)}
                    placeholder='Author'
                />
                <TextInput
                    style={styles.input}
                    value={publisher}
                    onChangeText={text => setPublisher(text)}
                    placeholder='Publisher'
                />
                <TextInput
                    style={styles.input}
                    value={pages}
                    onChangeText={text => setPages(text)}
                    placeholder='Pages'
                />
                <TextInput
                    style={styles.input}
                    value={isbn}
                    onChangeText={text => setIsbn(text)}
                    placeholder='ISBN'
                />

                
                <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title, author, publisher, pages, isbn, id)}>
                    <Text>Add</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id <= 0}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    buttonAdd: {
        padding: 10,
        margin: 10,
        backgroundColor: '#90EE90',
        borderRadius: 5
    },
    buttonCancel: {
        padding: 10,
        margin: 10,
        backgroundColor: '#FFB347',
        borderRadius: 5
    },
    buttonDelete: {
        padding: 10,
        margin: 10,
        backgroundColor: '#FF7F7F',
        borderRadius: 5
    }
});

