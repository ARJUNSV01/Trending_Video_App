import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { serverURL } from '../../serverUrl';
import { useDispatch,useSelector } from 'react-redux';
import { signUpUser } from '../../features/authSlice';

import { signupSchema } from './Validation';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[cPassword,setCPassword]=useState('')
    const[error,setError]=useState('')
    const[loading,setLoading]=useState(false)
    const[show,setShow]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {user,isLoading} = useSelector((state)=>state.auth)
    const handleClick = () => setShow(!show)
    const handleSubmit =async()=>{
      setLoading(true)
      const userData ={
        name,
        email,
        password,
        cPassword
      }
    await signupSchema.validate(userData,{abortEarly:false}).then((response)=>{
        console.log(response)
        dispatch(signUpUser(userData))  
        
       
    }).catch((error)=>{
       setError(error.inner[0].message)
    })
      
    }
    if(user){
      navigate('/')
    }
    

  return (
    <VStack spacing={5}>
      {error?<Alert status='error'>
    <AlertIcon />
    {error}
  </Alert>:''}
      
<FormControl id='name' isRequired>
    <FormLabel>Name</FormLabel>
    <Input 
    placeholder='Enter Your Name'
    onChange={(e)=>{
      setError('')
      setName(e.target.value)
    }}
    />
    
</FormControl>
<FormControl id='email' isRequired>
    <FormLabel>Email</FormLabel>
    <Input 
    placeholder='Enter Your Email'
    onChange={(e)=>{
      setError('')
        setEmail(e.target.value)
    }}
    />
     
</FormControl>
<FormControl id='password' isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup>
    <Input 
    type={show?"text":"password"}
    placeholder='Enter Password'
    onChange={(e)=>{
      setError('')
      setPassword(e.target.value)
    }}
    />
     <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
</FormControl>
<FormControl id='cPassword' isRequired>
    <FormLabel>Confirm Password</FormLabel>
    <InputGroup>
    <Input 
    type={show?"text":"password"}
    placeholder='Enter the Password again'
    onChange={(e)=>{
      setError('')
      setCPassword(e.target.value)
    }}
    />
     <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
</FormControl>
<Button
    colorScheme="blue"
    width="100%"
    style={{marginTop: 15}}
    onClick={handleSubmit}
    isLoading={isLoading}
    >
        Sign Up
</Button>

    </VStack>
  )
}

export default SignUp