import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConversionScreen({ route, navigation }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnitFrom, setSelectedUnitFrom] = useState(null);
  const [selectedUnitTo, setSelectedUnitTo] = useState(null);
  const [result, setResult] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [conversions, setConversions] = useState([]);

  const { type } = route.params;

  const configValues = {
    longitud: [
      { label: 'Metros', value: 1 },
      { label: 'Kilómetros', value: 1000 },
      { label: 'Millas', value: 1609.34 },
      { label: 'Pulgadas', value: 0.0254 },
    ],
    peso: [
      { label: 'Gramos', value: 1 },
      { label: 'Kilogramos', value: 1000 },
      { label: 'Libras', value: 453.592 },
    ],
    temperatura: [
      { label: 'Grados Celsius', value: 1 },
      { label: 'Grados Fahrenheit', value: 33.8 },
      { label: 'Kelvin', value: 274.15 },
    ],
  };

  const units = configValues[type] || [];


  useEffect(() => {
    if (units.length > 0 && !initialized) {
      setSelectedUnitFrom(units[0].label);
      setSelectedUnitTo(units[1].label);
      setInitialized(true);
    }
  }, [units, initialized]);

  useEffect(() => {
    const loadConversions = async () => {
      try {
        const storedConversions = await AsyncStorage.getItem('conversions');
        if (storedConversions) {
          setConversions(JSON.parse(storedConversions)); // Parse the JSON string
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadConversions();
  }, []);

  useEffect(() => {
    const saveConversions = async () => {
      try {
        await AsyncStorage.setItem('conversions', JSON.stringify(conversions));
      } catch (error) {
        console.log(error);
        Alert.alert('Error guardando historial');
      }
    };
    if (conversions.length > 0) {
      saveConversions(); // Only save when there are conversions
    }
  }, [conversions]);

  const handleConversion = () => {
    if (selectedUnitFrom === selectedUnitTo) {
      Alert.alert('Selecciona magnitudes diferentes!');
      return;
    }
    if (!inputValue) {
      Alert.alert('Ingresa un valor a convertir');
      return;
    }

    const fromUnit = units.find(unit => unit.label === selectedUnitFrom)?.value || 1;
    const toUnit = units.find(unit => unit.label === selectedUnitTo)?.value || 1;

    let conversionResult = 0;
    if (type === 'temperatura') {
      // Manejo especial para conversión de temperaturas
      if (selectedUnitFrom === 'Grados Celsius' && selectedUnitTo === 'Grados Fahrenheit') {
        conversionResult = (parseFloat(inputValue) * 9 / 5) + 32; // Celsius a Fahrenheit
      } else if (selectedUnitFrom === 'Grados Fahrenheit' && selectedUnitTo === 'Grados Celsius') {
        conversionResult = (parseFloat(inputValue) - 32) * 5 / 9; // Fahrenheit a Celsius
      } else if (selectedUnitFrom === 'Grados Celsius' && selectedUnitTo === 'Kelvin') {
        conversionResult = parseFloat(inputValue) + 273.15; // Celsius a Kelvin
      } else if (selectedUnitFrom === 'Kelvin' && selectedUnitTo === 'Grados Celsius') {
        conversionResult = parseFloat(inputValue) - 273.15; // Kelvin a Celsius
      } else if (selectedUnitFrom === 'Grados Fahrenheit' && selectedUnitTo === 'Kelvin') {
        conversionResult = (parseFloat(inputValue) - 32) / 1.8 + 273.15; // Fahrenheit a Kelvin
      } else if (selectedUnitFrom === 'Kelvin' && selectedUnitTo === 'Grados Fahrenheit') {
        conversionResult = (parseFloat(inputValue) - 273.15) * 1.8 + 32; // Kelvin a Fahrenheit
      }
    } else {
      // Para longitud y peso
      conversionResult = (parseFloat(inputValue) * fromUnit) / toUnit;
    }

    const resultStr = `${inputValue} ${selectedUnitFrom} = ${conversionResult.toFixed(2)} ${selectedUnitTo}`;
    
    // Agregar al historial de conversiones
    setConversions(prevConversions => [...prevConversions, resultStr]);
    setResult(resultStr);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversión de {type}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa un valor"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Text style={styles.label}>De:</Text>
      <Picker
        selectedValue={selectedUnitFrom}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedUnitFrom(itemValue)}
      >
        {units.map((unit, index) => (
          <Picker.Item key={index} label={unit.label} value={unit.label} />
        ))}
      </Picker>

      <Text style={styles.label}>A:</Text>
      <Picker
        selectedValue={selectedUnitTo}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedUnitTo(itemValue)}
      >
        {units.map((unit, index) => (
          <Picker.Item key={index} label={unit.label} value={unit.label} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Convertir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerButton} onPress={() => navigation.goBack()}>
        <Text style={styles.dangerButtonText}>Volver</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  dangerButton: {
    backgroundColor: '#f44336', // Color rojo para el botón
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  dangerButtonText: {
      color: 'white',
      fontSize: 18,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  historyList: {
    marginTop: 20,
  },
  historyItem: {
    fontSize: 16,
    padding: 5,
  },
});
