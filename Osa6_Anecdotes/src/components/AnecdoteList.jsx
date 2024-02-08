/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { handleVote } from "../reducers/anecdoteReducer";
import { expireNotification } from "../reducers/notificationReducer";


const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVoteClick = (id, content) => {
    dispatch(handleVote(id));
    dispatch(expireNotification(`you voted '${content}'`, 5));
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes
  );




  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
