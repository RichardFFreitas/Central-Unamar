import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
        title: `Erro ao buscar comércio: ${error}`
      })
      return null
    }
    return data
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

  return {
    getBusiness,
    getBusinesses,
    createBusiness,
    getNews,
    getBusinessBySlug,
  };
}
