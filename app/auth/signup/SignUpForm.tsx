'use client'
import Toast from '@/app/components/Toast';
import axios from '@/lib/axios';
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'

const SignUpForm = () => {
  var phoneRef = useRef<HTMLInputElement>(null);
  var passwordRef = useRef<HTMLInputElement>(null);
  var confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [flag, setFlag] = useState<boolean>(false);
  const [resposeMessage, setResponseMessage] = useState<string>("")
  const [type, setType] = useState<string>('')
  useEffect(() => {
    phoneRef.current?.focus();
  }, [])
  const handleSignup = async () => {
    const phone = phoneRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    // Clear any previous error messages
    setPhoneErrorMessage('');
    setPasswordErrorMessage('');
    setConfirmPasswordErrorMessage('');

    // Perform all validations before sending the request
    let hasErrors = false;

    if (!phone) {
      setPhoneErrorMessage('Phone is required.');
      hasErrors = true;
    } else if (!/^\+?\d{10,15}$/.test(phone)) { // Validate phone structure
      setPhoneErrorMessage('Invalid phone format.');
      hasErrors = true;
    }

    if (!password) {
      setPasswordErrorMessage('Password is required.');
      hasErrors = true;
    } else if (password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters long.');
      hasErrors = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordErrorMessage('Confirm password is required.');
      hasErrors = true;
    } else if (password !== confirmPassword) {
      setPasswordErrorMessage('Passwords do not match.');
      setConfirmPasswordErrorMessage('Passwords do not match.');
      hasErrors = true;
    }

    // Only proceed with the signup request if there are no errors
    if (!hasErrors) {
      try {
        const response = await axios.post('/api/auth/signup', { phone, password });
        if (response.status == 201) {
          ResponseFunctionBuilder("Successfully created.", true, "success")
          clear();
        }
      } catch (error) {
        // Handle signup errors here, e.g., display a generic error message
        const status = error.response.status
        switch (status) {
          case 400:
            ResponseFunctionBuilder("Bad Request", true, "error")
            break;
          case 409:
            ResponseFunctionBuilder("User Exist", true, "warning")
            break;
          default:
            ResponseFunctionBuilder("Unable to perform signup.", true, "error")
            break;
        }
      }
    }
  };
  const ResponseFunctionBuilder = (message: string, flag: boolean, type: string) => {
    setResponseMessage(message)
    setType(type)
    setFlag(flag)
  }
  const clear =()=>{
    phoneRef.current.value=null;
    passwordRef=null;
    confirmPasswordRef=null;
  }

  return (
    <div className='h-screen w-full bg-background flex items-center justify-center'>
      <Toast message={resposeMessage} flag={flag} type={type} />
      <section className='w-full h-full grid gap-2 md:grid-cols-2 md:w-10/12 md:h-3/6 lg:w-8/12 lg:h-4/6'>
        <div className='hidden md:block bg-blue-500 rounded-l-md '>

        </div>
        <div className='w-full h-full justify-center p-4 md:p-4 md:justify-center rounded-r-sm flex flex-col gap-3'>
          <p className='text-2xl text-center font-bold text-blue-500'>ACMERA</p>
          <Input
            errorMessage={phoneErrorMessage}
            key="phone"
            type="text"
            label="Phone"
            labelPlacement="outside"
            placeholder="+251900000000"
            ref={phoneRef}
          />
          <Input
            errorMessage={passwordErrorMessage}
            key="password"
            type="password"
            label="Password"

            labelPlacement="outside"
            placeholder="********"
            ref={passwordRef}
          />
          <Input
            errorMessage={confirmPasswordErrorMessage}
            key="confirm"
            type="password"
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="********"
            ref={confirmPasswordRef}
          />
          <div className='flex flex-col mt-8 gap-2'>
            <Button color="primary" variant="solid" onClick={() => handleSignup()}>
              Sign Up
            </Button>
            <Button color="primary" variant="flat" >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUpForm