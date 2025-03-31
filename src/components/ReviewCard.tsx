import { useState } from "react";
import { Star, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reviews } from "@/interfaces/Reviews";
import { useAuth } from "@/hooks/useAuth";
import { useSupabase } from "@/hooks/useSupabase";

interface ReviewCardProps {
  review: Reviews;
  onReviewUpdated: () => void;
}

const ReviewCard = ({ review, onReviewUpdated }: ReviewCardProps) => {
  const { user } = useAuth();
  const { updateReview, deleteReview } = useSupabase();
  const [editing, setEditing] = useState(false);
  const [newRating, setNewRating] = useState(review.rating);
  const [newComment, setNewComment] = useState(review.comment);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdate = async () => {
    try {
      await updateReview({
        reviewId: review.id,
        rating: newRating,
        comment: newComment,
      });
      setEditing(false);
      onReviewUpdated();
    } catch (error) {
      console.error("Erro ao atualizar review", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      onReviewUpdated();
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao excluir review", error);
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900">
          {review.users?.nome || "Usuário Desconhecido"}
        </span>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-600">
            {review.rating}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{review.comment}</p>
      <span className="text-sm text-gray-500">
        {new Date(review.created_at).toLocaleDateString()}
      </span>
      <div>
        {editing ? (
          <>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setNewRating(i)}
                  className={`text-lg ${
                    i <= newRating ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border rounded p-2 mt-2"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setEditing(false)}
                className="text-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          </>
        ) : (
          <>
            {user?.id === review.user_id && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-500 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Editar
                </button>
                <Button variant="destructive" size="sm" onClick={() => setOpenDialog(true)}><Trash2 className="w-4 h-4 mr-1" /> Excluir</Button>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir avaliação?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Tem certeza que deseja excluir esta avaliação? Essa ação não pode
            ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewCard;
