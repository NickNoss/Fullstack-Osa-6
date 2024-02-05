/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { voteNote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state);

    return(
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(voteNote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default AnecdoteList;

