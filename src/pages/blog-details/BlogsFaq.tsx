import FAQ from '@/components/ui/FAQ'
import { blogsFaqData } from '@/data/FAQData'
import React from 'react'

function BlogsFaq() {
  return (
    <div className='w-full'>
        <FAQ data={blogsFaqData}/>
    </div>
  )
}

export default BlogsFaq