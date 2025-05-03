import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { IVenda } from '@/interfaces/IVenda';

export type VendaModalProps = {
    visible: boolean;
    onAdd: (produto: string, preco: string) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    venda?: IVenda;
};

export default function VendaModal({ visible, onAdd, onCancel, onDelete, venda }: VendaModalProps) { 

    const [produto, setProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        if(venda){
            setProduto(venda.produto);
            setPreco(venda.preco);
            setId(venda.id);
        } else {
            setProduto('');
            setPreco('');
            setId(0);
        }
    }, [venda])

    return (
        <Modal visible={visible} animationType="fade" transparent={true} >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Produto'
                    value={produto}
                    onChangeText={text => setProduto(text)}
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    value={preco}
                    onChangeText={text => setPreco(text)}
                    placeholder='Preço'
                />
                
                <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(produto, preco, id)}>
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
