import React, { useState, useEffect } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Details = ({ route, navigation }) => {
  const { store } = route.params;
  const [inputDetails, setInputDetails] = useState([]); // 入力情報の配列を管理するStateに変更

  useEffect(() => {
    loadDetailsFromStorage(); // 保存された入力情報を読み込む
  }, []);

  useEffect(() => {
    saveDetailsToStorage(); // 入力情報が変更されたら保存する
  }, [inputDetails]);

  const loadDetailsFromStorage = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem(`details_${store.name}`);
      if (storedDetails !== null) {
        setInputDetails(JSON.parse(storedDetails));
        console.log('保存できました。');
      }
    } catch (error) {
      console.error('保存できませんでした・', error);
    }
  };

  const saveDetailsToStorage = async () => {
    try {
      await AsyncStorage.setItem(`details_${store.name}`, JSON.stringify(inputDetails));
      console.log('保存できました。');
    } catch (error) {
      console.error('保存できませんでした。', error);
    }
  };

  //追加ボタンがクリックされた場合、同じコンポーネントを増やす動作
  const addComponent = () => {
    const newComponent = {
      id: inputDetails.length + 1,
      memo: '',
      ryou: '',
      price: '',
    };
    setInputDetails([...inputDetails, newComponent]);
  };

  const handleMemoChange = (text, id) => {
    setInputDetails((prevDetails) =>
      prevDetails.map((details) =>
        details.id === id ? { ...details, memo: text } : details
      )
    );
  };

  const handleRyouChange = (text, id) => {
    setInputDetails((prevDetails) =>
      prevDetails.map((details) =>
        details.id === id ? { ...details, ryou: text } : details
      )
    );
  };

  const handlePriceChange = (text, id) => {
    setInputDetails((prevDetails) =>
      prevDetails.map((details) =>
        details.id === id ? { ...details, price: text } : details
      )
    );
  };

  //削除機能
  const removeComponent = (id) => {
    setInputDetails((prevDetails) =>
      prevDetails.filter((details) => details.id !== id)
    );
  };

  const handleInputDone = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.storeName}>{store.name}</Text>

          {/* 入力情報のコンポーネントをマップして表示 */}
          {inputDetails.map((details) => (
            <Swipeout
              key={details.id}
              right={[{
                text: '削除',
                backgroundColor: 'red',
                onPress: () => removeComponent(details.id),
              }]}
              autoClose={true}
              backgroundColor='transparent'
              style={styles.removeButton}
            >
            <View key={details.id} style={styles.containerStyle}>
              <View style={[styles.pulldownStyle1, { width: '40%' }]}>
                <Text style={styles.textStyle}>店舗名</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="店舗名"
                  value={details.memo}
                  onChangeText={(text) => handleMemoChange(text, details.id)}
                  returnKeyType="done"
                  onSubmitEditing={handleInputDone}
                />
              </View>
              <View style={styles.textflex}>
                <View style={styles.pulldownStyle2}>
                  <Text style={styles.textStyle}>量</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="0"
                    keyboardType="numeric"
                    value={details.ryou}
                    onChangeText={(text) => handleRyouChange(text, details.id)}
                    returnKeyType="done"
                    onSubmitEditing={handleInputDone}
                  />
                </View>
                <Text>あたり</Text>
              </View>
              <View style={styles.textflex}>
                <View style={styles.pulldownStyle2}>
                  <Text style={styles.textStyle}>値段</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="0"
                    keyboardType="numeric"
                    value={details.price}
                    onChangeText={(text) => handlePriceChange(text, details.id)}
                    returnKeyType="done"
                    onSubmitEditing={handleInputDone}
                  />
                </View>
                <Text>円</Text>
              </View>
            </View>
            </Swipeout>
          ))}

          {/* "追加"ボタンを表示 */}
          <TouchableOpacity style={styles.saveButton} onPress={addComponent}>
          <View style={styles.deleteContainer}>  
            <Icon name= "plus-circle" 
              size={60} 
              borderRadius= "50"
              color={'#FBB03A'}
              onPress={addComponent} 
            />
          </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    containerStyle1: {
        display: 'flex',
        justifyContent: 'center',
    },
    textflex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pulldownStyle1: {
        borderStyle: 'solid',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    pulldownStyle2: {
      borderStyle: 'solid',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#f0f0f0',
      width: 70,
  },
    textStyle: {
        backgroundColor: '#FBB03A',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        padding: 3,
        fontWeight: 'bold',
    },
    titleInputStyle: {
        fontSize: 24,
        padding: 15,
        borderStyle: 'solid',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    textInputStyle: {
        fontSize: 18,
        padding: 12,
    },
    removeButton: {
      borderRadius: 5,
    },
  deleteContainer: {
    marginTop: 40,
    justifyContent: "flex-start",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Details;