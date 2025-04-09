import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const MiniUserProfile = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [comercioSlug, setComercioSlug] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("tipo_usuario, comercio_slug")
          .eq("id", user.id)
          .single();
        
        if (data) {
          setTipoUsuario(data.tipo_usuario);
          setComercioSlug(data.comercio_slug);
        }
      }
    };
    fetchUserType();
  }, [user]);

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
    <>
    {isLoading ? (
      <div className="flex justify-center items-center animate-spin">
        <LoaderCircle />
      </div>
    ) : (
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {user.nome}
        </h2>
        <h3 className="mb-4">{user.email}</h3>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSignOut}
            className="font-bold text-lg text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            Deslogar
          </Button>
          {tipoUsuario === "comercio" && comercioSlug && (
            <Link className="text-center rounded-md px-4 py-2 h-10 font-bold text-lg text-white bg-primary hover:bg-primary-hover transition-colors" to={`/business/${comercioSlug}`}>
              <span>Meu Comércio</span>
            </Link>
          )}
          {tipoUsuario === "jornalista" && (
            <Link to='/news/form' className="text-center rounded-md px-4 py-2 h-10 font-bold text-lg text-white bg-primary hover:bg-primary-hover transition-colors">
              <span>Publicar Notícia</span>
            </Link>
          )}
          {tipoUsuario === "adm" && (
            <>
              <Link className="text-center rounded-md px-4 py-2 h-10 font-bold text-lg text-white bg-primary hover:bg-primary-hover transition-colors" to={`/register`}>
                <span>Registrar Comércio</span>
              </Link>
              <Link to='/news/form' className="text-center rounded-md px-4 py-2 h-10 font-bold text-lg text-white bg-primary hover:bg-primary-hover transition-colors">
                <span>Publicar Notícia</span>
              </Link>
            </>
          )}
        </div>
      </div>
    )}
  </>
  );
};
