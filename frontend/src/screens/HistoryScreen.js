import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function History() {
    const [conversions, setConversions] = useState([]); 

    useFocusEffect(
        React.useCallback(() => {
            const loadConversions = async () => {
                try {
                    const storedConversions = await AsyncStorage.getItem('conversions');
                    if (storedConversions) {
                        setConversions(JSON.parse(storedConversions)); 
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            loadConversions();
        }, [])
    );

    // Función para borrar todos los datos
    const clearHistory = async () => {
        try {
            await AsyncStorage.removeItem('conversions'); // Limpiar solo el historial de conversiones
            setConversions([]); // Actualizar el estado para que la lista esté vacía
            Alert.alert('Historial borrado', 'Todos los datos de conversión han sido eliminados.'); // Mensaje de confirmación
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo borrar el historial.'); // Mensaje de error
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Conversión</Text>
            <TouchableOpacity style={styles.button} onPress={clearHistory}>
                <Text style={styles.buttonText}>Borrar Historial</Text>
            </TouchableOpacity>
            <FlatList
                data={conversions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.historyItem}>{item}</Text>
                )}
                style={styles.historyList}
                ListEmptyComponent={<Text>No hay conversiones guardadas.</Text>} // Mensaje para lista vacía
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    historyList: {
        marginTop: 20,
    },
    historyItem: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {
        backgroundColor: '#f44336', // Color rojo para el botón
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
