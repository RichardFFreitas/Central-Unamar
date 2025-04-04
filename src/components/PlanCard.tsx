
import { Check } from "lucide-react";

interface PlanCardProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  link: string;
}

export default function PlanCard({ name, price, features, isPopular, link }: PlanCardProps) {
  return (
    <div className={`relative bg-white rounded-lg ${isPopular ? 'ring-2 ring-primary shadow-lg' : 'border border-gray-200'} p-6 animate-fade-up`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
          Recomendado
        </span>
      )}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="mt-4 flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">R${price}</span>
          <span className="ml-1 text-gray-500">/mês</span>
        </div>
      </div>
      <ul className="my-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-primary shrink-0" />
            <span className="ml-3 text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <a href={link}  >
        <button className={`mt-8 w-full py-3 px-4  ${isPopular ? 'bg-primary hover:bg-primary-hover text-white' : 'bg-accent hover:bg-accent-hover text-primary'} font-medium rounded-lg transition-colors`}>
        Iniciar
        </button>
      </a>
    </div>
  );
}
