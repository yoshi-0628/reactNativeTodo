import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar, withTheme } from 'react-native-paper';

function Header(props) {
    const _handleToggle = () => {
        console.log(props.nav())
        console.log(props)
    }
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon={props.flg == true ? "white-balance-sunny" : "weather-night"} onPress={() => _handleToggle()} />
            <Appbar.Content
                title="TODOリスト"
            />
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    header: {
    }
})

export default withTheme(Header);