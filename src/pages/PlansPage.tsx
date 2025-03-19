import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Plans from "@/components/Plans";
import { Helmet } from 'react-helmet-async'; // Importando o Helmet

const PlansPage = () => {
  return (
    <div>
      <Helmet>
        <title>Planos de Assinatura - Central Unamar</title>
        <meta name="description" content="Confira os planos de assinatura para seu comércio no Central Unamar. Escolha o plano ideal para a sua necessidade e tenha mais visibilidade na plataforma." />
      </Helmet>
      <Header />
      <Plans />
      <Footer />
    </div>
  );
};

export default PlansPage;
