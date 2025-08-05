"use client";
import { Button, Form, Input } from "@heroui/react";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  type dataForm = {
    username: string;
    email: string;
    password: string;
  };

  const [formData, setFormData] = React.useState<dataForm>({
    username: "",
    email: "",
    password: "",
  });

  const [errorName, setErrorName] = React.useState<string[]>([]);
  const [errorEmail, setErrorEmail] = React.useState<string[]>([]);
  const [errorPassword, setErrorPassword] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      const valueLen = value.length;

      if (valueLen >= 3 && valueLen <= 16) {
        setErrorName([]);
      } else {
        if (valueLen < 3) {
          setErrorName(["El nombre debe tener al menos 3 caracteres."]);
        } else if (valueLen > 16) {
          setErrorName(["El nombre no debe tener más de 16 caracteres."]);
        }
      }
    }

    if (name === "email") {
      if (validateEmail(value)) {
        setErrorEmail([]);
      }
    }

    if (name === "password") {
      if (validatePassword(value)) {
        setErrorPassword([]);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorName([]);
    setErrorEmail([]);
    setErrorPassword([]);

    const data = formData;
    let valid = true;

    if (data.username.length < 3) {
      setErrorName(["El nombre debe tener al menos 3 caracteres."]);
      valid = false;
    }

    if (data.username.length >= 16) {
      setErrorName(["El nombre no debe tener más de 16 caracteres."]);
      valid = false;
    }

    if (!validateEmail(data.email)) {
      setErrorEmail(["El email no es válido."]);
      valid = false;
    }

    if (!validatePassword(data.password)) {
      setErrorPassword([
        "La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.",
      ]);
      valid = false;
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
        data
      );

      const resAuth = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (resAuth?.error) {
        setErrorEmail(["Email o contraseña incorrectos"]);
        return;
      }

      router.push("/");
    } catch (err: any) {
      console.error("❌ Error en el registro:", err);
      setErrorEmail(["Hubo un problema al registrar el usuario, prueba otro correo."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        isRequired
        variant="bordered"
        color="default"
        errorMessage={
          errorName.length > 0 && (
            <ul>
              {errorName.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )
        }
        isInvalid={errorName.length > 0}
        label="Nombre"
        labelPlacement="outside"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Ingresa tu nombre"
        type="text"
        isDisabled={loading}
        radius="full"
      />
      <Input
        isRequired
        variant="bordered"
        color="default"
        errorMessage={
          errorEmail.length > 0 && (
            <ul>
              {errorEmail.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )
        }
        isInvalid={errorEmail.length > 0}
        label="Email"
        labelPlacement="outside"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Ingresa tu correo"
        type="email"
        isDisabled={loading}
        radius="full"
      />
      <Input
        isRequired
        variant="bordered"
        color="default"
        errorMessage={
          errorPassword.length > 0 && (
            <ul>
              {errorPassword.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )
        }
        isInvalid={errorPassword.length > 0}
        label="Contraseña"
        labelPlacement="outside"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Ingresa tu contraseña"
        type="password"
        isDisabled={loading}
        radius="full"
      />

      <section className="flex gap-4 mt-2">
        <Button
          type="submit"
          variant="shadow"
          color="warning"
          isDisabled={loading}
          isLoading={loading}
          radius="full"
        >
          {loading ? "Enviando..." : "Registrar"}
        </Button>
        <Button variant="shadow" radius="full">
          <Link href="/">Volver</Link>
        </Button>
      </section>
    </Form>
  );
}
