import { createSlice } from '@reduxjs/toolkit';
function getRandomDoingForPlayerTwo(state,indexOne){
    let indexTwo = Math.floor(Math.random() * state.gameMode.normal.length)
    if(indexTwo === indexOne){
        return getRandomDoingForPlayerTwo(state,indexOne)
    } else {
        return indexTwo
    }
}
const initialState = {
    gameStarted:false,
    gameMode:null,
    genderPlayers:null,
    isGameManual:null,
    players:[
        {
            id:Math.random(),
            name:"Edgar",
            isChecked:false,
            disabled:false,
            currentDoing:null,
            doneDoings:[],
            cancelDoings:[],
        }
    ],
    currentPlayers:[]
};


export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setGameMode:(state,action) => {
          state.gameMode = action.payload.mode
        },
        setGenderPlayers: (state, action) => {
          state.genderPlayers = action.payload.gender
        },
        setIsManualGameMode: (state, action) => {
          state.isGameManual = action.payload.mode
        },
        addPlayer:(state,action) =>{
            state.players.push({
                id:Math.random(),
                name:action.payload.name,
                isChecked:false,
                disabled:false,
                currentDoing:null,
                doneDoings:[],
                cancelDoings:[],
            })
        },
        removePlayer: (state,action) => {
            state.players = state.players.filter((player) => {
                return player.id !== action.payload.id
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
        removeChecks : (state) => {
            state.players = state.players.map((player) => {
                return {
                    ...player,
                    isChecked:false,
                    disabled:false
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
        },
        addCurrentPlayer: (state,action) => {
            state.currentPlayers = state.players.filter((player) => {
                return player.isChecked === true
            })
        },
        resetCurrentPlayers: (state) => {
            state.currentPlayers = []
        },
        setCurrentPlayerNormalDoing: (state) => {
            let randomIndexOne = Math.floor(Math.random() * state.gameMode.normal.length)
            let randomIndexTwo = getRandomDoingForPlayerTwo(state,randomIndexOne)
            state.currentPlayers = state.currentPlayers.map((player,i) => {
                if(i === 0){
                    return {
                        ...player,
                        currentDoing:state.gameMode.normal[randomIndexOne]
                    }
                } else {
                    return {
                        ...player,
                        currentDoing:state.gameMode.normal[randomIndexTwo]
                    }
                }

            })
        },
        setCurrentPlayerExtraDoing: (state) => {
            state.currentPlayers = state.currentPlayers.map((player) => {
                return {
                    ...player,
                    currentDoing:state.gameMode.extra[Math.floor(Math.random() * state.gameMode.extra.length)]
                }
            })
        },
        addDoneDoing: (state,action) => {
            state.players = state.players.map((player) => {
                if(player.id === action.payload.playerId){
                    return {
                        ...player,
                        doneDoings:[...player.doneDoings,action.payload.doing]
                    }
                } else {
                    return player
                }
            })
        },
        addCancelDoing: (state,action) => {
            state.players = state.players.map((player) => {
                if(player.id === action.payload.playerId){
                    return {
                        ...player,
                        cancelDoings:[...player.cancelDoings,action.payload.doing]
                    }
                } else {
                    return player
                }
            })
        },
        removeDoingFromList: (state,action) => {
            if(action.payload.extraMode){
                let index = state.gameMode.extra.indexOf(action.payload.doing)
                state.gameMode.extra = state.gameMode.extra.filter((doing,i) => {
                    return i !== index
                })
            } else {
                let index = state.gameMode.normal.indexOf(action.payload.doing)
                state.gameMode.normal = state.gameMode.normal.filter((doing,i) => {
                    return i !== index
                })
            }
        }



    },
});

export const {
    addPlayer,
    removePlayer,
    setGameMode,
    startGame,
    setGenderPlayers,
    setIsManualGameMode,
    checkPLayer,
    removeChecks,
    checkPLayerForDisabled,
    addCurrentPlayer,
    resetCurrentPlayers,
    setCurrentPlayerNormalDoing,
    setCurrentPlayerExtraDoing,
    addDoneDoing,
    addCancelDoing,
    removeDoingFromList
} = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
