import { View, Text, Button, SafeAreaView, ScrollView, Image} from 'react-native';  
import React, {useEffect} from 'react';
import axios from 'axios';
import {URI} from '../consts';
import {URI_minio} from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import {setAstronaut, resetAstronaut, setAstronauts} from '../toolkit/toolkitSlice';
import {StyleSheet} from 'react-native'


export default function AstronautScreen({route}) {
    const {id} = route.params;

    const dispatch = useDispatch();
    const astronaut = useSelector((state)=>state.toolkit.astronaut);

    useEffect(()=>{
        async function getAstronaut() {
            //await axios.get(`${URI}/astronauts/${id}`) для мэйн бека
            await axios.get(`${URI}/api/astronauts/${id}`)
            .then(response => {
                const updated_data = response.data;
                updated_data.image = updated_data.image.replace("http://127.0.0.1:9000", `${URI_minio}`);
                console.log(response.data);
                console.log(response.data.image)
                dispatch(setAstronaut(updated_data))
                //dispatch(setAstronaut(response.data)) //получили информацию о текущем астронавте, теперь запоминаем диспатчем
            })
            .catch((error)=> {
                console.log("Ошибка", error)
            })
        }
        getAstronaut();
        return () => {
            dispatch(resetAstronaut());
        };
    }, [dispatch])

    return (
        <View style={styles.detail}>
            <Image
                style={styles.image}
                source={{uri: `${astronaut.image}`}}
                resizeMode='cover'
            />
            <Text style={styles.title}>{astronaut.name}</Text>
            <View style={{display: "flex", alignSelf: "flex-start"}}>
                <Text style={styles.text}>Возраст: {astronaut.age}</Text>
                <Text style={styles.text}>Пол: {astronaut.sex}</Text>
                <Text style={styles.text}>Страна: {astronaut.country}</Text>
                <Text style={styles.text}>Опыт: {astronaut.experience}</Text>
            </View>
        
        </View>
    );
}


const styles = StyleSheet.create({
    detail: {
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       padding: "5%",
       backgroundColor: "white",
       height: "100%",
    },
    image: {
        height: 300,
        width: "100%",
        borderRadius: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    }
})