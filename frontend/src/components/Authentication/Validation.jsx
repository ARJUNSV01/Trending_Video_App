import * as yup from 'yup'


export const signupSchema = yup.object().shape({
    name: yup.string().required("Enter your name").min(4, "Name should be minimum 4 letters"),
   
    email: yup
      .string()
      .lowercase()
      .email("Must be a valid email!")
      .required("Email is Required!"),
     
    password: yup
      .string()
      .min(8, "Password should be Minimum 8 characters !")
      .required("Enter a password!")
      .matches(/(?=.*[a-z])/, "A lowercase is required!")
      .matches(/(?=.*[A-Z])/, "A uppercase is required!")
      .matches(/(?=.*[0-9])/, "A number is required!"),


    cPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match!")
    .required("Confirm your password!"),
    
  });

  export const loginSchema = yup.object().shape({
      email:yup.string().required("Enter your email"),
      
      password:yup.string().required("Enter your password")
  })