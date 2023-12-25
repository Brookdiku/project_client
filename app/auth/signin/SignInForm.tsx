'use client'
import Toast from '@/app/components/Toast';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

const SignInForm = () => {
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [flag, setFlag] = useState<boolean>(false);
  const [resposeMessage, setResponseMessage] = useState<string>('');
  const [type, setType] = useState<string>('');

  // SSR-compatible validation and state management
  const [serverValidationErrors, setServerValidationErrors] = useState({
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side: focus on phone input
      phoneRef.current?.focus();

      // Handle any server-side validation errors
      if (Object.values(serverValidationErrors).some((error) => error)) {
        // Display validation errors
        setPhoneErrorMessage(serverValidationErrors.phone);
        setPasswordErrorMessage(serverValidationErrors.password);
      }
    }
  }, []);

  const handleSignIn = async () => {
    const phone = phoneRef.current?.value;
    const password = passwordRef.current?.value;

    // Clear any previous error messages
    setPhoneErrorMessage('');
    setPasswordErrorMessage('');

    // Perform validations
    let hasErrors = false;

    if (!phone) {
      setPhoneErrorMessage('Phone is required.');
      hasErrors = true;
    } else if (!/^\+?\d{10,15}$/.test(phone)) {
      setPhoneErrorMessage('Invalid phone format.');
      hasErrors = true;
    }

    if (!password) {
      setPasswordErrorMessage('Password is required.');
      hasErrors = true;
    }

    // Only proceed if there are no errors
    if (!hasErrors) {
      try {
        // Handle successful signup here (on the server-side)
        await signIn("credentials", {
          phone: phone,
          password: password,
          redirect: true,
          callbackUrl: "/admin/categories",
        });
      } catch (error) {
        // Handle signup errors here (on the server-side)
        setResponseMessage("Unable to perform signup.");
        setType("error");
        setFlag(true);
      }
    }
  };

  // Render the page content
  return (
    <div className='h-screen w-full bg-background flex items-center justify-center'>
    <Toast message={resposeMessage} flag={flag} type={type} />
    <div className='w-8/12 h-4/6  my-10 flex flex-row gap-2'>
      <div className='w-1/2 h-full p-4 bg-blue-500 rounded-l-sm'>

      </div>
      <div className='w-1/2 h-full p-4 rounded-r-sm flex flex-col gap-2'>
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
        <div className='flex flex-col mt-5 gap-2'>
          <Button color="primary" variant="solid" onClick={() => handleSignIn()}>
            Sign In
          </Button>
          <Button color="primary" variant="flat" >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
};
export default SignInForm;