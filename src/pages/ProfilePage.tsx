import AuthForm from "../components/Signup/SignupForm"



type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div>
      <AuthForm defaultEndpoint='signup' />
    </div>
  )
}

export default ProfilePage