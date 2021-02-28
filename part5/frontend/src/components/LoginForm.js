import React from 'react'

const LoginForm = ({ submithandler,usernamevalue,usernamehandler,passwordvalue,passwordhandler }) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={submithandler}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={usernamevalue}
            name="Username"
            onChange={usernamehandler}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={passwordvalue}
            name="Password"
            onChange={passwordhandler}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm
