import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

export function useSupabase() {
  const { toast } = useToast();
  const { user } = useAuth();

  const getBusiness = async (id: string) => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar informações do negócio",
        variant: "destructive",
      });
      return null;
    }

    return data;
  };

  const getBusinesses = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar negócios",
        variant: "destructive",
      });
      return [];
    }

    return data.map((business) => ({
      ...business,
      photos: business.photos || [],
    }));
  };

  const getBusinessBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      toast({
        title: `Erro ao buscar comércio: ${error}`,
      });
      return null;
    }
    return data;
  };

  const getNews = async (id?: string) => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar noticias",
        variant: "destructive",
      });
      return [];
    }
    return data;
  };

  const getReviews = async (business_id: string) => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, users(nome)") // Aqui fazemos o join correto com a tabela users
      .eq("business_id", business_id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao buscar Review ${error.message}`,
      });
      return null;
    }
    return data;
  };

  const getUser = async (userId: string) => {
    const { data, error } = await supabase
      .from("users") // Nome da tabela de usuários no Supabase
      .select("nome") // Pegando apenas o nome
      .eq("id", userId) // Buscando pelo ID
      .single(); // Retorna apenas um usuário

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao buscar usuario ${error.message}`,
      });
      return null;
    }

    return data;
  };

  const createReview = async ({
    businessId,
    rating,
    comment,
    userId,
  }: {
    businessId: String;
    rating: Number;
    comment: String;
    userId: String;
  }) => {
    const { data, error } = await supabase.from("reviews").insert([
      {
        business_id: businessId,
        rating,
        comment,
        user_id: userId,
      },
    ]);
    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao criar review ${error.message}`,
      });
    }
    return data;
  };

  const createBusiness = async (businessData: any) => {
    const { photos, ...rest } = businessData;

    // Criar o negócio primeiro
    const { data: business, error } = await supabase
      .from("businesses")
      .insert([
        {
          ...rest,
          user_id: user?.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao criar negócio ${error}`,
        variant: "destructive",
      });
      return null;
    }

    // Upload das fotos
    if (photos && photos.length > 0) {
      const uploadedUrls = [];
      for (const photo of photos) {
        const url = await uploadBusinessPhoto(photo.file, business.id); // Envie o File
        if (url) uploadedUrls.push(url);
      }
      // Atualize o negócio com as URLs das fotos
      await supabase
        .from("businesses")
        .update({ photos: uploadedUrls })
        .eq("id", business.id);
    }

    return business;
  };

  const createNews = async (newsData: any) => {
    const { photo, ...rest } = newsData;

    // Criar a notícia primeiro
    const { data: news, error } = await supabase
      .from("news")
      .insert([
        {
          ...rest,
          user_id: user?.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao criar notícia: ${error.message}`,
        variant: "destructive",
      });
      return null;
    }

    // Upload da foto única
    if (photo) {
      const url = await uploadImageNews(photo.file, news.id);
      if (url) {
        await supabase
          .from("news")
          .update({ photo: url }) // Alterado para um único campo de imagem
          .eq("id", news.id);
      }
    }

    return news;
  };

  const updateReview = async ({ reviewId, rating, comment }: { reviewId: string; rating: number; comment: string; }) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, comment })
        .eq('id', reviewId)
        .eq('user_id', user.id); // Garante que só o dono da review pode editar

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      console.error('Erro ao atualizar review:', error);
      throw error;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id); // Garante que só o dono pode excluir

      if (error) throw new Error(error.message);
    } catch (error) {
      console.error('Erro ao excluir review:', error);
      throw error;
    }
  };

  const uploadImageNews = async (file: File, id?: any) => {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("news")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({
        title: "Erro",
        description: `Erro ao fazer upload da imagem ${error.message}`,
      });
      return null;
    }
    toast({
      title: "Imagem enviada com sucesso",
      description: `${data}`,
    });

    const { data: publicUrlData } = supabase.storage
      .from("news")
      .getPublicUrl(fileName);
    return publicUrlData?.publicUrl;
  };

  const uploadBusinessPhoto = async (file: File, businessId: number) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${businessId}-${Date.now()}.${fileExt}`;
      const filePath = `business_photos/${fileName}`;

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from("Imgs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("Imgs").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da foto",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    getBusiness,
    getBusinesses,
    getReviews,
    getNews,
    getUser,
    getBusinessBySlug,
    createBusiness,
    createNews,
    createReview,
    uploadImageNews,
    updateReview,
    deleteReview,
  };
}
