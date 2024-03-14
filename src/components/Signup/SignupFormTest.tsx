import { useState } from "react";
import { authenticateUser, fetchOrderHistory } from "../../services/apiService";
import useAuthStore from "../../store/authStore";

interface User {
  username: string;
  email: string;
  token?: string;
}

export interface OrderHistoryItem {
  total: number;
  orderNr: string;
  orderDate: string;
}

export interface OrderHistoryResponse {
  success: boolean;
  orderHistory?: OrderHistoryItem[];
  error?: string;
}

interface AuthFormProps {
  defaultEndpoint: 'signup' | 'login';
  loginSuccess: (username: string, email: string, orderHistory: OrderHistoryItem[]) => void;
}

const AuthForm1: React.FC<AuthFormProps> = ({ defaultEndpoint, loginSuccess }) => {
  const { username, email, password, setSignData } = useAuthStore();
  const [showForm, setShowForm] = useState(true);
  const [endpoint, setEndpoint] = useState<'signup' | 'login'>(defaultEndpoint);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const userList: User[] = JSON.parse(localStorage.getItem('userList') || '[]');
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignData({ [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    const errorsCopy = { ...errors };
    const usernameRegex = /^[a-zA-Z\s]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (name === 'username' && !usernameRegex.test(value)) {
      errorsCopy[name] = 'Användarnamn får endast innehålla bokstäver och mellanslag';
    } else if (name === 'email' && !emailRegex.test(value)) {
      errorsCopy[name] = 'Ange en giltig e-postadress';
    } else if (name === 'password' && !passwordRegex.test(value)) {
      errorsCopy[name] = 'Lösenord minst 8 tecken långt och innehålla minst en bokstav och en siffra.';
    } else {
      delete errorsCopy[name];
    }

    setErrors(errorsCopy);
  };

  const handleSignup = async () => {
    try {
      console.log({ username, password });
      const response = await authenticateUser({ username, password }, 'signup');
      console.log("Signup response:", response);

      if (response.success) {
        const userData = { username, email };
        console.log("Data with sign up:", userData);
        userList.push(userData);
        localStorage.setItem('userList', JSON.stringify(userList));
        
     
        setEndpoint('login');
        handleLogin();
      } else {
        console.error("Signup failed:", response.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log({ username, password });
      const response = await authenticateUser({ username, password }, 'login');
      console.log("Login response:", response);

      if (response.success) {
        const userIndex = userList.findIndex((user) => user.username === username);
        if (userIndex !== -1) {
          userList[userIndex].token = response.token;
          sessionStorage.setItem('userList', JSON.stringify(userList[userIndex]));

          console.log(`Logged in as: ${userList[userIndex].username}, Email: ${userList[userIndex].email}`);
          console.log(`Token: ${userList[userIndex].token}`);
          
          const orderHistoryResponse: OrderHistoryResponse = await fetchOrderHistory(response.token);
          console.log(`History item: ${orderHistoryResponse}`);
          
          if (orderHistoryResponse.success) {
            loginSuccess(userList[userIndex].username, userList[userIndex].email, orderHistoryResponse.orderHistory as OrderHistoryItem[]);
          } else {
            console.error("Failed to fetch order history:", orderHistoryResponse.error);
          }
          
        } else {
          console.error(`User not found for username: ${username}`);
        }

        setShowForm(false);
        setSignData({ username: '', email: '', password: '' });
      } else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const toggleEndpoint = () => {
    setEndpoint(endpoint === 'signup' ? 'login' : 'signup');
    setShowForm(true);
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (Object.keys(errors).length === 0) {
      if (endpoint === 'signup') {
        await handleSignup();
      } else {
        await handleLogin();
      }
    }
  };

  return (
    <form onSubmit={handleAuth}>
      {showForm && (
        <section>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={handleInputChange} />
            {errors.username && <div className="error">{errors.username}</div>}
          </label>
          <br />
          {endpoint === 'signup' && (
            <>
              <label>
                Email:
                <input type="email" name="email" value={email} onChange={handleInputChange} />
                {errors.email && <div className="error">{errors.email}</div>}
              </label>
              <br />
            </>
          )}
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={handleInputChange} />
            {errors.password && <div className="error">{errors.password}</div>}
          </label>
          <br />
          <button type="submit">{endpoint === 'signup' ? 'Brew me a cup!' : 'Log In'}</button>
          {endpoint === 'signup' && <button onClick={toggleEndpoint}>Logga In</button>}
        </section>
      )}
    </form>
  );
};

export default AuthForm1;