"use client";

import { useState } from "react";
import "./WaitlistForm.scss";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    email: "",
    emailConfirm: "",
    phone: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (formData.email !== formData.emailConfirm) {
      setStatus("error");
      setMessage("Los correos electrónicos no coinciden.");
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Algo salió mal.");
      }

      setStatus("success");
      setMessage("¡Te has registrado correctamente en la lista de espera!");
      setFormData({
        name: "",
        lastName: "",
        idNumber: "",
        birthDate: "",
        email: "",
        emailConfirm: "",
        phone: "",
      });
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="waitlist-form">
      <h2 className="waitlist-form__title">Lista de Espera</h2>

      {status === "success" ? (
        <div className="waitlist-form__message waitlist-form__message--success">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="name">
              Nombre
            </label>
            <input
              className="waitlist-form__input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="lastName">
              Apellido
            </label>
            <input
              className="waitlist-form__input"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="idNumber">
              DNI
            </label>
            <input
              className="waitlist-form__input"
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="birthDate">
              Fecha de Nacimiento
            </label>
            <input
              className="waitlist-form__input"
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="waitlist-form__input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="emailConfirm">
              Confirmar Correo
            </label>
            <input
              className="waitlist-form__input"
              type="email"
              id="emailConfirm"
              name="emailConfirm"
              value={formData.emailConfirm}
              onChange={handleChange}
              required
            />
          </div>

          <div className="waitlist-form__group">
            <label className="waitlist-form__label" htmlFor="phone">
              Teléfono
            </label>
            <input
              className="waitlist-form__input"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {status === "error" && (
            <div className="waitlist-form__message waitlist-form__message--error">
              {message}
            </div>
          )}

          <button
            className="waitlist-form__button"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando..." : "Registrarme"}
          </button>
        </form>
      )}
      <div className="PoweredBy">
        Powered by{" "}
        <span>
          <a href="https://www.eventor.com.ar" target="_blank">
            Eventor
          </a>
        </span>
      </div>
    </div>
  );
}
