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
    const [selectedBook, setSelectedBook] = useState<IBook>();

    const onAdd = (name: string, author: string, publisher:string, pages:string, isbn: string, id?: number) => {

        if (!id || id <= 0) {
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
        } else {
            books.forEach(book => {
                if(book.id == id) {
                    book.name = name;
                    book.author = author;
                    book.publisher = publisher;
                    book.pages = pages;
                    book.isbn = isbn;
                }
            })
        }
        
        setModalVisible(false);
    };

    const onDelete = (id: number) => {
        const newBookList: Array<IBook> = [];

        for (let index = 0; index < books.length; index++) {
            const book = books[index];

            if(book.id != id) {
                newBookList.push(book);
            }
        }

        setBooks(newBookList);
        setModalVisible(false);
    }

    const openModal = () => {
        setSelectedBook(undefined);
        setModalVisible(true);
    };

    const openEditModal = (selectedBook: IBook) => {
        setSelectedBook(selectedBook);
        setModalVisible(true);
    }

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
            
            {books.map(book => 
            <TouchableOpacity onPress={() => openEditModal(book)}>
                <Book key={book.id} title={book.name} author={book.author} publisher={book.publisher} pages={book.pages} isbn={book.isbn}/>
            </TouchableOpacity>
            
            )}
            
            </ThemedView>
            
            <BookModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                book={selectedBook}
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