import  { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>

      <label>
        <input
          required
          placeholder=""
          type="email"
          className="input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="password"
          className="input"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span>Password</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="password"
          className="input"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <span>Confirm password</span>
      </label>

      <button type="submit" className="submit">
        Submit
      </button>

      
    </form>
  );
};

export default RegisterForm;
