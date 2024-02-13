import { useQueryClient, useMutation,  } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`Succesfully added: '${anecdote.content}'`)
    },
    onError: (error) => {
      showNotification('too short anecdote, must have length of 5 or more')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
