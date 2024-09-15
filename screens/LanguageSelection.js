import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'es', name: 'Español' },
    // Thêm các ngôn ngữ khác tại đây
];

const LanguageSelection = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const storeLanguage = async (languageCode) => {
        try {
            await AsyncStorage.setItem('language', languageCode);
        } catch (error) {
            console.error("Error saving language", error);
        }
    };
    
    const handleSelectLanguage = (code) => {
        setSelectedLanguage(code);
        storeLanguage(code); // Lưu ngôn ngữ đã chọn
        navigation.goBack(); // Quay lại màn hình trước
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Language</Text>
            <FlatList
                data={languages}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectLanguage(item.code)} style={styles.languageItem}>
                        <Text style={styles.languageText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    languageItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    languageText: {
        fontSize: 18,
    },
});

export default LanguageSelection;