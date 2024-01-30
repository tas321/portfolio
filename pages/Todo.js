import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image
} from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 各テキストボックスのデータを独立した状態変数に格納する
function TodoScreen() {
  const [inputFields, setInputFields] = useState([
    { id: Date.now(), value: "", checked: false },
  ]);

    // 各テキストボックスの値を格納する状態変数
    const [textValues, setTextValues] = useState([""]);
    

  //keyborad--------------------------
  const [keyboardStatus, setKeyboardStatus] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleInputDone = () => {
    Keyboard.dismiss();
  };
  //keyborad終了--------------------------

  // メイン機能------------------------------

  // addInput : 新しい入力フィールドを追加する
  const addInput = () => {
    setInputFields([
      ...inputFields,
      { id: Date.now(), value: "", checked: false },
    ]);
  };

   // handleInputChange : テキスト入力の変更イベントを処理する
   const handleInputChange = (text, id) => {
    const updatedInputFields = inputFields.map((field) => {
      if (field.id === id) {
        return { ...field, value: text };
      }
      return field;
    });
    setInputFields(updatedInputFields);
  };
  

  // handleCheckboxChange : チェックボックスの変更イベントを処理する
  const handleCheckboxChange = (id) => {
    const updatedInputFields = inputFields.map((field) => {
      if (field.id === id) {
        return { ...field, checked: !field.checked };
      }
      return field;
    });
    setInputFields(updatedInputFields);
  };

  // removeInput : 指定されたIDの入力フィールドを削除する
  const removeInput = (id) => {
    const updatedInputFields = inputFields.filter((field) => field.id !== id);
    setInputFields(updatedInputFields);
  };

  // removeCheckedInputs : チェックされた入力フィールドを削除する
  const removeCheckedInputs = () => {
    const updatedInputFields = inputFields.filter((field) => !field.checked);
    setInputFields(updatedInputFields);
    saveDataToStorage(); //データの保存
  };
  // メイン機能終了---------------------

  // AsyncStorage-----------------------
  // データ保存
  const saveDataToStorage = async () => {
    try {
      const data = JSON.stringify(inputFields);//JSON形式の文字列に変換
      await AsyncStorage.setItem("todoData", data);//todoDataに対応するデータとして変換されたデータを保存
      console.log("Data saved successfully.",inputFields);
    } catch (error) {
      console.log(error);
    }
  };

  // データ読み込み
  const loadDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem("todoData");
      if (data) {
        const parsedData = JSON.parse(data);
        setInputFields(parsedData);
        console.log("Data loaded successfully.",inputFields);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // アプリ再起動時に実行、起動前のデータを呼び出す
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  // inputFieldsが変更されるたびに保存
  useEffect(() => {
    saveDataToStorage();
  }, [inputFields]);
  // 終了-------------

  return (
    /*
    ・<ScrollView>で画面上をタップするとkeyboradが隠れる
    */
  <View style={styles.container}>
    <View style={{width: "90%"}}>
    <SafeAreaView style={{backgroundColor:"#fff"}}>
    <ScrollView scrollEnabled={true} style={styles.scrollView}>
        <Text style={styles.status}>{keyboardStatus}</Text>
        {inputFields.map((inputField) => (
          <View key={inputField.id} style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => handleCheckboxChange(inputField.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  inputField.checked
                    ? styles.checkedCheckbox
                    : styles.uncheckedCheckbox,
                ]}
              >
                {inputField.checked && (
                  <Text style={styles.checkboxText}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={inputField.value}
              onChangeText={(text) => handleInputChange(text, inputField.id)}
              onBlur={saveDataToStorage}
              returnKeyType="done"
              onSubmitEditing={handleInputDone}
            />
          </View>
        ))}
        <View style={styles.deleteContainer}>  
          <Icon name= "plus-circle" 
            size={60} 
            borderRadius= "50"
            color={'#FBB03A'}
            onPress={addInput} 
          />
        </View>
        <View style={styles.buttonContainer}>
          <Icon name="delete-circle"
            size={60} 
            borderRadius= "50"
            color={'#FBB03A'}
            onPress={removeCheckedInputs} 
          />
        </View>
        <Text style={styles.status}>{keyboardStatus}</Text>
    </ScrollView>
    </SafeAreaView>
    </View>
  </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#888888',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  uncheckedCheckbox: {
    backgroundColor: "transparent",
  },
  checkboxText: {
    color: "#FBB03A",
    fontSize: 24,
  },
  input: {
    flex: 1,
    height: 65,
    borderBottomWidth: 1,
    borderColor: "#DADADA",
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 24,
  },
  buttonContainer: {
    // flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  deleteContainer: {
    // marginTop: 60,
    // flexDirection: "row",
    justifyContent: "flex-start",
  },
  status: {
    marginTop: 16,
    textAlign: "center",
  },
//   scrollView: {
//     marginHorizontal: 20,
// },
});

export default TodoScreen;

