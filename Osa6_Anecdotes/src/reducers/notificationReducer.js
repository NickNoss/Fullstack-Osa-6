import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        voteNotification(state, action) {
            return `You voted '${action.payload.content}'`
        },
        addNotification(state, action) {
            return `You added new anecdote: '${action.payload.content}'`
        },
        removeNotification(state) {
            state = null
            return state
        }
    }
})

export const { voteNotification, addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer