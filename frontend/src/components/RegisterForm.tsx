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

  const [submitted, setSubmitted] = React.useState<dataForm | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget)) as dataForm;

    setSubmitted(data);
    setError(null);
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
        console.error("🔐 Fallo de autenticación:", resAuth.error);
        setError("Email o contraseña incorrectos");
        return;
      }

      router.push("/");
    } catch (err: any) {
      console.log("ERROR: " + err);
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
        errorMessage="Please enter a valid name"
        label="Name"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your name"
        type="text"
        isDisabled={loading}
        radius="full"
      />
      <Input
        isRequired
        variant="bordered"
        color="default"
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        isDisabled={loading}
        radius="full"
      />
      <Input
        isRequired
        variant="bordered"
        color="default"
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
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
          <Link href={"/"}>Volver</Link>
        </Button>
      </section>
    </Form>
  );
}
