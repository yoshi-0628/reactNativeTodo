import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, withTheme } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";

import Child from '../components/DateTimePickerComp';

class Modal extends React.Component {
    state = {
        todoBody: "",
        startDate: "",
        endDate: "",
    }
    render() {
        // 追加ボタン押下時処理
        const onPressAddButton = () => {
            // 入力値チェック処理
            if (this.state.todoBody == "" || this.state.todoBody == null) {
                Alert.alert(
                    'Error',
                    'TODOを入力してください',
                    [
                        {
                            text: '閉じる',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
                return false;
            }

            // 開始日、終了日比較チェック
            if (this.state.startDate != "" && this.state.endDate != "") {
                if (this.state.startDate > this.state.endDate) {
                    Alert.alert(
                        'Error',
                        '正しい日付を入力してください。',
                        [
                            {
                                text: '閉じる',
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                    return false;
                }
            }
            // index取得処理
            var newIndex = this.props.nav.state.todoList.length;
            // 配列にデータを追加する処理
            this.props.nav.state.todoList.push(
                {
                    index: newIndex,
                    todoBody: this.state.todoBody,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    check: false,
                }
            )
            this.props.entry();
        }
        const { colors } = this.props.theme;
        const styless = StyleSheet.create({
            container: {
                alignItems: 'center',
                backgroundColor: colors.background,
                paddingBottom: 10,
                position: "relative",
            },
        })
        return (
            <SafeAreaView style={styless.container} >
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity
                            onPress={onPressAddButton}
                            style={styles.topContaner}
                        >
                            <MaterialIcons size={40} color="blue" name="done" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.props.close()}
                            style={styles.topContaner}
                        >
                            <MaterialIcons size={40} color="red" name="close" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    label='TODO'
                    keyboardType='default'
                    autoFocus={false}
                    style={{ width: "80%" }}
                    onChangeText={todoBody => this.setState({ todoBody })}
                />
                <View style={{ width: "100%" }}>
                    <Child nav={this} selectDate="startDate" />
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#fff",
        paddingBottom: 10,
        position: "relative",
    },
    topContaner: {
        marginTop: 10,
    },
    dateContainer: {
        width: "80%",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,

    },
    dateText: {
        width: "10%",
        textAlign: "center"
    },
    list: {
        width: "80%",
    }


})

export default withTheme(Modal);