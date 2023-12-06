
'use client'
import React, { useState } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { useUser } from '@clerk/nextjs';
import supabase from './client'
import { Button } from '@nextui-org/button';
import { IoCloudUploadOutline } from "react-icons/io5";


function App() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [mainVisibility, setMainVisibility] = useState('hidden')
    const [value, setValue] = useState('')
    const [file, setFile] = useState([])



    async function Something(){
        const {data: roles} = await supabase.from('users').select().eq('username', user?.firstName) 
        roles?.map((role) => {
            if(role.role == 'writer')
            {
                setMainVisibility('')
            }   
            else{
            
            }
        })
    }
    const UploadPost = async (e:any) => {
        const file = e.target.files;

        const {data, error} = await supabase.storage.from('illustrations').upload('google', file, {
            cacheControl: '3600',
            upsert: true
        })
        console.log('uploaded')

    }

    Something();
     return (
                <div className = {mainVisibility}>
                <Textarea
                label="Post"
                variant="bordered"
                placeholder="Write your article"
                disableAnimation
                disableAutosize
                classNames={{
                    base: "w-1/2 h-screen inline-flex",
                    input: "resize-y min-h-[700px] inline-flex",
                }}
                value = {value}
                onValueChange={setValue}
                />
                <div className = 'inline-flex ml-10'> 
                <div className = 'text-2xl font-bold'>Create Post
                <div>
                    
                <Input placeholder='Enter the Title' label = 'Enter Title' className = 'w-full flex flex-wrap my-8' variant = 'bordered' /></div>
                <div className = 'text-lg font-thin py-4'>
                    Upload a illustration for your post
                </div>
                <Input type = 'file' onChange={UploadPost} id = 'file'>
                <Button startContent = {<IoCloudUploadOutline size = '20'/>} className ='p-4' variant = 'shadow' color = 'secondary'><div className = 'text-md font-thin'>Upload</div></Button></Input>
                <div className = 'h-unit-7xl'></div>
                <div className = 'text-xl font-thin' ><Button color = 'primary' onClick = {UploadPost}>Create Post</Button></div>
                </div>
                
                
                </div>
                </div>
        )
   
}

export default App