'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstName } from '@/utils/getfirstname';
import { Separator } from '@/components/ui/separator';
import { Link2, Rocket, Settings } from 'lucide-react';
import { Session } from '@/schemas/Session';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { getSpaces } from '@/redux/spaceslice';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Space } from '@/schemas/Space';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SpaceHeader from '../SpaceHeader';

const Dashboard = ({ user, setCreateSpace }: { user: Session, setCreateSpace: (value: boolean) => void }) => {
  const spaces = useAppSelector(getSpaces) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spaces.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(spaces.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className='flex items-center justify-start gap-5 mt-16'>
        <Avatar className='h-32 w-32'>
          <AvatarImage src={user?.profilepic} />
          <AvatarFallback>pf</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-5xl'>{getFirstName(user?.username || '')}&apos;s Dashboard</h1>
          <p className='font-normal text-lg'>{user?.email}</p>
        </div>
      </div>  
      <Separator className="my-12" />
      <div className='w-full flex items-center justify-between mb-6'>
        <h2 className='font-bold text-3xl'>Spaces</h2>
        <Button className='flex items-center justify-between gap-3' onClick={() => setCreateSpace(true)}>
          <Rocket size={20} /> Create Space
        </Button>
      </div>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((space: Space) => (
          <Link href={`space/${space?.name}`} key={space?._id}>     
        <SpaceHeader space={space} h={'16'} w={'16'} bg={'dark:bg-neutral-800 bg-neutral-200'} p={'py-5'}/>
        </Link>
        ))
      ) : (
        <div className='h-[40vh] '>
         <DotLottieReact
      src="https://lottie.host/87e53e15-91fb-4670-b307-5eeccaf4a8e9/q1dZxDTPew.json"
     loop
      autoplay
    />
    <p className='text-center text-lg font-semibold text-neutral-800 dark:text-neutral-500'>No spaces yet, create one?</p>
    </div>
      )}
      {spaces.length > itemsPerPage && (
        <Pagination className='pt-4 pb-12'>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                className='cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              )}
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className='cursor-pointer'
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default Dashboard;
