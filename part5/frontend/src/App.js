import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ errorMessage, setErrorMessage] = useState('')
  const [ error, setError] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const showmessage = (message,error) => {
    setErrorMessage(message)
    setError(error)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      showmessage( 'Wrong credentials',true)
    }
    setUsername('')
    setPassword('')
  }

  const handleCreate = async (newEntry) => {
    try {
      const newblog = await blogService.create(newEntry)
      setBlogs(blogs.concat(newblog))
      showmessage( `a new blog ${newblog.title} has been added`,false)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      showmessage( 'blog could not be added',true)
    }
  }

  const handlelike = async (blog) => {
    try {
      const updateBlog = { ...blog, likes: blog.likes+1 }
      const newblog = await blogService.update(updateBlog)
      setBlogs(blogs.map(blog => blog.id===newblog.id?{ ...blog,likes:newblog.likes }:blog))
    } catch (exception) {
      showmessage( 'blog could not be liked',true)
    }
  }

  const handledelete = async (blogtodelete) => {
    if (window.confirm(`Remove blog ${blogtodelete.title} by ${blogtodelete.author}`)) {
      try {
        await blogService.deleteblog(blogtodelete)
        setBlogs(blogs.filter(blog => blog.id!==blogtodelete.id))
      } catch (exception) {
        showmessage( 'blog could not be deleted',true)
      }
    }
  }
  const logout = async () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }


  if (user === null) {
    return (
      <div>
        <LoginForm submithandler={handleLogin}
          usernamevalue={username} usernamehandler={({ target }) => setUsername(target.value)}
          passwordvalue={password} passwordhandler={({ target }) => setPassword(target.value)}/>
        <Notification message={errorMessage} error={error}/>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>logged in as {user.name}<button onClick={logout}>logout</button></p>
      </div>
      <Notification message={errorMessage} error={error}/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <AddForm createBlog={handleCreate}/>
      </Togglable>
      <div id='blogscontainer'>
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} like={handlelike}
            user={user} deleteblog={handledelete} />)}
      </div>
    </div>

  )
}
export default App
