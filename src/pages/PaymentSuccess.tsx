
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Wait 3 seconds then redirect to business registration
      const timer = setTimeout(() => {
        setIsRedirecting(false);
        navigate('/register', { 
          state: { 
            fromPayment: true, 
            sessionId: sessionId 
          } 
        });
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // If no session ID, redirect immediately to plans
      navigate('/plans');
    }
  }, [sessionId, navigate]);

  if (!sessionId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Pagamento Realizado com Sucesso!
            </h1>
            <p className="text-gray-600 mb-6">
              Seu plano foi ativado. Você será redirecionado para o cadastro do seu comércio.
            </p>
            
            {isRedirecting && (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-500">Redirecionando...</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
