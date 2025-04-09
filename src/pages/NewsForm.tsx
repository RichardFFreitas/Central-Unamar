import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { EditorContent, useEditor } from "@tiptap/react";
import Underline2 from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { NewsCategories } from "@/constantes/newsCategories";
import { convertToWebP } from "@/utils/convertToWebP";
import NotFound from "./NotFound";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { generateSlug } from "@/utils/generateSlug";
import { previousDay } from "date-fns";

interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  image: { file: File; preview: string } | null; // Mudança para imagem única
}

export default function NewsRegistrationForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createNews, uploadImageNews } = useSupabase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image: null,
  });

  const editor = useEditor({
    extensions: [StarterKit, Image, Underline2],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "title" ? generateSlug(value) : prev.slug,
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      try {
        const webpFile = await convertToWebP(file);
        setFormData((prev) => ({
          ...prev,
          image: {
            file: webpFile,
            preview: URL.createObjectURL(webpFile),
          },
        }));
      } catch (error) {
        console.error("Erro ao converter imagem para WEBP:", error);
      }
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      image: null, // Remove a imagem selecionada
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Faz upload da imagem e obtém a URL
      const uploadedImage = await uploadImageNews(formData.image?.file);

      const newsData = {
        title: formData.title,
        slug: formData.slug,
        user_id: user.id,
        excerpt: formData.excerpt,
        category: formData.category,
        content: formData.content,
        images: uploadedImage,
      };

      const result = await createNews(newsData);

      if (result) {
        toast({
          title: "Sucesso",
          description: "Notícia cadastrada com sucesso!",
        });
        navigate("/news");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar notícia. Tente novamente.",
        className: "bg-red-600",
      });
    }
  };

  if (!user || (user.tipo_usuario !== "adm" && user.tipo_usuario !== "jornalista")) {
    return <NotFound />;
  }
  

  return (
    <>
      {!user && (
        <div>
          <NotFound />
        </div>
      )}
      {!!user && (
        <>
          <Header />
          <div className="pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Publique sua Notícia
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Título da Notícia
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trecho para chamar atenção
                    </label>
                    <input
                      type="text"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Categoria
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    >
                      <option value="">Selecione a categoria</option>
                      {NewsCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conteúdo da Notícia
                    </label>
                    <div className="mt-2 border-2 border-gray-300 p-4 rounded-lg">
                      <EditorContent editor={editor} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Foto Principal da notícia.
                    </label>
                    <div className="mt-1">
                      {formData.image && (
                        <div className="relative mb-4">
                          <img
                            src={formData.image.preview}
                            alt="Preview da Foto"
                            className="h-72 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      )}
                      <label className="relative h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Plus className="w-6 h-6 text-gray-400" />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Registrar Notícia
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
