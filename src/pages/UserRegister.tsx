import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUpUser } = useSupabase();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: "usuario",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro!",
        description: "As senhas não coincidem.",
        className: "bg-red-500",
      });
      return;
    }

    try {
      await signUpUser(
        formData.email,
        formData.senha,
        formData.tipoUsuario,
        formData.nome
      );
      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso!",
        className: "bg-green-500",
      });
      navigate("/user/login");
    } catch (err: any) {
      toast({
        title: "Erro!",
        description: err.message || "Erro ao registrar usuário.",
        className: "bg-red-500",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="w-[1200px]">
          <div className="flex flex-col lg:flex-row rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Criar uma Conta
              </h2>
              <p className="text-gray-600 mb-8">
                Junte-se à nossa plataforma e comece sua jornada hoje.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="w-full">
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium mb-1"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
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
                  <div>
                    <label
                      htmlFor="confirmarSenha"
                      className="block text-sm font-medium mb-1"
                    >
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tipoUsuario"
                      className="block text-sm font-medium mb-1"
                    >
                      Tipo de Usuário
                    </label>
                    <select
                      id="tipoUsuario"
                      value={formData.tipoUsuario}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300  rounded-md"
                      required
                    >
                      <option value="usuario">Usuário</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md font-medium"
                >
                  Cadastrar
                </button>
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
