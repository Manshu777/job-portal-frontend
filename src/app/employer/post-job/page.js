'use client'

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseurl } from '@/app/components/common'
import Sidebar from '@/app/components/Sidebar'

const MultiStepJobPostingForm = dynamic(() => import('@/app/components/MultiStepJobPostingForm'), { ssr: false });
const Page = () => {
  const [userdata, setIsLoggedIn] = useState(null)
  const [companies, setCompanies] = useState(null)


  


  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('employerToken')
      if (!token) {
        setIsLoggedIn(null)
        return
      }

      try {
        // Run both API calls concurrently
        const [profileRes, companiesRes] = await Promise.all([
          axios.get(`${baseurl}/employer/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseurl}/companies`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])


        // Set user data from profile response
        setIsLoggedIn(profileRes.data.data)
        setCompanies(companiesRes.data.data)


        console.log('companiesRes',companiesRes.data.data)
        // Optionally, handle companiesRes.data if needed
        // Example: console.log(companiesRes.data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setIsLoggedIn(null)
      }
    }

    checkLogin()
  }, [])


  console.log('loggedIn',userdata)
  return (
    <>
      {/* <Sidebar /> */}
     <div className='relative h-auto'>
       <div className="bg-gray-100 p-4 md:p-8 lg:p-12 xl:p-16">
        <MultiStepJobPostingForm companies={companies} userdata={userdata} />
      </div>
     </div>
    </>
  )
}

export default Page