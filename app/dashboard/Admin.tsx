
'use client'
import React, { useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Chip, Snippet, Input, CircularProgress} from "@nextui-org/react";
import { HiMiniCog } from "react-icons/hi2";
import { Inter as FontSans } from "next/font/google"
import {Archivo as ArcFont} from 'next/font/google'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import supabase from './client'
import { UserButton, useUser } from '@clerk/nextjs';
import { MdOutlinePending } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const arcFont = ArcFont({
    subsets: ['latin']
})

function Admin() {
      const { isLoaded, isSignedIn, user } = useUser();
    const [magazineData, setMagazineData] = useState('')
    const [status, setStatus] = useState('')
    const [owner, setOwner] = useState('')
    const [role, setRole] = useState('')
    const [token, setToken] = useState('')
    const [MagazineVisibility, setMagazineVisibility] = useState('hidden')
    const [notFoundVisibility, setNotFoundVisiblity] = useState('')
    const [magazineTokenValue, setMagazineTokenValue] = useState('')
    const [pendingScreen, setPendingScreen] = useState('hidden')
    const [youText, setYouText] = useState('')

    async function getMagazines(){
        const {data:magazines} = await supabase.from('users').select()
        const {data: magaDetails} = await supabase.from('magazines').select('status').eq('magazine_name', magazineData)
        const {data: magaOwner} = await supabase.from('magazines').select('owner').eq('magazine_name', magazineData)
        const ownerName = JSON.stringify(magaOwner).slice(11, -3)
        const {data: roles} = await supabase.from('users').select('role').eq('username', user?.firstName)
        const {data: userTokens} = await supabase.from('users').select('userToken').eq('username', user?.firstName)
        const {data: pendingAssignedMagazine} = await supabase.from('users').select('pendingMagazineRequest').eq('username', user?.firstName)
        setRole(JSON.stringify(roles).slice(10, -3))
        setToken(JSON.stringify(userTokens).slice(15, -3))
        setOwner(ownerName)
       
        if(JSON.stringify(pendingAssignedMagazine) != '[{"pendingMagazineRequest":null}]') {
            setPendingScreen('')
            setNotFoundVisiblity('hidden')
            setMagazineVisibility('hidden')
        }else if (JSON.stringify(pendingAssignedMagazine) == '[{"pendingMagazineRequest":null}]'){
            setPendingScreen('hidden')
            setNotFoundVisiblity('')
            setMagazineVisibility('hidden')
        }   
        if(magazineData){
            setNotFoundVisiblity('hidden')
            setMagazineVisibility('')
        }
        if(JSON.stringify(magaDetails) == '[{"status":"active"}]'){
            setStatus('active')
        }
        else{
            setStatus('inactive')
        }
        magazines?.map((magazine) => {
            setMagazineData(magazine?.assignedMagazine?.toString())
        } )
        if(owner == user?.firstName) {
            setYouText('(you)')
        }
    }
    async function leaveMagazine(){
        const {data: leaveMagazine} = await supabase.from('users').update({assignedMagazine: null}).eq('username', user?.firstName)
        location.reload()
    }
    async function joinMagazine(){
        const {data:joining} = await supabase.from('magazines').select().eq('magazineToken', magazineTokenValue)
        
            if(JSON.stringify(joining) != "[]") {
                console.log('match found')
                const {data:checkMagazine} = await supabase.from('magazines').select('magazine_name').eq('magazineToken', magazineTokenValue)
                const magazineNameValue = JSON.stringify(checkMagazine).slice(19, -3)

                const {data: UpsertData} = await supabase.from('users').update({'pendingMagazineRequest': magazineNameValue}).eq('username', user?.firstName)
                location.reload()
                
            }
    }
    const siteUrl = window.location.href.slice(0, -9) + "profile?user="
    const profileUrl = siteUrl + user?.firstName
    getMagazines()
        return(
            
            <div className = {arcFont.className}>

                    <div className = 'inline-flex pt-8 max-sm:flex-col max-sm:flex max-sm:justify-center font-thin'>
                        <div className = 'flex-col'>


                        <div className = {MagazineVisibility}>
                        <div className = 'h-40 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8 '>
                            <div className = 'inline-flex gap-2'>
                                <div className = 'text-md gap-2'>{magazineData}</div>
                                <Chip color="success" variant="flat">{status}</Chip>
                            </div>
                            <div>
                                <div className = 'inline-flex gap-2 py-2'> <div className = 'text-gray-500'>Owner / Admin :</div><div>{owner}
                                {youText}</div></div>
                                
                                
                            </div>
                            <div ><Button color = 'primary' variant = 'flat'  className = 'my-2'>Customize</Button></div>

                        </div>
                        </div>

                        <div className = {notFoundVisibility}>
                        <div className = 'h-42 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8 '>
                            <div className = ' '>
                                Create new magazine
                            </div>
                            <div className = 'font-thin text-gray-300'>
                                create new space and invite your people here
                            </div>
                            <div className = 'py-4 inline-flex'>
                                <Link href = 'createMagazine'><Button variant = 'flat' color = 'success'>Create</Button></Link>
                            </div>
                        </div>
                        </div>

                          <div className = {pendingScreen}>
                        <div className = 'h-40 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8'>
                           <div className = 'inline-flex'><div><MdOutlinePending size = {30} color = 'red'/>
                            </div><div className = 'my-1 px-2'>Request Pending</div></div>
                            <div className = 'text-gray-400 bold-thin'>
                                Request has been sent to the admin, it will be updated soon after they accept the request.
                            </div>
                        </div>
                        </div>

                        <div className = 'border-1 border-gray-700 w-96  my-4 rounded-lg h-40'>
                        <div>
                          <div className = 'pl-6 pt-6 inline-flex'><UserButton /> <div className = ' px-4 text-lg inline-flex'>{user?.firstName} <div className = 'font-thin pl-4'>(Admin)</div></div></div>
                        </div>
                        
                        <div className = 'w-72 pt-4'><div className=' pl-6 font-thin'><Snippet size = 'sm' className = 'font-thin text-xs w-82 max-w-82 '>{profileUrl}</Snippet></div></div>
                        </div>
                        </div>
                        <div className = 'flex-col'>
                        <div className = {arcFont.className}><div className = 'w-80 bg-[#0a0a0a] p-8 h-42 rounded-2xl backdrop-blur-2xl bg-opacity-60 border-1 border-gray-700'><div className = ''>Apps</div>
                        <div className = 'py-4'>
                        <Button variant ='flat' color = 'secondary' className = 'h-12' size = 'sm'><CiLocationArrow1 size = {20}/></Button>    
                        </div></div></div>
                        <div>
                            <div className = 'my-4 bg-black border-1 border-gray-700 rounded-2xl p-6 h-36 inline-flex'>
                                <CircularProgress
                                    classNames={{
                                        svg: "w-24 h-26 drop-shadow-md",
                                        indicator: 'stroke-violet-400',
                                        track: "stroke-transparent",
                                        value: "text-sm font-thin text-white",
                                    }}
                                    value={70}
                                    showValueLabel={true}
                                    /> 
                                    <div className = 'w-44 p-6'>
                                        <div className = 'text-xl'>1/4 Submissions</div>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
)
}


export default Admin