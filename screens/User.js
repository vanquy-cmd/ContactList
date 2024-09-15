import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, ActivityIndicator,} from 'react-native';
import { fetchUserContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";

const User = ()=>
{
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState([false]);

    useEffect(()=>{
        fetchUserContacts()
        .then(
            users=>{
                setUser(users);
                setLoading(false);
                setError(false);
            }
        )
        .catch(
            e=>{  
                setLoading(false);
                setError(true);
            }
        )
    });
    const { avatar, name, phone} = user;
        
    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large"/>}
            {error && <Text>Error...</Text>}
            {!loading && !error &&(
                <ContactThumbnail avatar={avatar} name={name} phone={phone}/>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor: colors.blue,
        justifyContent:'center',
        flex:1,
    },

});

export default User;