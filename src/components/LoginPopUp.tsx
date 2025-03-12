import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPopup = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao logar, ${error.message}`,
        variant: "destructive",
        className: "bg-red-600",
      });
    } else {
      setUser(data?.user);
      toast({
        title: "Sucesso",
        description: "Você fez login com sucesso",
        variant: "default",
        className: "bg-green-600",
      });
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    let { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao deslogar",
        description: `Não foi possivel deslogar, ${error}`,
        variant: "destructive",
      });
    }
    toast({
      title: "Usuário deslogado com sucesso",
      className: "bg-green-600",
    });
    setIsLoading(false);
    setUser(null);
  };

  return (
    <div className="popup-content">
      {isLoading ? (
        <div className="flex justify-center items-center animate-spin">
          <LoaderCircle />
        </div>
      ) : (
        <div>
          {user && (
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Logado
              </h2>
              <h3 className="mb-4">{user.email}</h3>
              <Link to="/register" className="mb-4 font-bold text-lg text-white bg-primary text-center rounded-md p-2 hover:bg-primary-hover transition-colors">Registrar comércios</Link>
              <Button
                className="font-bold text-lg text-white hover:bg-primary-hover transition-colors"
                onClick={handleSignOut}
              >
                Deslogar
              </Button>
            </div>
          )}
          {!user && (
            <div>
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
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
