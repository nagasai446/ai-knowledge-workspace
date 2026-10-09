import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChatState{
    selectedConversationId:number| null;
    isStreaming:boolean;
}

const initialState:ChatState={
    selectedConversationId:null,
    isStreaming:false
};

const chatSlice = createSlice({
    name : "chat",

    initialState,

    reducers:{
        setConversation(
            state,
            action:PayloadAction<number | null>
        ){
            state.selectedConversationId=action.payload
        },

        setStreaming(
            state,
            action:PayloadAction<boolean>,
        ){
            state.isStreaming=action.payload;
        }

    }
});

export const {setConversation,setStreaming}=chatSlice.actions;

export default chatSlice.reducer;