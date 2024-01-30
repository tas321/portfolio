import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeout from 'react-native-swipeout';

const StoreList = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');

  useEffect(() => {
    loadStoresFromStorage();
  }, []);

  const loadStoresFromStorage = async () => {
    try {
      const storedStores = await AsyncStorage.getItem('stores');
      if (storedStores !== null) {
        setStores(JSON.parse(storedStores));
      }
    } catch (error) {
      console.error('Error loading stores from AsyncStorage:', error);
    }
  };

  const handleAddStore = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setNewStoreName('');
  };

  const handleStoreAdded = async () => {
    if (newStoreName.trim() === '') return;

    const newStore = { name: newStoreName };
    setStores([...stores, newStore]);
    await saveStoreToStorage(newStore);

    setIsModalVisible(false);
    setNewStoreName('');
  };

  const saveStoreToStorage = async (store) => {
    try {
      const storedStores = await AsyncStorage.getItem('stores');
      let stores = [];
      if (storedStores !== null) {
        stores = JSON.parse(storedStores);
      }
      stores.push(store);
      await AsyncStorage.setItem('stores', JSON.stringify(stores));
    } catch (error) {
      console.error('Error saving store to AsyncStorage:', error);
    }
  };

  //削除機能
  const removeStore = async (storeName) => {
    const updatedStores = stores.filter((store) => store.name !== storeName);
    setStores(updatedStores);
    await AsyncStorage.setItem('stores', JSON.stringify(updatedStores));
  };

  const handleInputDone = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
        <Text style={styles.header}>リスト</Text>
      {stores.map((store, index) => (
        <Swipeout
          key={index}
          right={[{
            text: '削除',
            backgroundColor: 'red',
            onPress: () => removeStore(store.name),
          }]}
          autoClose={true}
          backgroundColor='transparent'
          style={styles.removeButton}
        >
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('メモ詳細', { store })}
          style={styles.storeButton}
        >
          <Text style={styles.storeText}>{store.name}</Text>
        </TouchableOpacity>
        </Swipeout>
      ))}
      <View style={styles.newaddContainer}>
        <TouchableOpacity style={styles.newaddButton} onPress={handleAddStore}>
          <Text style={styles.addButtonText}>新規追加</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="fade" transparent={true} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>商品名入力</Text>
            <TextInput
              value={newStoreName}
              onChangeText={setNewStoreName}
              placeholder="商品名"
              style={styles.textInput}
              returnKeyType="done"
              onSubmitEditing={handleInputDone}
            />
            <View style={styles.modalButton}>
              <TouchableOpacity style={styles.addButton} onPress={handleStoreAdded}>
                <Text style={styles.addButtonText}>追加</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleModalClose}>
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FBB03A',
  },
  storeButton: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#DADADA",
  },
  storeText: {
    fontSize: 24,
  },
  newaddContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  newaddButton: {
    backgroundColor: '#FBB03A',
    padding: 16,
    alignItems: 'center',
    width: '60%',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 20,
  },
  modalButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addButton: {
    backgroundColor: '#FBB03A',
    padding: 14,
    marginRight: 5,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 14,
    marginLeft: 5,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    borderRadius: 5,
  }
});

export default StoreList;