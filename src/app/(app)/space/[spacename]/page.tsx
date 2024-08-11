'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAppSelector } from '@/redux/hooks'
import { getSpaces } from '@/redux/spaceslice'
import { Heart, Link2, Pen, Settings } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect, useState } from 'react'
import { Message } from '@/schemas/Message'
import { Space } from '@/schemas/Space'
import SpaceHeader from '@/components/SpaceHeader'
import { Button } from '@/components/ui/button'
import EditSpace from '@/components/space/EditSpace'
import MessageComponent from '@/components/MessageComponent'

const Page = () => {
    const spaces = useAppSelector(getSpaces)
    const params = useParams()
    const [space, setSpace]=useState<Space>()
    const [editSpace, setEditSpace]=useState(false)

    useEffect(()=>{
        const space = spaces?.find((space) => space?.name === params.spacename)
        setSpace(space)
        console.log(space)
    }, [spaces, params])

    if (!space){
    return (
        <div className='w-full text-center my-12'>No space found</div>
         )}

    return (
        <>
       {
        editSpace? <EditSpace setEditSpace={setEditSpace} space={space}/> : 
         <div>
            <Separator className='my-4' />
            {space && (            
    <><SpaceHeader space={space} h={'24'} w={'24'} bg={"background"} p={'py-1'}/>
      <div className='flex w-full justify-end' >
        <Button className='flex items-center gap-3' onClick={()=>setEditSpace(true)}><Pen size={20}/>Edit Space</Button>
    </div> </>
                )}
            <Separator className='mt-4' />
            {
               space?.messages.length==0 ? <div className='h-[40vh] my-20 '>
               <DotLottieReact
            src="https://lottie.host/87e53e15-91fb-4670-b307-5eeccaf4a8e9/q1dZxDTPew.json"
           loop
            autoplay
          />
          <p className='text-center text-lg font-semibold text-neutral-800 dark:text-neutral-500'>No feedbacks yet</p>
          </div>
               :  <div className='w-full h-[60vh] flex'>
                <div className='w-[15%] p-4'>
                    <div className='pb-4'>
                        <h4 className='font-bold text-lg pb-2 cursor-pointer'>Messages</h4>
                        <p className='font-normal text-sm hover:underline cursor-pointer'>All</p>
                        <p className='font-normal text-sm hover:underline cursor-pointer'>Liked</p>
                    </div>
                    <div className='pb-4'>
                        <h4 className='font-bold text-lg pb-2 cursor-pointer'>Integrations</h4>
                        <p className='font-normal text-sm hover:underline cursor-pointer'>Embed to your site</p>
                    </div>
                </div>
                <div className='w-[85%]'>
                    <div className='p-4 w-full flex items-center justify-end'>
                        <h4 className='text-left'>{space?.messages.length} Messages</h4>
                    </div>
                    <ScrollArea className="h-[62vh] w-full rounded-md px-12 py-4">
                        {
                            space && space?.messages.map((message: Message) => {
                                return (
                              <MessageComponent message={message} space={space} key={message._id}/>
                                )
                            })
                        }
                    </ScrollArea>
                </div>
            </div>
            }

           
        </div>  }
        </>
    )
}

export default Page
