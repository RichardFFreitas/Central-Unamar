import React, { useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export default function UserLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useSupabase();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(formData.email, formData.senha);
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso!",
        className: "bg-green-500",
      });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Erro!",
        description: err.message || "Erro ao fazer login.",
        className: "bg-red-500",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="w-[1200px]">
          <div className="flex flex-col lg:flex-row rounded-lg shadow-2xl overflow-hidden bg-white">
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">Login</h2>
              <p className="text-gray-600 mb-8">
                Entre na sua conta para continuar.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="senha"
                      className="block text-sm font-medium mb-1"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      id="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-md font-medium"
                >
                  Entrar
                </button>
                <div className="flex gap-2 text-sm">
                  <p>Ainda não está cadastrado?</p>
                  <Link to="/user/register">
                    <span className="underline">Registre-se</span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative overflow-hidden">
              <img
                src="/ORLA-DE-Unamar.jpg"
                alt="Profissionais trabalhando"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
