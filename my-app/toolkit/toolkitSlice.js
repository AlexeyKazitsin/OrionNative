import {createSlice} from '@reduxjs/toolkit'

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: { // в редаксе храним массив услуг и инфу об одной услуге
        astronauts: [],
        astronaut: {},
    },
    reducers: { //функции которые заполняют данные в редаксе (эти функции вытягивают данные с бэка)
        setAstronauts: (state, {payload}) => {
            console.log('setAstronauts'); //когда получим данные и заполним их в редаксе, выводим setAstronauts
            state.astronauts = payload;
        }, 
        setAstronaut: (state, {payload}) => {
            console.log('setAstronaut');
            state.astronaut = payload;
        },
        resetAstronaut: (state) => { //по выходу из со страницы астронавта очищаем стейт astronaut
            console.log('resetAstronaut')
            state.astronaut = {};
        }
    }
})

export default toolkitSlice.reducer;

export const {setAstronauts, setAstronaut, resetAstronaut} = toolkitSlice.actions;