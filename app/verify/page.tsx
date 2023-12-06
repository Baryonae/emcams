'use client'
import { useUser } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import supabase from './client'
import { useState } from "react"
import {CheckboxGroup, Checkbox, Link} from "@nextui-org/react";
import { redirect } from 'next/navigation'

export default function PricingPage() {
    const [email, setEmail] = useState('')
    const { isLoaded, isSignedIn, user } = useUser();
    const [role, setRole] = useState([''])
    const [verified, setVerified] = useState('')
    const stringedRole = role.toString()
    const finalRole = stringedRole.slice(1)
    async function UploadingData(){

        const stringedRole = role.toString()
        const finalRole = stringedRole.slice(1)
        const someLength = role.length
        const {data: thisUser} = await supabase.from('users').select().eq('username', user?.firstName)
        if(someLength == 2 && JSON.stringify(thisUser) ==  '[]') {
            const {data: users} = await supabase.from('users').insert({username: user?.firstName, email: email, role: finalRole})
            const {data: verifyUpdate} = await supabase.from('users').update({verified: true}).eq('username', user?.firstName)
            setVerified('yes')
            console.log('uploaded')
        }
        else if (JSON.stringify(thisUser) != '[]'){
            alert('you are already verified')
        }
        if(email == ''){
            alert('the email place is empty')
        }
        else{
            alert('choose only one role')
            console.log(JSON.stringify(thisUser))
        }

    }
    if(verified === ''){
    return(
        <div className = 'border-1 border-gray-700 p-12 px-20 rounded-xl'>
        <div className = 'text-3xl font-bold py-4 '>Verification</div>
        <Input label = 'Enter your Email' value = {email} onValueChange={setEmail} className = 'py-4'/>
        <CheckboxGroup label = 'select your role' value = {role} onValueChange={setRole} className = 'py-4 gap-4 items-center'>
            <Checkbox value = 'writer'>Writer</Checkbox>
            <Checkbox value = 'editor'>Editor</Checkbox>
            <Checkbox value = 'admin'>Administrator</Checkbox>
        </CheckboxGroup>
        <div className = 'py-4'>
        <Button onClick = {UploadingData} className = 'px-20' variant = 'flat' color = 'success'>Verify</Button>
        </div>
        </div>
    )}
    else if(finalRole == 'admin'){
        return(
            <div>
                <div>Your admin request has been sent!</div>
                <Link href = '/dashboard'>Return to Dashboard</Link>
            </div>
        )
    }
    else{
        return(
            <div>
                <div>You are verified</div>
                <Link href = '/dashboard'>Return to Dashboard</Link>
            </div>
        )
    }
}
