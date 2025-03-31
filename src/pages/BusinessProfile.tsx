import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Star, MapPin, Phone, LoaderCircle } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { useSupabase } from "@/hooks/useSupabase";
import { Business } from "@/interfaces/Business";
import { Reviews } from "@/interfaces/Reviews";
import ReviewCard from "@/components/ReviewCard";
import { Helmet } from "react-helmet-async";
import CreateReview from "@/components/CreateReview";
import { useAuth } from "@/hooks/useAuth";

export default function BusinessProfile() {
  const { getBusinessBySlug, getReviews } = useSupabase();
  const { slug } = useParams();
  const { user } = useAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [reviews, setReviews] = useState<Reviews[]>([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (slug) {
        const data = await getBusinessBySlug(slug);
        if (data) {
          setBusiness(data);
          setSelectedPhoto((prev) => prev || data.photos[0] || "");
        }
      }
    };
    fetchBusiness();
  }, [slug]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!business?.id) return; // Se business for null/undefined, não executa a função
      const data = await getReviews(business.id);
      if (data) {
        setReviews(data);
      }
    };
    fetchReviews();
  }, [business]);

  const handleReviewAdded = () => {
    if (business?.id) {
      getReviews(business.id).then((data) => setReviews(data || []));
    }
  };

  if (!business) {
    return (
      <div className="flex justify-center items-center h-screen animate-spin">
        <LoaderCircle />
      </div>
    );
  }

  const whatsapp =
    business.telephone +
    "?text=Ol%C3%A1%2C%20Vim%20pelo%20Central%20Unamar%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%21";

  return (
    <>
      <Helmet>
        <title>
          {business ? `${business.name} | Central Unamar` : "Carregando..."}
        </title>
        <meta
          name="description"
          content={
            business?.description || "Descubra os melhores comércios de Unamar!"
          }
        />
        <meta
          property="og:title"
          content={business?.name || "Central Unamar"}
        />
        <meta
          property="og:description"
          content={
            business?.description || "Descubra os melhores comércios de Unamar!"
          }
        />
        <meta
          property="og:image"
          content={business?.photos[0] || "/default-image.jpg"}
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Photo Gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="aspect-video relative">
                  <img
                    src={selectedPhoto}
                    alt={business.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 flex gap-4 overflow-x-auto">
                  {business.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                        selectedPhoto === photo ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <img
                        src={photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {business.name}
                    </h1>
                    <p className="text-primary font-medium mt-1">
                      {business.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-gray-900">
                      {business.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{business.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{business.telephone}</span>
                  </div>
                  <a href={`https://wa.me/${whatsapp}`} className="">
                    <button className="bg-green-400 px-2 py-2 rounded-full mt-4 flex justify-center items-center">
                      <img
                        src="/whatsapp.png"
                        alt="Whatsapp logo"
                        className="w-8 mr-1"
                      />{" "}
                      Chamar no whatsapp
                    </button>
                  </a>
                </div>

                {/* Social Media */}
                <div className="flex space-x-4 mt-6">
                  {business.facebook && (
                    <a
                      href={`${business.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary"
                    >
                      <SiFacebook className="w-8 h-8" />
                    </a>
                  )}
                  {business.instagram && (
                    <a
                      href={`${business.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary"
                    >
                      <SiInstagram className="w-8 h-8" />
                    </a>
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews
                </h2>
                {user && (
                  <CreateReview
                    businessId={business.id}
                    onReviewAdded={handleReviewAdded}
                  />
                )}

                {!user && (
                  <div className="bg-white rounded-lg shadow-sm p-6 my-8">
                    <p className="text-gray-500">
                      Faça login para deixar uma avaliação.
                    </p>
                  </div>
                )}
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-gray-600">Sem reviews no momento</p>
                  ) : (
                    reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} onReviewUpdated={handleReviewAdded} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
