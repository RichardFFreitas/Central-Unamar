
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BusinessCard from "@/components/BusinessCard";
import PlanCard from "@/components/PlanCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";

const FEATURED_BUSINESSES = [
  {
    id: 1,
    name: "Ocean View Restaurant",
    category: "Restaurant",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    id: 2,
    name: "Sunset Beach Hotel",
    category: "Hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  },
  {
    id: 3,
    name: "Waves Surf Shop",
    category: "Retail",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&q=80",
  },
  {
    id: 4,
    name: "Fitness Center",
    category: "Health & Fitness",
    rating: 4.5,
    location: "Sports Complex",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    whatsapp: "5521999999995",
    website: "https://example.com/fitness-center"
  },
  {
    id: 5,
    name: "Gourmet Market",
    category: "Food & Grocery",
    rating: 4.7,
    location: "Marina District",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    whatsapp: "5521999999996",
    website: "https://example.com/gourmet-market"
  },
  {
    id: 6,
    name: "Wellness Spa",
    category: "Health & Beauty",
    rating: 4.9,
    location: "Coastal Avenue",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    whatsapp: "5521999999997",
    website: "https://example.com/wellness-spa"
  },
  {
    id: 7,
    name: "Café Marina",
    category: "Restaurant",
    rating: 4.8,
    location: "Downtown Unamar",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1947&q=80",
    whatsapp: "5521999999999",
    website: "https://example.com/cafe-marina"
  },
  {
    id: 8,
    name: "Tech Hub",
    category: "Technology",
    rating: 4.6,
    location: "Business District",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    whatsapp: "5521999999998",
    website: "https://example.com/tech-hub"
  }
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
      <div className="relative bg-black h-[500px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/Unamar.jpg"
          alt="Unamar City"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Find the best businesses in Unamar
        </h1>
        <div className="max-w-2xl mx-auto">
          <SearchBar/>
          <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors">
            Register Your Business
          </button>
        </div>
      </div>
    </div>

      {/* Featured Businesses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Businesses</h2>
        <FeaturedCarousel businesses={FEATURED_BUSINESSES} />
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
