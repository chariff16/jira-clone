import { Loader } from 'lucide-react'
import React from 'react'

const DashboarLoading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Loader className='size-6 animate-spin text-muted-foreground' />
        </div>
    )
}

export default DashboarLoading
