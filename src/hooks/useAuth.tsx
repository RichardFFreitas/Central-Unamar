import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "@/lib/supabase";

// Definindo o tipo para o usuário
interface User {
  id: string;
  email?: string;
  nome?: string;
  tipo_usuario?: string;
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

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const userId = session.user.id;  
  
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)  
          .single();  
  
        if (error) {
          console.error("Erro ao buscar usuário:", error);
          return;
        }
        setUser(data);  
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthContextProvider");
  }
  return context;
}
