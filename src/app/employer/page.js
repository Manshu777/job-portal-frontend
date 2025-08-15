import React from 'react'
import EmployerLogin from '../components/EmployerLogin';


export const metadata = {
    title: "Employer Login – Access Top Talent and Manage Your Job Listings",
    description:
      "Login to your employer account to post job openings, review applicants, and manage your recruitment process. Connect with skilled professionals and find the perfect candidate for your business today!",
  };
  

export default function page() {

  return (
    <div className=''>
      <EmployerLogin/>
    </div>
  )
}
