import React from 'react';
import { View, StyleSheet, SafeAreaView, AsyncStorage, } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import Modal from "react-native-modal";

import ListItems from '../components/ListItems'
import Child from '../components/Modal';

class HomeScreen extends React.Component {
    state = {
        open: false,
        isModalVisible: false,
        todoList: [],
        index: "",
    };
    componentDidMount = async () => {
        try {
            const length = await AsyncStorage.getItem("length");
            this.setState({ index: length });
            if (length != null) {
                var array = [];
                for (var k = 0; k <= +length; k++) {
                    array.push(JSON.parse(await AsyncStorage.getItem(String(k))));
                }
                this.setState({ todoList: array });
            }
        } catch (error) {
            console.log(error);
        }
    }

    storeData = async (data) => {
        try {
            var k = 0;
            for (k in data) {
                await AsyncStorage.setItem(k, JSON.stringify(this.state.todoList[k]));
            }
            await AsyncStorage.setItem("length", k);
            console.log(k);
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const { colors } = this.props.theme;
        const toggleModal = () => {
            this.setState({ isModalVisible: !this.state.isModalVisible });
        }
        const entryData = () => {
            toggleModal();
            this.storeData(this.state.todoList)
        }
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: colors.background,
            },
            fab: {
                position: 'absolute',
                right: 16,
                bottom: 10,
                backgroundColor: colors.primary,
            },
            modal: {
                justifyContent: 'flex-end',
                margin: 0,
            },

        })

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <ListItems nav={this} />
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        onPress={toggleModal}
                        small={false}
                    />

                    <View style={{ justifyContent: 'center' }}>
                        <Modal isVisible={this.state.isModalVisible}
                            onSwipeComplete={toggleModal}
                            swipeDirection={['up', 'left', 'right', 'down']}
                            style={styles.modal}
                        >
                            <Child nav={this} close={() => toggleModal()} entry={() => entryData()} />
                        </Modal>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}



export default withTheme(HomeScreen);
