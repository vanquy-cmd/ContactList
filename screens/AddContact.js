import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addContact } from '../screens/store'; // Import action addContact

const AddContact = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleAddContact = () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newContact = {
      name,
      phone,
      avatar: avatar || 'https://example.com/default-avatar.jpg', // URL ảnh mặc định nếu không có
    };

    dispatch(addContact(newContact)); // Dispatch action thêm liên hệ
    // Hiển thị thông báo thành công
    Alert.alert('Thành Công', 'Liên hệ đã được thêm thành công!');
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên liên hệ"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="URL ảnh đại diện (tuỳ chọn)"
        value={avatar}
        onChangeText={setAvatar}
      />
      <Button title="Thêm Liên Hệ" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddContact;