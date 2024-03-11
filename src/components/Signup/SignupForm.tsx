import { useState } from "react";
import { authenticateUser } from "../../services/apiService";
import useAuthStore from "../../store/authStore";



const AuthForm: React.FC<{ defaultEndpoint: 'signup' | 'login' }> = ({ defaultEndpoint }) => {

    const { username, email, password, setSignData } = useAuthStore();
    const [showForm, setShowForm] = useState(true);
    const [endpoint, setEndpoint] = useState<'signup' | 'login'>(defaultEndpoint);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignData({ [name]: value });
  };

  const handleAuth = async () => {
    try {
      console.log({ username, password })
      const response = await authenticateUser({ username, password }, endpoint);
      console.log(response);

      if (response.success) {

        if (endpoint === 'signup') {
          const userData = { username, email };
          console.log(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          

        } else {
          const savedUserData = JSON.parse(sessionStorage.getItem('userData') || '{}');
          console.log(`Logged in as: ${savedUserData.username}`);
        }
        setShowForm(false);
        setSignData({ username: '', email: '', password: '' });
      }

    } catch (error) {
        console.error("${endpoint} failed:", error);
      }
    };

    const toggleEndpoint = () => {
      setEndpoint(endpoint === 'signup' ? 'login' : 'signup');
      setShowForm(true);
    };
  


  return (

    <>
    {showForm && (
      <section>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={handleInputChange} />
        </label>
        <br />
        {endpoint === 'signup' && (
          <>
            <label>
              Email:
              <input type="email" name="email" value={email} onChange={handleInputChange} />
            </label>
            <br />
          </>
        )}
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handleInputChange} />
        </label>
        <br />
        <button onClick={handleAuth}>{endpoint === 'signup' ? 'Brew me a cup!' : 'Log In'}</button>
          {endpoint === 'signup' && (
            <button onClick={toggleEndpoint}>Logga In</button>
            )}
  </section>
    )}
    </>
);
};


export default AuthForm;