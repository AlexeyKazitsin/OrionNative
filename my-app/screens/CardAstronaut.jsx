import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native'


/*export default function AstronautCard(props) {
    return (
        <View>
            <Text>{props.name}</Text>
        </View>
    );
}*/

export default function AstronautCard({navigation, ...props}) {

    const handlePress = () => {
        //navigation.navigate('Астронавт', {id: props.astronaut_id}) для мэйн бэка
        navigation.navigate('Астронавт', {id: props.id})
    }
    return (
        <View  style={styles.card}>
        <Image
            style={styles.image}
            source={{uri: `${props.image}`}}
            resizeMode='cover'
        />
        <View style={styles.container}>
            <View>
                <Text style={styles.brandTitle}>{props.name}</Text>
                <View>
                    <Text style={styles.text}>Пол: {props.sex}</Text>
                    <Text style={styles.text}>Страна: {props.country}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={handlePress}
            >
                <Text style={{color: 'white'}}>Подробнее</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    card:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: 'rgb(192, 134, 213)',
        borderRadius: 12,
        marginBottom: 20,
    },
    image: {
        height: 200,
        width: "40%",
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        height: "100%",
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "space-between",
        alignItems: 'flex-start',

    },
    brandTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    btn: {
        backgroundColor: 'rgb(142, 58, 172)',
        padding: 5,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
});