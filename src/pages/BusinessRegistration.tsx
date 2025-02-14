
import Header from "@/components/Header";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm";

export default function BusinessRegistration() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Business</h1>
            <p className="text-gray-600 mb-8">
              Join our business directory and increase your visibility in Unamar.
            </p>
            <BusinessRegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
