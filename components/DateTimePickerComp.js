import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, TouchableRipple, } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default DateTimePickerComp = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // trueなら開始日を修正、falseなら終了日を修正
    const [editStartDateFlg, setEditStartDateFlg] = useState(true);
    // 開始日クリア可能フラグ
    const [removeStartDateFlg, setRemoveStartDateFlg] = useState(false);
    // 終了日クリア可能フラグ
    const [removeEndDateFlg, setRemoveEndDateFlg] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        hideDatePicker();
        onChange(date);
    };

    const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        // getMonthをすると一月戻るので足す
        // 12月に足しても問題ないことを確認済み
        const inputMonth = currentDate.getMonth() + 1;
        const formatDate = currentDate.getFullYear() + "/" + inputMonth + "/" + currentDate.getDate()

        if (editStartDateFlg) {
            props.nav.setState({ startDate: formatDate });
            setRemoveStartDateFlg(true);

        } else if (!editStartDateFlg) {
            props.nav.setState({ endDate: formatDate });
            setRemoveEndDateFlg(true);

        }
    };

    const showDatepicker = (flg) => {
        setDatePickerVisibility(true);
        setEditStartDateFlg(flg);
    };

    const removeDate = (dateType) => {
        if (dateType == "startDate") {
            props.nav.setState({ startDate: "" })
            setRemoveStartDateFlg(false);
        } else if (dateType == "endDate") {
            props.nav.setState({ endDate: "" })
            setRemoveEndDateFlg(false);
        }
    }

    return (
        <ScrollView>
            <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }} >
                <List.Section style={styles.list}>
                    <List.Subheader>日付</List.Subheader>
                    <List.Item
                        title="開始日"
                        description={props.nav.state.startDate}
                        right={props => <View style={{ flexDirection: "row" }}>
                            <TouchableRipple onPress={() => showDatepicker(true)}>
                                <List.Icon {...props} icon="calendar-check" />
                            </TouchableRipple>
                            {removeStartDateFlg &&
                                <TouchableRipple onPress={() => removeDate("startDate")}>
                                    <List.Icon {...props} icon="calendar-remove" />
                                </TouchableRipple>
                            }
                        </View>
                        }
                    />

                    <List.Item
                        title="終了日"
                        description={props.nav.state.endDate}
                        right={props => <View style={{ flexDirection: "row" }}>
                            <TouchableRipple onPress={() => showDatepicker(false)}>
                                <List.Icon {...props} icon="calendar-check" />
                            </TouchableRipple>
                            {removeEndDateFlg &&
                                <TouchableRipple onPress={() => removeDate("endDate")}>
                                    <List.Icon {...props} icon="calendar-remove" />
                                </TouchableRipple>
                            }
                        </View>

                        }
                    />
                </List.Section>
            </View>
            <View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: "80%",
        alignItems: "flex-start",
    },
    list: {
        width: "80%",
    }
})