import React from 'react'
import Wrapper from './Wrapper'
import SectionBadge from './section-badge'
import Container from './Container'
import { perks } from '@/constants'

const Process = () => {
  return (
    <div>
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <Container>
                <div className=" w-2xl mx-auto text-start md:text-center">
                        <SectionBadge title="The Process" />
            
                        <h2 className="text-3xl lg:text-6xl font-bold mt-6">
                       Steps to Effortlessly Collect and Share Feedback
                        </h2>
                        <p className="text-muted-foreground mt-6">
                       Add feedbacks to your website with zero coding.</p>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-neutral-800 first:border-l-2 lg:first:border-none first:border-neutral-800">
                            {perks.map((perk) => (
                                <div key={perk.title} className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <perk.icon className=" w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {perk.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {perk.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Wrapper>
    </div>
  )
}

export default Process