import React,{useState, useEffect} from "react";
import {
    StyleSheet,Text,View,FlatList,ActivityIndicator,

} from 'react-native';
import { fetchContacts } from "../utils/api";
import { useDispatch,useSelector } from "react-redux";
import ContactThumbnail from "../components/ContactThumbnail";

const keyExtractor = ({ phone }) => phone;
const Favorites = ({navigation})=>
{
    const {contacts,loading,error} = useSelector((state)=>state);

    useEffect(()=>{
        fetchContacts()
        .then(
            contacts=>{
                setContacts(contacts);
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
    })
    const renderFavoriteThumbnail = ({ item })=> {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('Profile',{ contact: item})}
            />
        );
    };

    const favorites = contacts.filter(contact => contact.favorite);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large"/>}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={favorites}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent:'center',
        flex:1,
    },
    list: {
        alignItems:'center',
    },
});

export default Favorites;