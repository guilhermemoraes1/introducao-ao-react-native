import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Book from '@/components/book/Book';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IBook } from '@/interfaces/IBook';
import BookModal from '@/components/modals/BookModal';


export default function BooksListScreen() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = (name: string, author: string, publisher:string, pages:string, isbn: string) => {
        const newBook: IBook = {
            id: Math.random() * 1000,
            name: name,
            author: author,
            publisher: publisher,
            pages: pages,
            isbn: isbn
        };

        const booksPlus: IBook[] = [
            ...books,
            newBook  
        ];

        setBooks(booksPlus);
        setModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <MyScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#ID3047' }}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                <Text style={styles.headerButton}> Add a new book </Text>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.container}>
            
            {books.map(book => <Book key={book.id} title={book.name} author={book.author} publisher={book.publisher} pages={book.pages} isbn={book.isbn}/>)}
            
            </ThemedView>
            
            <BookModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
            />
        </MyScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',   
        justifyContent: 'center'
    },
    headerButton: {
        fontSize: 20,
        paddingHorizontal: 20,
    },
});