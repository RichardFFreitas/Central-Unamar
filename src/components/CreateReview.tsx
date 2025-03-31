import { useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/hooks/useAuth"; // Hook de autenticação
import { Reviews } from "@/interfaces/Reviews";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateReviewProps {
  businessId: string;
  onReviewAdded: () => void;
}

const CreateReview = ({ businessId, onReviewAdded }: CreateReviewProps) => {
  const { toast } = useToast();
  const { createReview } = useSupabase();
  const { user } = useAuth(); 
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage("Você precisa estar logado para avaliar.");
      return;
    }

    if (rating === 0 || comment.trim() === "") {
        toast({
            title: "Erro",
            description: `Por favor, preenchar todos os campos`
        })
      return;
    }

    try {
      await createReview({
        businessId,
        rating,
        comment,
        userId: user.id,
      });
      setRating(0);
      setComment("");
      setErrorMessage("");
      onReviewAdded(); // Atualiza as reviews após a criação
    } catch (error) {
      console.error("Erro ao enviar a avaliação", error);
      setErrorMessage("Erro ao enviar a avaliação. Tente novamente.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Deixe sua avaliação</h2>
      
      {/* Mensagem de erro caso não esteja logado */}
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              className={`text-lg ${i <= rating ? "text-yellow-400" : "text-gray-400"}`}
            >
              <Star className="w-6 h-6" />
            </button>
          ))}
        </div>

        <textarea
          placeholder="Escreva seu comentário aqui..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Enviar Avaliação
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
