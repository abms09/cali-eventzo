import React, { useRef,useState } from "react";
import emailjs from "@emailjs/browser";
import con from '../assets/image.png'
const Contact = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
  const formData = form.current;
  const newErrors = {};

  if (!formData.user_name.value.trim()) {
    newErrors.user_name = "Name is required";
  }

  if (!formData.user_email.value.trim()) {
    newErrors.user_email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.user_email.value)) {
    newErrors.user_email = "Invalid email format";
  }

  if (!formData.message.value.trim()) {
    newErrors.message = "Message is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const sendEmail = (e) => {
    e.preventDefault();
      if (!validateForm()) return;
    emailjs
      .sendForm(
        "service_5gr15de",         
        "template_v4b7kke",        
        form.current,
        "zW8TEeDk1mC5LWrsj"        
      )
      .then(
        (result) => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
          form.current.reset(); 
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <section
        className="relative bg-cover bg-center py-28"
        style={{ backgroundImage: `url(${con})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-red-950/90 to-black/70"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-wide">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We’d love to hear from you — events, tickets, or partnerships
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <h2 className="text-3xl font-bold">
            Contact <span className="text-red-900">Cali-Eventzo</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Cali-Eventzo is your one-stop platform to discover and book the best
            events happening in Calicut.
          </p>

          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <span className="bg-red-100 text-red-600 p-3 rounded-full">
                📍
              </span>
              <span>Calicut, Kerala, India</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-red-100 text-red-600 p-3 rounded-full">
                📧
              </span>
              <span>support@cali-eventzo.com</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-red-100 text-red-600 p-3 rounded-full">
                📞
              </span>
              <span>+91 80868 26234</span>
            </div>
          </div>
        </div>

        <div className="bg-white backdrop-blur-lg shadow-2xl rounded-2xl p-10  dark:text-gray-900">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Send Us a Message
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="font-medium">Full Name</label>
              <input type="text" name="user_name" placeholder="Enter your name" className="w-full mt-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-600 outline-none" />
              {errors.user_name && <p className="text-red-600 text-sm">{errors.user_name}</p>}
            </div>

            <div>
              <label className="font-medium">Email Address</label>
              <input type="email" name="user_email" placeholder="Enter your email" className="w-full mt-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-600 outline-none"/>
              {errors.user_email && <p className="text-red-600 text-sm">{errors.user_email}</p>}
            </div>

            <div>
              <label className="font-medium">Message</label>
              <textarea name="message" rows="4" placeholder="Type your message..." className="w-full mt-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-600 outline-none"></textarea>
              {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
            </div>

            <button type="submit" className="w-full bg-linear-to-r from-red-900 to-red-800 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform" >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
