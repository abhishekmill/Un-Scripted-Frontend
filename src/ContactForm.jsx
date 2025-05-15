import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  cc: Yup.string().required("CC is required"),
  phone: Yup.string().required("Phone number is required"),
  company: Yup.string().required("Company is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
  const handleSubmit = (values, actions) => {
    console.log("Form data:", values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        cc: "",
        phone: "",
        company: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className=" w-lg mx-auto text-white">
        {/* Name */}
        <label className="block mb-1">Name</label>
        <Field
          name="name"
          className="w-full mb-2 p-3 bg-[#333] placeholder-gray-400 focus:outline-none"
          placeholder="Your Name"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mb-2"
        />

        {/* Email */}
        <label className="block mb-1">Email</label>
        <Field
          name="email"
          type="email"
          className="w-full mb-2 p-3 bg-[#333] placeholder-gray-400 focus:outline-none"
          placeholder="Your Email"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mb-2"
        />

        {/* Phone */}
        <label className="block mb-1">Phone Number</label>
        <div className="flex gap-2 mb-2">
          <Field
            name="cc"
            className="w-1/3 p-3 bg-[#333] placeholder-gray-400 focus:outline-none"
            placeholder="Your CC"
          />
          <Field
            name="phone"
            className="w-2/3 p-3 bg-[#333] placeholder-gray-400 focus:outline-none"
            placeholder="Your Number"
          />
        </div>
        <div className="flex gap-2">
          <ErrorMessage
            name="cc"
            component="div"
            className="text-red-500 text-sm mb-2 w-1/3"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-red-500 text-sm mb-2 w-2/3"
          />
        </div>

        {/* Company */}
        <label className="block mb-1">Brand / Company</label>
        <Field
          name="company"
          className="w-full mb-2 p-3 bg-[#333] placeholder-gray-400 focus:outline-none"
          placeholder="Your Company"
        />
        <ErrorMessage
          name="company"
          component="div"
          className="text-red-500 text-sm mb-2"
        />

        {/* Message */}
        <label className="block mb-1">What can we help you with?</label>
        <Field
          as="textarea"
          name="message"
          className="w-full mb-2 p-3 bg-[#333] placeholder-gray-400 h-32 focus:outline-none"
          placeholder="Your Message"
        />
        <ErrorMessage
          name="message"
          component="div"
          className="text-red-500 text-sm mb-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 font-semibold hover:bg-gray-200 transition"
        >
          SUBMIT
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
