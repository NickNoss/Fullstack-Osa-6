import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { expireNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
      updateVote(state, action) {
        const updatedAnecdote = action.payload
        return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
})
  

export const { updateVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(expireNotification(`You created '${content}'`, 5))
  }
}

export const handleVote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find((a) => a.id === id)
    const updatedAnecdote = await anecdoteService.putVote(anecdoteToVote.id, anecdoteToVote)
    dispatch(updateVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
