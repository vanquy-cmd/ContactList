import React,{useState, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import DetailListItem from '../components/DetailListItem';


const Options = ({ navigation }) => {
    const handleUpdateProfile = () => {
        // Logic chuyển đến màn hình chỉnh sửa hồ sơ
    };

    const handleChangeLanguage = () => {
         // Chuyển đến màn hình chọn ngôn ngữ
    };

    return (
        <View style={styles.container}>
            <DetailListItem title="Update Profile" onPress={handleUpdateProfile} />
            <DetailListItem title="Change Language" onPress={handleChangeLanguage} />
            <DetailListItem title="Sign Out" />
        </View>
    );
};
const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'white',
        },
    }
);

export default Options;