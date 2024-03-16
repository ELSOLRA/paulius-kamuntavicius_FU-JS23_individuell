import { useState } from "react";
import { authenticateUser, /* fetchOrderHistory */ } from "../../../services/apiService";
import useAuthStore from "../../../store/authStore";
import "./signupForm.scss"
import { AuthFormProps, OrderHistoryItem, /* OrderHistoryResponse */ } from "./SignupForm-Interfaces";
import BeanLogoIcon from "../../icons/BeanLogo";
import ActionButton from "../../common/ActionButton/ActionButton";
import { useLoggedStore } from "../../../store/loggedStore";

export interface User {
  username: string;
  email: string;
  token?: string;
  orderHistory?: OrderHistoryItem[];
}

const AuthForm: React.FC<AuthFormProps> = ({ defaultEndpoint, /* loginSuccess, */ signupSuccess }) => {
  const { username, email, password, setSignData } = useAuthStore();
  const { isLoggedIn, login } = useLoggedStore();
  // const [showForm, setShowForm] = useState(true);
  const [endpoint, setEndpoint] = useState<'signup' | 'login'>(defaultEndpoint);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [gdpr, setGdpr] = useState(false);


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

    if (name === 'gdpr' && value === 'true') {
      delete errorsCopy.gdpr;
    }

    const hasErrors = Object.keys(errorsCopy).length > 0;
    setErrors(errorsCopy);
    console.log('error :  ', errorsCopy)

    return hasErrors;
  };



  const handleSignup = async () => {
    try {
      const response = await authenticateUser({ username, password }, 'signup');


      if (response.success) {
        const userData = { username, email };
        console.log(response.success)
        userList.push(userData);
        localStorage.setItem('userList', JSON.stringify(userList));


        setEndpoint('login');
        signupSuccess(username, email);
        // setShowForm(false);
        handleLogin(username, password);
      } else {
        console.error("Signup failed:", response.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {

      const response = await authenticateUser({ username, password }, 'login');
      console.log('procceding to login', response.success);
      

      if (response.success) {
        const userIndex = userList.findIndex((user) => user.username === username);
        console.log('found user index in local storage ', userIndex)
        console.log(`user got toke :  ${response.token}`);
        
        if (userIndex !== -1) {
          userList[userIndex].token = response.token;
        
          sessionStorage.setItem('userList', JSON.stringify(userList[userIndex]));

          login();

          /* let orderHistoryResponse: OrderHistoryResponse;
          const orderHistoryExists = userList[userIndex]?.orderHistory?.length ?? 0;
          if (orderHistoryExists) {
            // Fetches order history if it exists
            orderHistoryResponse = await fetchOrderHistory(response.token);
          } else {
            orderHistoryResponse = { success: false, error: "User has no order history" };
          }
          if (orderHistoryResponse.success) {
            loginSuccess(userList[userIndex].username, userList[userIndex].email, orderHistoryResponse.orderHistory as OrderHistoryItem[]);
            console.log('whats inside loginSuccess: ' ,{loginSuccess})
          } else {
            console.error("Failed to fetch order history:", orderHistoryResponse.error);
          } */

        } else {
          console.error(`User not found for username: ${username}`);
        }

        // setShowForm(false);
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
    // setShowForm(true);
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log("Form submitted");

    if (!gdpr) {
      return;
    }

    const hasErrors = validateInput('gdpr', gdpr ? 'true' : 'false'); //  this triggers GDPR validation
    if (!hasErrors) {
      console.log("No errors. Proceeding with authentication.");
      if (endpoint === 'signup') {
        console.log("Calling handleSignup");
        await handleSignup();
      } else {
        console.log("Calling handleLogin");
        await handleLogin(username, password);
      }
    } else {
      console.log("Validation errors detected. Form Submission Blocked.");
      console.log(hasErrors);
      
    }
  };



  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setGdpr(isChecked);
    if (isChecked) {
      setErrors({ ...errors, gdpr: "" });
    }

  };
  return (
    !isLoggedIn && (
      <section className="auth-wrapper">
        <section className="auth__header">
          <BeanLogoIcon />
          <h2 className="auth__header--title">
            {endpoint === 'signup' ? 'Välkommen till AirBean-familjen!' : 'Välkommen!'}
          </h2>
          <p className="auth__header--additonal-info">
            {endpoint === 'signup' ? 'Genom att skapa ett konto nedan kan du spara och se din orderhistorik.' : ' Logga in.'}
          </p>
        </section>

        <form onSubmit={handleAuth} className="auth-form">
          {!isLoggedIn && (
            <section className="auth-form__section">
              <label className="auth-form__label">
                Namn
                <input type="text" name="username" value={username} onChange={handleInputChange} className="auth-form__input" />
                {errors.username && <div className="auth-form__error">{errors.username}</div>}
              </label>

              {endpoint === 'signup' && (
                <>
                  <label className="auth-form__label">
                    Epost
                    <input type="email" name="email" value={email} onChange={handleInputChange} className="auth-form__input" />
                    {errors.email && <div className="auth-form__error">{errors.email}</div>}
                  </label>
                </>
              )}

              <label className="auth-form__label">
                Lösenord:
                <input type="password" name="password" value={password} onChange={handleInputChange} className="auth-form__input" />
                {errors.password && <div className="auth-form__error">{errors.password}</div>}
              </label>

              <div className="auth-form__checkbox-section">
                <div className="auth-form__checkbox" >
                  <input
                    onChange={onChange}
                    checked={gdpr}
                    type="checkbox"
                    id="gdpr"
                    className="auth-form__checkbox--input"
                  />
                  <p className="auth-form__checkbox--label">GDPR Ok!</p>
                </div>
                {errors?.gdpr && <div className="auth-form__error">{errors.gdpr}</div>}
              </div>

              <div className="form-btns">
                <ActionButton label={endpoint === 'signup' ? 'Brew me a cup!' : 'Log In'} />
                {endpoint === 'signup' && <ActionButton onClick={toggleEndpoint} label="Logga In" />}
              </div>
            </section>
          )}
        </form>
      </section>
    )
  );
}

export default AuthForm;