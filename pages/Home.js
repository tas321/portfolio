import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";

const Calculator = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [number4, setNumber4] = useState("");
  const [result, setResult] = useState("同じ");

  const calculate = () => {
    //計算式
    const num1 = number1 / number2;
    const num2 = number3 / number4;

    if (num1 < num2) {
      setResult("Aの方がお得");
    } else if (num1 > num2) {
      setResult("Bの方がお得");
    } else {
      setResult("同じ");
    }
    //setResult = {result}
    //setResultの内容が{result}に反映される
    //setResultの中身を貰った画像に変える
  };

  const showTopImage =
    !number1 || !number2 || !number3 || !number4 || result === "同じ";

  const handleInputDone = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          {/* resultの値に応じて表示・非表示を切り替える */}
          {result !== "同じ" &&
            result !== "Aの方がお得" &&
            result !== "Bの方がお得" && <Text>{result}</Text>}

          {result === "Aの方がお得" && (
            <Image
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: 323,
                height: 223,
              }}
              source={require("../assets/maybeA.png")}
            />
          )}
          {result === "Bの方がお得" && (
            <Image
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: 323,
                height: 223,
              }}
              source={require("../assets/maybeB.png")}
            />
          )}
          {result === "同じ" && (
            <Image
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: 323,
                height: 223,
              }}
              source={require("../assets/top.png")}
            />
          )}
        </View>
        {/* <Image style={{marginTop:20, alignSelf: 'center', width: 323, height: 223}} source= {require('../assets/top.png')} /> */}
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <ScrollView scrollEnabled={true}>
            <View style={styles.containerStyle}>
              {result !== "" && <Text>{}</Text>}
              <View 
              style={[
                styles.containerStyle1,
                result === "Bの方がお得" && styles.shadowContainer,
              ]}>
                <Image
                  style={{
                    marginTop: 10,
                    marginLeft: 40,
                    marginBottom: 15,
                    width: 70,
                    height: 70,
                  }}
                  source={require("../assets/sA.png")}
                />
                <Text style={styles.priceText}>価格</Text>
                <View style={styles.textflex}>
                  <TextInput
                    style={styles.frame}
                    placeholder="値段を入力"
                    value={number1}
                    onChangeText={(text) => setNumber1(text)}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleInputDone}
                  />
                  <Text style={styles.currencyText}>円</Text>
                </View>
                <Text style={styles.priceText}>量</Text>
                <TextInput
                  style={styles.amountframe}
                  placeholder="量を入力"
                  value={number2}
                  onChangeText={(text) => setNumber2(text)}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleInputDone}
                />
              </View>

              <View 
              style={[
                styles.containerStyle1,
                result === "Aの方がお得" && styles.shadowContainer,
              ]}>
                <View>
                  <Image
                    style={{
                      marginTop: 10,
                      marginLeft: 40,
                      marginBottom: 15,
                      width: 70,
                      height: 70,
                    }}
                    source={require("../assets/sB.png")}
                  />
                  <Text style={styles.priceText}>価格</Text>
                  <View style={styles.textflex}>
                    <TextInput
                      style={styles.frame}
                      placeholder="値段を入力"
                      value={number3}
                      onChangeText={(text) => setNumber3(text)}
                      keyboardType="numeric"
                      returnKeyType="done"
                      onSubmitEditing={handleInputDone}
                    />
                    <Text style={styles.currencyText}>円</Text>
                  </View>
                  <Text style={styles.priceText}>量</Text>
                  <TextInput
                    style={styles.amountframe}
                    placeholder="量を入力"
                    value={number4}
                    onChangeText={(text) => setNumber4(text)}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleInputDone}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.calculatorButton}
                onPress={calculate}
              >
                <Text style={styles.calculatorButtonText}>比較する</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  leftTextContainer: {
    display: "none",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerStyle1: {
    width: "45%",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
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
  frame: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
    height: 50,
    textAlign: "center",
    width: 136,
    marginBottom: 10,
    fontSize: 24,
  },
  amountframe: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
    height: 50,
    textAlign: "center",
    width: 156,
    marginBottom: 20,
    fontSize: 24,
  },
  calculatorButton: {
    backgroundColor: "#FBB03A",
    margin: 25,
    borderRadius: 15,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  calculatorButtonText: {
    color: "white",
    padding: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 20, // 好みのサイズに変更してください
  },
  textflex: {
    flexDirection: "row",
    alignItems: "center",
  },
  shadowContainer: {
    backgroundColor: "#00000020",
  }
});

export default Calculator;
