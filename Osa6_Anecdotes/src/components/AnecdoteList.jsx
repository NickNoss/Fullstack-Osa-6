/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { voteNotification, removeNotification } from "../reducers/notificationReducer";


const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVoteClick = () => {
    dispatch(vote(anecdote.id));
    dispatch(voteNotification({ content: anecdote.content }));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
