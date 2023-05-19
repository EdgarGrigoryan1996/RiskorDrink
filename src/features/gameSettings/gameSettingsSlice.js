import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gameStarted:false,
    gameMode:null,
    genderPlayers:null,
    players:[
        {
            id:Math.random(),
            name:"Edgar",
            isChecked:false,
            disabled:false,
        }
    ],
};


export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },

        setGameMode:(state,action) => {
          state.gameMode = action.payload.mode
        },
        setGenderPlayers: (state, action) => {
          state.genderPlayers = action.payload.gender
        },
        addPlayer:(state,action) =>{
            state.players.push({
                id:Math.random(),
                name:action.payload.name,
                isChecked:false,
                disabled:false,
            })
        },
        startGame: (state) => {
            state.gameStarted = true
        },
        checkPLayer: (state,action) => {
          state.players = state.players.map((player,i) => {
              if(player.id === action.payload.id){
                  return {
                      ...player,
                      isChecked:!player.isChecked
                  }
              } else {
                  return player
              }
          })
        },
        checkPLayerForDisabled: (state, action) => {
            const isCheckedPlayers = state.players.filter((player) => {
                return player.isChecked === true
            })
            if(isCheckedPlayers.length === 2){
                state.players = state.players.map((player) => {
                    if(player.isChecked !== true){
                        return {
                            ...player,
                            disabled:true
                        }
                    } else {
                        return player
                    }
                })
            } else {
                state.players = state.players.map((player) => {
                    return {
                        ...player,
                        disabled:false
                    }
                })
            }
        }

    },
});

export const {addPlayer,setGameMode,startGame,setGenderPlayers,checkPLayer,checkPLayerForDisabled } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
