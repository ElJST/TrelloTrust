import LoginForm from "@/components/LoginForm";

export default function login() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="min-w-80 min-h-auto border rounded-2xl px-4 py-6 shadow-2xl shadow-blue-400">
        <h2 className="text-center text-xl font-semibold">Login</h2>
        <LoginForm />
      </div>
    </section>
  );
}
