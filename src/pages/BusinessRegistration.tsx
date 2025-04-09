import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";

export default function BusinessRegistration() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
    };
    loadData();
  }, []);

  if (!user || (user.tipo_usuario !== "adm")) {
      return <NotFound />;
    }

  return (
    <div>
      {user && (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Registre seu comérico
                </h1>
                <p className="text-gray-600 mb-8">
                  Junte-se aos nossos conjuntos de comércios e aumente a
                  visibilidade da sua empresa em unamar
                </p>
                <BusinessRegistrationForm />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
