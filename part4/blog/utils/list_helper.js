const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    for(let i = 0; i < blogs.length; i++)
    {
        return blogs[i].likes;
    }
}


/**
 * @param {object} blogs accepts an object
 */
function favoriteBlog(blogs)
{
    let obj = blogs[0];
    for(let i = 1; i < blogs.length; i++)
    {
        if(obj.likes < blogs[i].likes)
        {
            obj = blogs[i];
        }
    }
    return obj;
}

function mostBlogs(blogs)
{
    let obj = blogs[0];
    for(let i = 1; i < blogs.length; i++)
    {
        if(obj.blogs < blogs[i].blogs)
        {
            obj = blogs[i];
        }
    }
    return obj;
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }