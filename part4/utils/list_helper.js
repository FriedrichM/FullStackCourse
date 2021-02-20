var lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) =>{
  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes,0)
}

const favoriteBlog = (blogs) =>{
  const transformedBlogs = blogs.map(blog =>{
    return{
      title: blog.title,
      author: blog.author,
      likes: blog.likes}
  })
  return transformedBlogs.reduce((accumulator, currentValue) =>  accumulator.likes > currentValue.likes ? accumulator : currentValue,transformedBlogs[0])
}

const mostBlogs = (blogs) =>{
  const grouped = lodash.countBy(blogs, n => n.author)
  const results =lodash.toPairsIn(grouped).map(pair=>{return{
    author:pair[0],
    blogs:pair[1]
  }} )
  return results.reduce((accumulator, currentValue) =>  accumulator.blogs > currentValue.blogs ? accumulator : currentValue,results[0])
}

const mostLikes = (blogs) =>{
  const grouped = lodash.groupBy(blogs, n => n.author)
  Object.keys(grouped).map((key,index) =>{
    grouped[key]=lodash.sumBy(grouped[key],element => element.likes)
  })
  const results =lodash.toPairsIn(grouped).map(pair=>{return{
    author:pair[0],
    likes:pair[1]
  }} )
  return results.reduce((accumulator, currentValue) =>  accumulator.likes > currentValue.likes ? accumulator : currentValue,results[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
