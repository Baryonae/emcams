import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import { HiCommandLine } from "react-icons/hi2";


function Writer() {
  return (
    <div>
        <Card className="max-w-[300px] p-4 my-8">
            <CardHeader className = 'flex gap-3'>
                <HiCommandLine  size = '35'/>
                <div className = 'flex-col'>
                <div className = 'font-bold'>Create new post</div>
                <div className = 'text-gray-500'>emcams</div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className = 'py-4'>
                <div className = 'font-thin'>create post for your e-magazine, it will then be sent to editor for confirmation and then finally posted</div>
            </CardBody>
            <Divider />
            <CardFooter className = 'py-4'>
                <Link href = '/createPost'><Button color = 'primary'>Create Post</Button></Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Writer