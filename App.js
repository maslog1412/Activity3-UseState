import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// First component: Flashlight
function FlashlightSection({ isFlashlightOn, onToggleFlashlightState, onBackButton }) {
  const getFlashlightImageSource = () => {
    return isFlashlightOn
      ? require('./assets/img/flashOFF.png')
      : require('./assets/img/flashON.png');
  };

  return (
    <>
      <Image
        source={getFlashlightImageSource()}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[
          styles.button,
          isFlashlightOn ? styles.offButton : styles.onButton,
        ]}
        onPress={() => {
          onToggleFlashlightState(!isFlashlightOn);
        }}
      >
        <Text style={[styles.buttonText, isFlashlightOn ? null : styles.onText]}>
          {isFlashlightOn ? 'OFF' : 'ON'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { marginTop: 20 },
        ]}
        onPress={onBackButton}
      >
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </>
  );
}

// Second component: Counter
function CounterSection({ counter, onIncrement, onDecrement, onBackButton }) {
  return (
    <View style={styles.counterSection}>
      <Text style={styles.counterText}>{counter}</Text>
      <View style={styles.counterButtonContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => {
            onDecrement();
          }}
          disabled={false}
        >
          <Text style={styles.counterButtonText}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.counterButton,
            counter === 10 ? styles.disabledButton : null,
          ]}
          onPress={() => {
            onIncrement();
          }}
          disabled={counter === 10}
        >
          <Text style={styles.counterButtonText}>+1</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={[
          styles.button,
          { marginTop: 20 },
        ]}
        onPress={() => {
          onBackButton();
        }}
      >
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main App component
export default function App() {
  const [isFlashlightOn, setFlashlightOn] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isFlashlightSectionVisible, setFlashlightSectionVisible] = useState(false);
  const [isCounterSectionVisible, setCounterSectionVisible] = useState(false);

  // Toggle FLASHLIGHT section
  const toggleFlashlightSection = () => {
    setFlashlightOn(!isFlashlightOn);
    setCounterSectionVisible(false);
    setFlashlightSectionVisible(!isFlashlightSectionVisible);
  };

  // Toggle COUNTER section
  const toggleCounterSection = () => {
    setCounterSectionVisible(!isCounterSectionVisible);
    setFlashlightOn(false);
    setFlashlightSectionVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            (isFlashlightSectionVisible || isCounterSectionVisible) ? styles.disabledButton : null,
            isFlashlightSectionVisible ? styles.buttonPressed : null,
          ]}
          onPress={toggleFlashlightSection}
          disabled={isFlashlightSectionVisible || isCounterSectionVisible}
        >
          <Text style={styles.buttonText}>FLASHLIGHT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            (isCounterSectionVisible || isFlashlightSectionVisible) ? styles.disabledButton : null,
            isCounterSectionVisible ? styles.buttonPressed : null,
          ]}
          onPress={toggleCounterSection}
          disabled={isCounterSectionVisible || isFlashlightSectionVisible}
        >
          <Text style={styles.buttonText}>COUNTER</Text>
        </TouchableOpacity>
      </View>

      {isFlashlightSectionVisible && (
        <FlashlightSection
          isFlashlightOn={isFlashlightOn}
          onToggleFlashlightState={() => setFlashlightOn(!isFlashlightOn)}
          onBackButton={() => setFlashlightSectionVisible(false)}
        />
      )}

      {isCounterSectionVisible && (
        <CounterSection
          counter={counter}
          onIncrement={() => setCounter(counter + 1)}
          onDecrement={() => setCounter(counter - 1)}
          onBackButton={() => setCounterSectionVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  button: {
    backgroundColor: '#6484f4',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonPressed: {
    backgroundColor: 'grey',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 500,
  },
  onButton: {
    backgroundColor: '#5fbf39',
  },
  offButton: {
    backgroundColor: 'red',
  },
  onText: {
    color: 'white',
  },
  counterSection: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  counterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#6484f4',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
