import React from 'react'
import service from '../appwrite/Config'
import {Link} from 'react-router-dom'

function PostCard({$id ,title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-grey-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'></img>
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard