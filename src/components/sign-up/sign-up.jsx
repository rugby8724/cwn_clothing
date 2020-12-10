import React from 'react';

import FormInput from '../form-input/form-input.jsx';
import CustomButton from '../custom-button/custom-button.jsx';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';

import './sign-up.scss';

class SignUp extends React.Component {
  constructor(){
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const  {displayName, email, password, confirmPassord} = this.state;

    if(password !== confirmPassord) {
      alert('password and confirm password do not match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName});

      // after user is returned clears form
      this.state = ({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      console.error(error);
    }
  };

handleChange = event => {
  const {name, value } = event.target;

  this.setState([name]: value);
}

  rendor(){
    const  {displayName, email, password, confirmPassord} = this.state;
    return(
      <div className='sign-up'>
        <h2 className='title'>I don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
            />

          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='email'
            required
            />

          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Passowrd'
            required
            />

          <FormInput
            type='password'
            name='confirmpassword'
            value={confirmpassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
            />
          <CustomButton type='submit'>SIGN UP</CustomButton>

        </form>

      </div>
    );
  }
}

export default SignUp;
