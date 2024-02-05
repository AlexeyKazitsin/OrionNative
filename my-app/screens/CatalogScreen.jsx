import { View, Text, Button, SafeAreaView, ScrollView, TextInput} from 'react-native';   
import {StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {setAstronauts} from '../toolkit/toolkitSlice';
import {URI} from '../consts';
import axios from 'axios'
import AstronautCard from './CardAstronaut';
import {URI_minio} from '../consts';

export default function CatalogScreen({ navigation }) {
    //инициализируем диспатч
    const dispatch = useDispatch();
    //селектором вытягиваем текущее состояние переменной astronauts
    const astronauts = useSelector((state)=>state.toolkit.astronauts);


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    }


    //с помощью useEffect делаем запрос на бэк и вытягиваем данные об астронавтах (асинхронно)
    useEffect(()=> {
        async function getAllAstronauts() {
            //const response = await axios.get(`${URI}/astronauts/?search=${searchQuery}`); для мейн бека
            const response = await axios.get(`${URI}/api/astronauts/search/?query=${searchQuery}`);
            const updatedAstronauts = response.data.astronauts.map((astronaut)=>({
                ...astronaut,
                image: astronaut.image.replace("http://127.0.0.1:9000", `${URI_minio}`)
            }))
            //console.log(updatedAstronauts)
            dispatch(setAstronauts(updatedAstronauts));
            //dispatch(setAstronauts(response.data.astronauts));
            //console.log(response.data.astronauts);
        }

        getAllAstronauts();
        //console.log("GetAstronauts");
    }, [searchQuery, dispatch]) //от чего зависит useEffect 


    return ( //Оборачиваем в SafeAreView и меняем View на ScrollView чтобы можно было скроллить экран
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <TextInput //поле поиска
                    style={styles.input}
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChangeText={(text) => handleSearch(text)}
                />
            </View>
            <ScrollView style={styles.scroll_view}>
                {astronauts.map((astronaut) => ( // в мап всех астронавтов кладем CardAstronaut (там прокидываем пропсы)
                    <AstronautCard key={astronaut.astronaut_id} {...astronaut} navigation={navigation}/> //... распыляет свойства обьекта
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        margin: 0,
        padding: 0,
    },
    scroll_view: {
        margin: 0,
        padding: 0,
        width: "100%",
        padding: "3%",
    },
    search: {
        width: "94%",
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: 10,
        paddingLeft: 8,
        width: "100%",
    }, filters: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        width: "100%"
    },
    filterButton: {
        backgroundColor: "#ccc",
        padding: 7,
        borderRadius: 8,
    },
    filterButtonText: {
        fontWeight: "normal",
        fontSize: 12, 
    }

})