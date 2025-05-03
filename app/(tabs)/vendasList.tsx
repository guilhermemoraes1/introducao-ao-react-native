import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Venda from '@/components/venda/Venda';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IVenda } from '@/interfaces/IVenda';
import VendaModal from '@/components/modals/VendaModal';


export default function BooksListScreen() {
    const [vendas, setVendas] = useState<IVenda[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [idVenda, setIdVenda] = useState(1);
    const [selectedVenda, setSelectedVenda] = useState<IVenda>();

    const onAdd = (produto: string, preco: string, id?: number) => {

        if (!id || id <= 0) {
            const newVenda: IVenda = {
                id: idVenda,
                produto: produto,
                preco: preco
            };
    
            const vendasPlus: IVenda[] = [
                ...vendas,
                newVenda  
            ];

            setVendas(vendasPlus);
            setIdVenda(idVenda + 1);
        } else {
            vendas.forEach(venda => {
                if(venda.id == id) {
                    venda.produto = produto;
                    venda.preco = preco;
                }
            })
        }

        setModalVisible(false);
    };

    const onDelete = (id: number) => {
        const newVendaList: Array<IVenda> = [];

        for (let index = 0; index < vendas.length; index++) {
            const venda = vendas[index];

            if(venda.id != id) {
                newVendaList.push(venda);
            }
        }

        setVendas(newVendaList);
        setModalVisible(false);
    }

    const openModal = () => {
        setSelectedVenda(undefined);
        setModalVisible(true);
    };

    const openEditModal = (selectedVenda: IVenda) => {
        setSelectedVenda(selectedVenda);
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
                <Text style={styles.headerButton}> Adicionar venda no sistema</Text>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.container}>
            
            {vendas.map(venda =>
            <TouchableOpacity onPress={() => openEditModal(venda)}>
                 <Venda key={venda.id} produto={venda.produto} preco={venda.preco} id={venda.id}/>
            </TouchableOpacity>
            )}

            </ThemedView>
            
            <VendaModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                venda={selectedVenda}
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