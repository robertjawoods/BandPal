import { google, login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col gap-5 pt-5'>
      <div className='flex gap-3'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className='p-3' />
      </div>
      <div className='flex gap-3'>
        <label htmlFor="password" className=''>Password:</label>
        <input id="password" name="password" type="password" required className='p-3'/>
      </div>
      <div className='flex p-3 gap-5'>
        <button formAction={login} type='submit'>Log in</button>
        <button formAction={signup} type='submit'>Sign up</button>
        <button formAction={google} type='submit'>Google</button>
      </div>
    </form>
  )
}