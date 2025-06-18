
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { XCircle } from "lucide-react";

export default function PaymentCanceled() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Pagamento Cancelado
            </h1>
            <p className="text-gray-600 mb-6">
              Seu pagamento foi cancelado. Nenhuma cobrança foi realizada.
            </p>
            
            <div className="space-y-3">
              <Link 
                to="/plans"
                className="block w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Voltar aos Planos
              </Link>
              <Link 
                to="/"
                className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
              >
                Ir para Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
