import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { useNavigate,useParams } from "react-router-dom";
import { Plus, Upload, X } from "lucide-react";
import { CATEGORIES } from "@/constantes/categories";
import AddressInput from "./AdressInput";
import { useAuth } from "@/hooks/useAuth";

interface BusinessFormData {
  name: string;
  address: string;
  telephone: string;
  category: string;
  description: string;
  selectedPlan: "basic" | "professional" | "enterprise";
  photos: { file: File; preview: string }[];
}

export default function BusinessRegistrationForm() {
  const { user } = useAuth()
  const { toast } = useToast();
  const { createBusiness } = useSupabase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BusinessFormData>({
    name: "",
    address: "",
    telephone: "",
    category: "",
    description: "",
    selectedPlan: "basic",
    photos: [],
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; 
  
  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0, img.width, img.height);
  
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }));
            } else {
              reject(new Error("Erro ao converter para WEBP"));
            }
          }, "image/webp", 0.8);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
    const planLimits = {basic: 1, professional: 5, enterprise: 10};
    const maxPhotos = planLimits[formData.selectedPlan]
    if(formData.photos.length + files.length > maxPhotos) {
      const photoText = formData.selectedPlan === 'basic' ? 'foto' : 'fotos';
      toast({
        title: "Limite de Fotos excedido",
        description: `Seu plano permite no maximo ${maxPhotos} ${photoText}`,
        className:'bg-red-600 text-white'
      });
      return;
    }
    
      const newPhotos = await Promise.all(
        Array.from(files).map(async (file) => {
          const webpFile = await convertToWebP(file);
          return {
            file: webpFile,
            preview: URL.createObjectURL(webpFile),
          };
        })
      );
  
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const businessData = {
        name: formData.name,
        user_id: user.id,
        address: formData.address,
        telephone: formData.telephone,
        category: formData.category,
        description: formData.description,
        plan: formData.selectedPlan,
        photos: formData.photos, // Passa os arquivos reais
      };

      const result = await createBusiness(businessData);

      if (result) {
        toast({
          title: "Sucesso",
          description: "Negócio cadastrado com sucesso!",
        });
        navigate("/businesses");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar negócio. Tente novamente.",
        className: "bg-red-600"
      });
    }
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const plan = e.target.value as "basic" | "professional" | "enterprise";
    setFormData(prev => ({
      ...prev,
      selectedPlan: plan
    }));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove o prefixo +55 se existir
    const withoutPrefix = value.replace('+55', '')

    // Remove tudo que não é número
    const numbers = withoutPrefix.replace(/\D/g, '')

    // Se estiver vazio, retorna apenas +55
    if (!numbers) return '+55'

    // Adiciona +55 ao número limpo
    return `+55${numbers}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setFormData(prev => ({
      ...prev,
      telephone: formattedPhone
    }))
  }

  useEffect(() => {
    return () => {
      formData.photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [formData.photos]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Comércio</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Endereço</label>
        <AddressInput
          onAddressSelect={(address) =>
            setFormData(prev => ({ ...prev, address }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handlePhoneChange}
          placeholder="+55"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fotos</label>
        <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.preview} 
                alt={`Business photo ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
          <label className="relative h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              
            />
            <Plus className="w-6 h-6 text-gray-400" />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Escolha seu Plano</label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className={`relative flex cursor-pointer rounded-lg border p-4 ${formData.selectedPlan === "basic" ? "border-primary ring-2 ring-primary" : "border-gray-300"
            } hover:border-primary`}>
            <input
              type="radio"
              name="selectedPlan"
              value="basic"
              checked={formData.selectedPlan === "basic"}
              onChange={handlePlanChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Básico</span>
              <span className="text-sm text-gray-500">R$24,99/mês</span>
            </div>
          </label>

          <label className={`relative flex cursor-pointer rounded-lg border p-4 ${formData.selectedPlan === "professional" ? "border-primary ring-2 ring-primary" : "border-gray-300"
            } hover:border-primary`}>
            <input
              type="radio"
              name="selectedPlan"
              value="professional"
              checked={formData.selectedPlan === "professional"}
              onChange={handlePlanChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Professional</span>
              <span className="text-sm text-gray-500">R$54,99/mês</span>
            </div>
          </label>

          <label className={`relative flex cursor-pointer rounded-lg border p-4 ${formData.selectedPlan === "enterprise" ? "border-primary ring-2 ring-primary" : "border-gray-300"
            } hover:border-primary`}>
            <input
              type="radio"
              name="selectedPlan"
              value="enterprise"
              checked={formData.selectedPlan === "enterprise"}
              onChange={handlePlanChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Enterprise</span>
              <span className="text-sm text-gray-500">R$74,99/mês</span>
            </div>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
      >
        Registrar Comércio
      </button>
    </form>
  );
}
