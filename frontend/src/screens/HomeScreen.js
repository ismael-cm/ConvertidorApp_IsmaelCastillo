import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías de Conversión</Text>
      
      <TouchableOpacity style={styles.button} onPress={
            () => navigation.navigate('Conversion', { type: 'longitud' })}>
        <MaterialIcons name="check" size={24} color="white" />
        <Text style={styles.buttonText}>Conversión de Longitud</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={
            () => navigation.navigate('Conversion', { type: 'peso' })}>
        <MaterialIcons name="check" size={24} color="white" />
        <Text style={styles.buttonText}>Conversión de Peso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={
            () => navigation.navigate('Conversion', { type: 'temperatura' })}>
        <MaterialIcons name="check" size={24} color="white" />
        <Text style={styles.buttonText}>Conversión de Temperatura</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
