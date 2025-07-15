"use client";
import { Button, Form, Input } from "@heroui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  type dataForm = {
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

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      setLoading(false);
      router.push("/");
    }
  };
  return (
    <Form onSubmit={onSubmit}>
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
          color="primary"
          isLoading={loading}
          isDisabled={loading}
          radius="full"
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
        <Button variant="shadow" radius="full">
          <Link href={"/"}>Volver</Link>
        </Button>
      </section>
      <section className="text-slate-400 text-sm mt-2">
        <p>
          Aun no estas registrado?{" "}
          <Link href={"/register"} className="text-blue-400">
            Registrate.
          </Link>
        </p>
      </section>
    </Form>
  );
}
