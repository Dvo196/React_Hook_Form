import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";

const SignupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("You must specify a password")
    .min(8, "Password must have at least 8 characters"),
  password_repeat: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("You must confirm your password"),
});

export default function Form() {
  // const [successMsg, setSuccessMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Welcome!");
    reset();
    setFormSubmitted(true);
    // setSuccessMsg("Login successful.");
  };

  return (
    <form
      style={{
        display: formSubmitted ? "none" : "block",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* {successMsg && <p>{successMsg}</p>} */}
      <div>
        <label>First Name</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <p   className="errorMsg">{errors.firstName.message}</p>
        )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Last Name</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <p className="errorMsg">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label>Repeat Password</label>
        <input type="password" {...register("password_repeat")} />
        {errors.password_repeat && (
          <p className="errorMsg">{errors.password_repeat.message}</p>
        )}
      </div>
      <input type="submit" />
    </form>
  );
}