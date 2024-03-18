import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    pwd: '',
    cpwd: '',
    date: '',
    occupation: '',
    gender: '',
    language: []
  });

  const [formError, setFormError] = useState({});

  function validateForm() {
    let err = {};
    if (formData.username === '') {
      err.username = 'Username required';
    }

    if (formData.email === '') {
      err.email = 'Email required';
    } else {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(formData.email)) {
        err.email = 'Email not validate';
      }
    }

    if (formData.cpwd === '' || formData.pwd === '') {
      err.pwd = 'Password and Confirm password required!';
    } else {
      if (formData.cpwd !== formData.pwd) {
        err.pwd = 'Password not matched!';
      } else if (formData.pwd.length < 6) {
        console.log(formData.pwd.length);
        err.pwd = 'Password should greater than 6 charecters';
      }
    }

    if (formData.occupation === '') {
      err.occupation = 'Occupation required';
    }

    if (formData.gender === '') {
      err.gender = 'Gender required';
    }

    if (formData.language.length < 1) {
      err.language = 'Any one language required';
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  }

  function onChangeHandler(event) {
    if (event.target.name === 'language') {
      let copy = { ...formData };

      if (event.target.checked) {
        copy.language.push(event.target.value);
      } else {
        copy.language = copy.language.filter((element => element !== event.target.value));
      }
      setFormData(copy);
    } else {
      setFormData(() => ({ ...formData, [event.target.name]: event.target.value }));
    }
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      alert('Submitted');
      console.table(formData);
      // Call API
    } else {
      alert('In Valid Form');
    };
  }

  return (
    <div className="container-fluid border pb-2 mt-1" style={{ 'maxWidth': '500px' }}>
      <h1 className='text-center'>React Js Form Handling</h1>

      <form action="" onSubmit={onSubmitHandler}>
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label fw-bolder">User Name:</label>
          <input className="form-control" placeholder="Enter user name" name="username" value={formData.username}
            onChange={onChangeHandler} />
          <span className="d-block mt-1 text-danger">{formError.username}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bolder">Email:</label>
          <input type="email" className="form-control" placeholder="Enter email" name="email" value={formData.email}
            autoComplete="username" onChange={onChangeHandler} />
          <span className="d-block mt-1 text-danger">{formError.email}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="pwd" className="form-label fw-bolder">Password:</label>
          <input type="password" className="form-control" placeholder="Enter password" name="pwd"
            autoComplete="new-password" value={formData.pwd} onChange={onChangeHandler} />
          <span className="d-block mt-1 text-danger">{formError.pwd}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="cpwd" className="form-label fw-bolder">Confirm password:</label>
          <input type="password" className="form-control" placeholder="Enter confirm password" name="cpwd"
            autoComplete="new-password" value={formData.cpwd} onChange={onChangeHandler} />
          <span className="d-block mt-1 text-danger">{formError.cpwd}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label fw-bolder">Date of birth:</label>
          <input type="date" className="form-control"name="date"
            value={formData.date} onChange={onChangeHandler} />
          <span className="d-block mt-1 text-danger">{formError.date}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="occupation" className="form-label fw-bolder">Occupation:</label>
          <select className="form-select" name="occupation" defaultValue={formData.occupation}
            onChange={onChangeHandler}>
            <option value="">-- Occupation choice -- </option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
            <option value="Worker">Worker</option>
            <option value="Other">Other</option>
          </select>
          <span className="d-block mt-1 text-danger">{formError.occupation}</span>
        </div>

        <div className='mb-4'>
          <label className="form-label fw-bolder">Gender:</label>
          <div className="form-check d-flex justify-content-around">
            <label className="form-check-label ">
              <input className="form-check-input" type="radio" name="gender" value="Male"
                checked={formData.gender === 'Male'}
                onChange={onChangeHandler} /> Male
            </label>

            <label className="form-check-label ">
              <input className="form-check-input" type="radio" name="gender" value="Female"
                checked={formData.gender === 'Female'}
                onChange={onChangeHandler} /> Female
            </label>

            <label className="form-check-label ">
              <input className="form-check-input" type="radio" name="gender" value="Other"
                checked={formData.gender === 'Other'}
                onChange={onChangeHandler} /> Other
            </label>
          </div>
          <span className="d-block mt-1 text-danger">{formError.gender}</span>
        </div>

        <div className='mb-3'>
          <label className="form-label fw-bolder">Languages:</label>
          <div className="form-check mb-3 d-flex justify-content-around">
            <label className="form-check-label ">
              <input className="form-check-input" type="checkbox" name="language" value="HTML & CSS"
                checked={formData.language.indexOf('HTML & CSS') !== -1}
                onChange={onChangeHandler} /> HTML & CSS
            </label>

            <label className="form-check-label ">
              <input className="form-check-input" type="checkbox" name="language" value="JavaScript"
                checked={formData.language.indexOf('JavaScript') !== -1}
                onChange={onChangeHandler} /> JavaScript
            </label>

            <label className="form-check-label ">
              <input className="form-check-input" type="checkbox" name="language" value="ReactJS"
                checked={formData.language.indexOf('ReactJS') !== -1}
                onChange={onChangeHandler} /> ReactJS
            </label>

            <label className="form-check-label ">
              <input className="form-check-input" type="checkbox" name="language" value="jQuery"
                checked={formData.language.indexOf('jQuery') !== -1}
                onChange={onChangeHandler} /> jQuery
            </label>
          </div>
          <span className="d-block mt-1 text-danger">{formError.language}</span>
        </div>


        <button type="submit" className="btn btn-primary d-flex mx-auto">Submit</button>
      </form>
    </div>
  );
}

export default App;
