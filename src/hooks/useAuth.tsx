import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "./use-toast";
import { supabase } from "@/lib/supabase";

// Definindo o tipo para o usuário
interface User {
  id: string;
  email?: string;
  // outros campos do usuário
}

// Definindo o tipo para o contexto
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Criando o contexto com um valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Provider que envolve o aplicativo
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir o contexto
export function useAuth() {
  const { toast } = useToast();
  const context = useContext(AuthContext);
  if (!context) {
    toast({
      title: "Erro",
      description: `Erro ao adquirir contexto`, // Acesso correto à mensagem de erro
      variant: "destructive",
    });
  }
  return context;
}
