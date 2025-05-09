import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Book from '@/components/book/Book';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IBook } from '@/interfaces/IBook';
import BookModal from '@/components/modals/BookModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function BooksListScreen() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook>();
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@App:books");
                const booksData = data != null ? JSON.parse(data) : [];
                setBooks(booksData);
            } catch (error) {
            }
        }

        getData()
    }, [])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, [])

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

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
            AsyncStorage.setItem("@App:books", JSON.stringify(booksPlus));
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

            AsyncStorage.setItem("@App:books", JSON.stringify(books));
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
        AsyncStorage.setItem("@App:books", JSON.stringify(newBookList));
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
                <Text >{text}</Text>
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