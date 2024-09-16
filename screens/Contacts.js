import React, { useEffect , useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError, deleteContact  } from "../screens/store";
import { fetchContacts } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import {Profile} from "../screens/Profile";
import {Routers} from "../components/routes";
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon package

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

  const [selectedContact, setSelectedContact] = useState(null); // them
  const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State để điều khiển hiển thị trường tìm kiếm
  const [longPressedContact, setLongPressedContact] = useState(null); // Trạng thái cho liên hệ đang nhấn giữ
  let timeoutRef = null; // Tham chiếu cho timeout

  useEffect(() => {
    const loadContacts = async () => {
      dispatch(fetchContactsLoading());
      try {
        const contacts = await fetchContacts();
        dispatch(fetchContactsSuccess(contacts));
      } catch (e) {
        dispatch(fetchContactsError());
      }
    };

    loadContacts();
  }, [dispatch]);

  const contactSorted = contacts
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  // Lọc danh sách liên hệ theo tìm kiếm
  const filteredContacts = contactSorted.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );
  
  const renderContact = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      delayLongPress={200} // Thay đổi thời gian nhấn giữ
      onPressOut={handlePressOut} // Khi người dùng nhả tay ra
    >
      <ContactListItem
        name={item.name}
        avatar={item.avatar}
        phone={item.phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    </TouchableOpacity>
  );

  const handleLongPress = (contact) => {
    setLongPressedContact(contact);
  };

  const handlePressOut = () => {
    setLongPressedContact(null); // Đặt lại khi nhả tay ra
  };

  const handleDelete = (phone) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa liên hệ này không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: () => dispatch(deleteContact(phone)),
        style: "destructive",
      }
    ]);
  };

  
  const handleEdit = () => {
    navigation.navigate("EditContact", { contact: selectedContact });
    setSelectedContact(null);
  };

  const toggleSearch = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      setSearchQuery(""); // Đặt lại tìm kiếm khi mở
      // Đặt timeout để tự động thu gọn lại
      timeoutRef = setTimeout(() => {
        setIsSearchVisible(false);
      }, 55000);
    } else {
      clearTimeout(timeoutRef); // Xóa timeout nếu đã mở
      setIsSearchVisible(false);
    }
  };
  // Xóa timeout khi component bị unmounted
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef);
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Contacts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddContact')}>
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {!loading && !error && (
        <FlatList
          data={filteredContacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
      {longPressedContact && (
        <View style={styles.actionContainer}>
          <Button title="Chỉnh sửa" onPress={() => navigation.navigate("EditContact", { contact: longPressedContact })} />
          <Button title="Xóa" onPress={() => handleDelete(longPressedContact.phone)} color="red" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Contacts;