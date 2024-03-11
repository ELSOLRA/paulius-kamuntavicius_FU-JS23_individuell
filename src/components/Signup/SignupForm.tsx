import { useState } from "react";
import { signupUser } from "../../services/apiService";
import useAuthStore from "../../store/authStore";



const SignupForm: React.FC = () => {

    const { username, password, setSignData } = useAuthStore();
    const [showForm, setShowForm] = useState(true);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignData({ [name]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await signupUser({ username, password });
      console.log(response);

      if (response.success) {

        setShowForm(false);
      }

    } catch (error) {
        console.error("Signup failed:", error);
      }
    };


  return (

    <>
    {showForm && (
    
    <section>
    <label>
      Username:
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
        Epost
      <input
        type="email"
        name="password"
        value={password}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <button onClick={handleSignup}>Sign Up</button>
  </section>
    )}
    </>
);
};


export default SignupForm;