import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Star, MapPin, Phone, LoaderCircle } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";
import { Business } from "@/interfaces/Business";
import { Helmet } from "react-helmet-async";

export default function BusinessProfile() {
  const { getBusiness } = useSupabase();
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  useEffect(() => {
    const fetchBusiness = async () => {
      if (id) {
        const data = await getBusiness(id);
        if (data) {
          setBusiness(data);
          setSelectedPhoto((prev) => prev || data.photos[0] || "");
        }
      }
    };
    fetchBusiness();
  }, [id, getBusiness]);

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
                    <img src="/whatsapp.png" alt="Whatsapp logo" className="w-8 mr-1"/> Chamar no whatsapp
                    </button>
                  </a>
                </div>

                {/* Social Media */}

                {/* <div className="flex space-x-4 mt-6">
                {business.socialMedia.facebook && (
                  <a
                    href={`https://facebook.com/${business.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {business.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${business.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
              </div> */}
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews
                </h2>
                <div className="space-y-6">
                  Sem reviews no momento
                  {/* {business.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.author}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                ))} */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
