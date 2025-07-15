import RegisterForm from "@/components/RegisterForm";
export default function RegisterPage() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="min-w-80 min-h-auto border rounded-2xl px-4 py-6 shadow-2xl shadow-orange-400">
        <h2 className="text-center text-xl font-semibold">Register</h2>
        <RegisterForm />
      </div>
    </section>
  );
}
