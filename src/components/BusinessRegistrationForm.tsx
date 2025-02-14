
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, X } from "lucide-react";

interface BusinessFormData {
  name: string;
  address: string;
  telephone: string;
  category: string;
  description: string;
  selectedPlan: "basic" | "professional" | "enterprise";
  photos: string[];
}

const CATEGORIES = [
  "Restaurant",
  "Hotel",
  "Retail",
  "Service",
  "Entertainment",
  "Healthcare",
  "Other",
];

export default function BusinessRegistrationForm() {
  const { toast } = useToast();
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // For now, we'll just store the file names. In a real app, we'd upload to storage
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
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
    // Here we would normally submit to an API
    toast({
      title: "Registration Submitted",
      description: "Your business registration has been received.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
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
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telephone</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
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
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photos</label>
        <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo}
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
        <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 hover:border-primary">
            <input
              type="radio"
              name="selectedPlan"
              value="basic"
              checked={formData.selectedPlan === "basic"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Basic</span>
              <span className="text-sm text-gray-500">$24/month</span>
            </div>
            <span
              className={`absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-primary ${
                formData.selectedPlan === "basic" ? "ring-primary" : ""
              }`}
            />
          </label>
          <label className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 hover:border-primary">
            <input
              type="radio"
              name="selectedPlan"
              value="professional"
              checked={formData.selectedPlan === "professional"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Professional</span>
              <span className="text-sm text-gray-500">$54/month</span>
            </div>
            <span
              className={`absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-primary ${
                formData.selectedPlan === "professional" ? "ring-primary" : ""
              }`}
            />
          </label>
          <label className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 hover:border-primary">
            <input
              type="radio"
              name="selectedPlan"
              value="enterprise"
              checked={formData.selectedPlan === "enterprise"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Enterprise</span>
              <span className="text-sm text-gray-500">$74/month</span>
            </div>
            <span
              className={`absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-primary ${
                formData.selectedPlan === "enterprise" ? "ring-primary" : ""
              }`}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
      >
        Register Business
      </button>
    </form>
  );
}
