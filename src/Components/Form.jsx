import React from "react";
import "../Components/Form.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { Nav } from "react-bootstrap";
import axios from "../api/api";
const REGISTER_URL = "/users/signup";
const formValidationSchema = yup.object({
  name: yup
    .string()
    .required("Why not fill Your Good Name😊‼")
    .min(5, "Atleast 5 Characs")
    .max(20, "Max 20 Characs"),
  email: yup
    .string()
    .email("Please Specify a valid email !!")
    .required("Why not fill Your Email😊‼"),
  password: yup
    .string()
    .min(8, "Need Longer Password")
    .max(12, "Too Much Password - Should be Within 12 Characs")
    .required("Password is Mandatory"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], " Password Does not Match"),
});
const FormComp = () => {
  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async ({ name, password, email }, actions) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({ username: name, password, email }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
        console.log(JSON.stringify(response));
      } catch (error) {
        console.log(error);
      }
      actions.resetForm();
    },
  });

  return (
    <div className="sign-up-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name"> User Name</label>
          <input
            type="text"
            id="name"
            value={values.name}
            placeholder="Enter Your Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? errors.name : null}
        </div>
        <div className="input-group">
          <label htmlFor="email"> Email Address</label>
          <input
            type="email"
            id="email"
            value={values.email}
            placeholder="Enter Your Email ID"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? errors.email : null}
        </div>
        <div className="input-group">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? errors.password : null}
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            value={values.confirmPassword}
            placeholder="Re-Enter Your Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.confirmPassword && errors.confirmPassword
          ? errors.confirmPassword
          : null}
        <button disabled={isSubmitting} type="submit">
          Sign Up
        </button>
      </form>
      <p>Already a Customer ?</p>
      <p>
        <Nav.Link>Sign In</Nav.Link>
      </p>
    </div>
  );
};

export default FormComp;
