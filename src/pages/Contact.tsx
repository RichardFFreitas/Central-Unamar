import { useState } from "react";
import Header from "@/components/Header";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_f4rpzze",
        "template_xeb2s3q",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "x7yuez4-MYeseRi7d"
      )
      .then(() => {
        toast({
          title: "Mensagem enviada com sucesso",
          description: "Obrigado pela mensagem, responderemos em breve.",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Tente novamente mais tarde.",
          className: "bg-red-600",
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 bg-primary text-white">
                  <h1 className="text-2xl font-bold mb-6">Fale Conosco</h1>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Celular</p>
                        <p className="mt-1">+55 (22) 99915-8463</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="mt-1">contact@centralunamar.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
