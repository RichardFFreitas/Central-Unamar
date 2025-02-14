
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BusinessCard from "@/components/BusinessCard";
import PlanCard from "@/components/PlanCard";

const FEATURED_BUSINESSES = [
  {
    name: "Ocean View Restaurant",
    category: "Restaurant",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    name: "Sunset Beach Hotel",
    category: "Hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  },
  {
    name: "Waves Surf Shop",
    category: "Retail",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&q=80",
  },
];

const SUBSCRIPTION_PLANS = [
  {
    name: "Basic",
    price: 24,
    features: [
      "Basic business listing",
      "Contact information",
      "One category listing",
      "Basic analytics",
    ],
  },
  {
    name: "Professional",
    price: 54,
    features: [
      "Premium business listing",
      "Multiple photos",
      "Multiple category listings",
      "Advanced analytics",
      "Priority support",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 74,
    features: [
      "VIP business listing",
      "Unlimited photos",
      "Featured in search results",
      "Custom analytics dashboard",
      "24/7 priority support",
      "Social media integration",
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-primary-hover text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the best businesses in Unamar!
            </h1>
            <p className="text-lg text-primary-light mb-8">
              Discover local businesses, read reviews, and connect with the community
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Businesses</h2>
            <p className="text-gray-600">Discover the most popular places in Unamar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_BUSINESSES.map((business, index) => (
              <BusinessCard key={index} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Central Unamar</h3>
              <p className="text-gray-600 text-sm">
                Your trusted local business directory in Unamar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-600 hover:text-primary text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-primary text-sm">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/businesses" className="text-gray-600 hover:text-primary text-sm">
                    All Businesses
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-primary text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-primary text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Central Unamar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
