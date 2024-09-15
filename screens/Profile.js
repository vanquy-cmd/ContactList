import React,{useState,useEffect} from "react";
import { StyleSheet,View,Text,Linking } from "react-native";
import { fetchRandomContact } from "../utils/api";
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from "../utils/colors";

const Profile =({ route}) =>
{
    const [setContact] = useState({});
    
    useEffect(()=>
        {
            fetchRandomContact().then(
                contact => setContact(contact)
            )
        }
    ,[]);
    const {contact} = route.params;
    const {avatar,name,email,phone,cell} = contact;

    // Hàm để mở ứng dụng email
    const handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    // Hàm để gọi điện thoại
    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThumbnail 
                    avatar={avatar} 
                    name={name} 
                    phone={phone}
                />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem 
                    icon="mail" 
                    title="Email" 
                    subtitle={email}
                    onPress={() => handleEmail(email)} // Gọi hàm khi nhấn
                />
                <DetailListItem 
                    icon="phone" 
                    title="Work" 
                    subtitle={phone}
                    onPress={() => handleCall(phone)} // Gọi hàm khi nhấn
                />
                <DetailListItem 
                    icon="smartphone" 
                    title="Personal" 
                    subtitle={cell}
                    onPress={() => handleCall(cell)} // Gọi hàm khi nhấn
                />
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    },
});
