import React from 'react';
import { View, StyleSheet, FlatList, GestureResponderEvent } from 'react-native'
import { Divider, RadioButton, Text, TouchableRipple, Menu, theme } from 'react-native-paper'
import Modal from "react-native-modal";

export default class ListItems extends React.Component {
    state = {
        check: false,
        contextualMenuCoord: { x: 0, y: 0 },
        visible: false,
        menuAllText: "",
    }

    render() {
        const { colors } = this.props.nav.props.theme;
        const onPressCheck = (itemsKey) => {
            var tmp = this.props.nav.state.todoList.filter(
                function (value) {
                    if (value.index !== itemsKey) {
                        // 削除処理
                        return value
                    }
                })
            tmp = tmp.filter(
                function (value, index) {
                    // indexの再採番
                    value.index = index;
                    return value;
                })
            this.props.nav.setState({ todoList: tmp });
            this.props.nav.storeData(tmp);
        }
        const showDate = (startDate, endDate) => {
            if (startDate == "" && endDate == "") {
                return "";
            } else {
                return startDate + "~" + endDate
            }
        }
        const _handleLongPress = (event, text) => {
            const { nativeEvent } = event;
            this.setState(
                {
                    contextualMenuCoord: {
                        x: nativeEvent.pageX,
                        y: nativeEvent.pageY,
                    },
                },
                _openMenu()
            );
            this.setState({ menuAllText: text });

        };
        const _openMenu = () => this.setState({ visible: true });
        const _closeMenu = () => this.setState({ visible: false });

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            checkButton: {
                justifyContent: "center",
                marginLeft: 1,
                flex: 1,
            },
            buttonStyle: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            },
            list: {
                marginTop: 1,
                height: 80,
                width: "90%",
                justifyContent: "center"
            },
            listName: {
                flex: 1,
                justifyContent: "center",
            },
            listNameText: {
                fontSize: 25,
                marginLeft: 5,
            },
            listDate: {
                flex: 1,
                justifyContent: "flex-end",
            },
            listDateFromTo: {
                fontSize: 15,
                marginRight: 10,
                marginBottom: 1,
                textAlign: "right"
            },
            menuText: {
                color: "red"
            },
            modal: {
                justifyContent: 'center',
            },
            modalContainer: {
                justifyContent: 'center',
                backgroundColor: colors.background,
                flex: 1,
            },
            modalTitleText: {
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 20,
            },
            modalTodoText: {
                fontSize: 20,
            }
        });
        return (
            <View>
                <FlatList
                    data={this.props.nav.state.todoList}
                    renderItem={({ item }) =>
                        <View>
                            <View style={styles.row}>
                                <View style={styles.buttonStyle}>
                                    <RadioButton
                                        value="first"
                                        status={item.check ? 'checked' : 'unchecked'}
                                        onPress={() => onPressCheck(item.index)}
                                    />
                                </View>
                                <TouchableRipple style={styles.list}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                    onPress={() => { }}
                                    onLongPress={(evt) => _handleLongPress(evt, item.todoBody)}
                                >
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <View style={styles.listName}>
                                            <Text style={styles.listNameText}>
                                                {item.todoBody.length >= 10 ?
                                                    item.todoBody.substr(0, 10) + " ..." :
                                                    item.todoBody}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: "flex-end" }}>
                                            <Text style={styles.listDateFromTo}>
                                                {showDate(item.startDate, item.endDate)}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <Divider theme={this.props.theme} />
                        </View>
                    }
                    extraData={this.props.nav.state.todoList}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Divider />
                <Modal isVisible={this.state.visible}
                    onSwipeComplete={() => _closeMenu()}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modal}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitleText}>
                            TODO
                        </Text>
                        <Text style={styles.modalTodoText}>
                            {this.state.menuAllText}
                        </Text>
                    </View>
                </Modal>
            </View>
        );
    }
}


