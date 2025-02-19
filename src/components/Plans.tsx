import PlanCard from "@/components/PlanCard";

const SUBSCRIPTION_PLANS = [
  {
    name: "Basico",
    price: "24,99",
    features: [
      "Lista dos Comércios",
      "Link do Whatsapp",
      "1 Foto do comércio.",
    ],
  },
  {
    name: "Professional",
    price: "54,99",
    features: [
      "Lista dos comércios",
      "5 fotos de divulgação",
      "Página Própria",
      "Suporte Prioritário",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "74,99",
    features: [
      "Listagem de Comércios VIPs",
      "10 fotos de divulgação",
      "Maior destaque na aba de busca",
      "Carrosel para VIPs",
      "Suporte 24 horas",
      "Pagina Própria",
      "Integração com redes sociais"
    ],
  },
];

const Plans = () => {
  return (
    <div>
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Select the perfect visibility plan for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;