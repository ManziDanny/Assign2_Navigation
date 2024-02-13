import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



const HomeScreen = () => (
  <View style={[styles.screen, styles.center]}>
    <Text style={[styles.screenText, styles.boldText]}>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={[styles.screen, styles.center]}>
    <Text style={[styles.screenText, styles.boldText]}>Profile Screen</Text>
  </View>
);


const CustomDrawerContent = ({ navigation }) => (
  <View style={styles.drawerContent}>
    <View style={styles.drawerHeader}>
      <Text style={styles.drawerHeaderText}>App Drawer</Text>
    </View>
    <Button
      title="Go to Home"
      onPress={() => navigation.navigate('Home')}
    />
    <Button
      title="Go to Profile"
      onPress={() => navigation.navigate('Profile')}
    />
    <Button
      title="Go to Calculator"
      onPress={() => navigation.navigate('Calculator')}
    />
  </View>
);


const Drawer = createDrawerNavigator();


const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 16,
        marginBottom: 5,
      },
      style: {
        backgroundColor: 'lightgray',
      },
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Calculator" component={CalculatorScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContent={({ navigation }) => (
        <CustomDrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  screenText: {
    fontSize: 24, 
  },
  boldText: {
    fontWeight: 'bold',
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    monitor: {
      width: '100%',
      height: 150,
      backgroundColor: '#444',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: 20,
      paddingBottom: 20,
    },
    monitorText: {
      color: '#fff',
      fontSize: 50,
    },
    row: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    buttonText: {
      fontSize: 30,
    },
    operatorButton: {
      backgroundColor: '#f0ad4e',
    },
    clearButton: {
      backgroundColor: '#ac2925',
    },
  });

const CalculatorScreen = () => {
  const [result, setResult] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [calculation, setCalculation] = useState('');

  const handleNum = (num) => {
    if (!operator) {
      setNum1(num1 + num.toString());
      setCalculation(num1 + num.toString());
    } else {
      setNum2(num2 + num.toString());
      setCalculation(num1 + operator + num2 + num.toString());
    }
  };

  const handleOperator = (op) => {
    if (num1) {
      setOperator(op);
      setCalculation(num1 + op);
    }
  };

  const handleResult = () => {
    let res;
    switch (operator) {
      case '+':
        res = Number(num1) + Number(num2);
        break;
      case '-':
        res = Number(num1) - Number(num2);
        break;
      case '*':
        res = Number(num1) * Number(num2);
        break;
      case '/':
        res = Number(num1) / Number(num2);
        break;
    }
    setResult(res.toString());
    setNum1('');
    setNum2('');
    setOperator('');
    setCalculation(num1 + operator + num2 + '=' + res.toString());
  };

  const handleClear = () => {
    setResult('');
    setNum1('');
    setNum2('');
    setOperator('');
    setCalculation('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.monitor}>
        <Text style={styles.monitorText}>{num1} {operator} {num2} {operator && num2 ? '=' : ''}</Text>
        <Text style={[styles.monitorText, styles.resultText]}>{result}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(7)}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(8)}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(9)}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(4)}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(5)}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(6)}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(1)}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(2)}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(3)}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={[styles.buttonText, styles.clearButton]}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResult}>
          <Text style={[styles.buttonText, styles.operatorButton]}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

}

export default App;