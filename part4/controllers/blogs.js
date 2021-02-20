const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))//check if neccessary
})

blogsRouter.post('/',middleware.userExtractor, async (request, response) => {

  if(request.user===undefined){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if(request.body.title===undefined||request.body.url===undefined||
    request.body.url===''||request.body.title===''){
    return response.status(400).json({
      error: 'required field missing'
    })
  }
  const newblog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes||0,
    user: request.user._id
  })

  const savedblog= await newblog.save()
  request.user.blogs = request.user.blogs.concat(savedblog._id)
  await request.user.save()
  response.status(201).json(savedblog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const todelete = await Blog.findById(request.params.id).populate('user', {id:1 })
  if(!todelete){
    return response.status(4040).end()
  }
  if(todelete.user.id.toString()===request.user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'token missing or invalid' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(request.body.title===undefined||request.body.url===undefined||
    request.body.likes===undefined||request.body.author===undefined||
    request.body.url===''||request.body.title==='' ){
    return response.status(400).json({ error: 'content missing' })
  }

  const savedPerson = await Blog.findByIdAndUpdate(request.params.id,{title:body.title, url:body.url, author:body.author, likes:body.likes},{ new: true })
  if(savedPerson){
    response.json(savedPerson)
  }else{
    response.status(404).end()
  }
})

module.exports = blogsRouter
