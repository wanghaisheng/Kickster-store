import React from 'react'
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[#fff]">
      <svg className='loader-logo' width="100" height="100" viewBox="0 0 173 173" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="86.5" cy="86.5" r="86.5" fill="#111111" />
        <path d="M87.3856 102.302C84.8761 104.758 86.34 109.465 87.3856 111.512C97.7256 121.972 118.684 143.028 119.8 143.574C121.194 144.256 127.468 149.714 131.999 145.28C135.623 141.732 133.509 136.752 131.999 134.706C122.123 124.928 101.815 104.758 99.5845 102.302C96.7961 99.2325 90.5225 99.2325 87.3856 102.302Z" fill="url(#paint0_linear_2_36)" />
        <path d="M41.3252 111.385C38.2675 108.338 41.2094 103.652 43.0626 101.689C66.1112 78.6057 112.834 31.8844 115.336 29.6683C118.463 26.8983 124.022 25.8595 127.15 28.6296C129.651 30.8456 129.582 36.2599 127.15 38.671C105.143 60.485 60.7834 104.39 59.3935 105.498C58.0037 106.606 58.8144 108.268 59.3935 108.961C67.5011 116.925 83.9942 133.129 85.1061 134.237C86.496 135.622 90.2549 141.855 86.1485 145.318C82.5348 148.365 77.4618 146.587 75.377 145.318L41.3252 111.385Z" fill="#EDEDED" />
        <path d="M69.0722 30.0794L45.8879 52.7367L42.4276 56.2225C40.0053 58.6625 37.9291 65.9826 43.8117 68.4226C48.5178 70.3746 53.3853 66.9121 55.2308 64.9369C63.8816 56.3387 81.3217 38.8635 81.8754 37.7481C82.5675 36.3538 84.9897 31.1251 79.4532 27.988C75.0239 25.4782 70.687 28.3365 69.0722 30.0794Z" fill="url(#paint1_linear_2_36)" />
        <defs>
          <linearGradient id="paint0_linear_2_36" x1="110" y1="100" x2="110" y2="147" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5F5F5F" />
            <stop offset="0.5" stop-color="#B7B7B7" />
            <stop offset="1" stop-color="#EDEDED" />
          </linearGradient>
          <linearGradient id="paint1_linear_2_36" x1="56.7978" y1="-19.6643" x2="66.3401" y2="115.655" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5F5F5F" />
            <stop offset="1" stop-color="#EDEDED" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  )
}

export default Loader