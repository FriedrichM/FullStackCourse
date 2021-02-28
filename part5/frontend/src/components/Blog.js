import React, { useState } from 'react'
const Blog = ({ blog, like, deleteblog, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const handlehide = () => {
    setVisible(!visible)
  }
  return(
    <div>
      <div style={hideWhenVisible} >
        {blog.title} {blog.author} <button onClick={handlehide}>view</button>
      </div>
      <div style={showWhenVisible} className="fullblog" >
        {blog.title} {blog.author} <button onClick={handlehide}>hide</button><br/>
        {blog.url} <br/>
        <span>likes {blog.likes}</span> <button onClick={() => like(blog)} className="likebtn" >like</button><br/>
        {blog.user.name} <br/>
        {blog.user.username===user.username?<button onClick={() => deleteblog(blog)}>remove</button>:''}
      </div>
    </div>
  )
}

export default Blog
