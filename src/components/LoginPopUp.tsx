import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const LoginPopup = () => {
  const { setUser } = useAuth(); // Apenas o setUser é necessário aqui
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao logar, ${error.message}`, // Acesso correto à mensagem de erro
        variant: "destructive",
      });
    } else {
      
      setUser(data?.user);
      toast({
        title: "Sucesso",
        description: "Você fez login com sucesso",
        variant: "default",
      }); 
    }
  };

  return (
    <div className="popup-content">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-primary focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover focus:ring-2 focus:bg-primary focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
