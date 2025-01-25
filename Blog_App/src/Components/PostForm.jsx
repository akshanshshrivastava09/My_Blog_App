import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import{Button ,Input ,Select , RTE} from './index'
import { useSelector } from 'react-redux'
import service from '../appwrite/Config'

function PostForm({post}) { 
    const{register ,handelSubmit ,watch ,setValue ,getValues,control}= useForm({
        defaultValues :{
            title:post?.title||'',
            slug :post?.slug ||'',
            content:post?.content || '',
            status: post?.status ||'active',
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state)=>{state.user.userData})
    const submit = async(data)=>{
        if (post) {
            const file = data.image[0] ? service.fileUpload(data.image[0]) :null;
                if(file){
                service.filedelete(post.featuredImage)
                }
            const dbPost = await service.updatePost
            (       post.$id,
                {   ...data,
                    featuredImage: file? file.$id : undefined   
                }
            )
                if(dbPost){
                navigate (`/post/${dbPost.$id}`)
                }     
        }
        else{
            const File = data.image[0]? service.fileUpload(data.image[0]):null;
            if(File){
                const fileId = File.$id
                data.featuredImage = fileId 
                const dbPost = await service.createPost({
                    ...data,
                    userId : userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
       
    }
    const slugTransform = useCllBack((value) =>{
       if(value && typeof(value)==='string') 
        return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        return ''
    },[])

    useEffect(() => {
      const subscription = watch((value,{name})=>{
        if(name === 'title'){
            setValue(slug , slugTransform(value.title, {shouldValidate:true}))
        }
      })
    
      return () => {
        subscription.unsubscribe()
      }
    }, [watch ,slugTransform ,setValue])
    
  return (
   <form onSubmit={handelSubmit(submit)} className='flex flex-wrap'>
    
    <div className='w-2/3 px-2'>
    
    <Input
    label="Title: "
    placeholder = "Title"
    className = "mb-4"
    {...register("title",{required:true})}
    />
    
    <Input
    label="Slug: "
    placeholder = "Slug"
    className = "mb-4"
    {...register("Slug",{required:true})}
    onInput = {(e)=>{
        setValue("slug",slugTransform(e.currentTarget.value) ,{shouldValidate : ture})
    }}
    />
    
    <RTE  label="Content: " name="content" control={control} defaultValue ={getValues("content")}/>

    </div>
    
    
    <div className='w-1/3 px-2'>

    <Input 
    label = "Featured Image :"
    type ="file"
    className="mb-4"
    accept="image/png, image/jpg, image/jpeg, image/gif"
    {...register("image",{required:!post})}
    />
    {post&&(
        <div className="w-full mb-4">
            <img src={service.getFilePreview(post.featuredImage)}
             alt={post.title}
             className="rounded-lg" />
        </div>
    )}
    <Select
    option={["active","inactive"]}
    label="status"
    className="mb-4"
    {...register("status",{required:true})}
    />
    <Button
    type="submit" bgColor={post?"bg-green-500" : undefined } className="w-full  ">
    {post?"Update":"Submit"}
    </Button>
    </div>
   </form>
  )
}

export default PostForm