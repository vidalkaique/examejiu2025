import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PixModal from "./pix-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  { code: "+33", country: "França", flag: "🇫🇷" },
  { code: "+49", country: "Alemanha", flag: "🇩🇪" }
];

export default function RegistrationForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [formData, setFormData] = useState<InsertRegistration | null>(null);

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      phone: "",
      countryCode: "+55",
      email: "",
      beltColor: undefined,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const response = await apiRequest("POST", "/api/registrations", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Inscrição enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar inscrição",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRegistration) => {
    setFormData(data);
    setShowPixModal(true);
  };

  const handlePixConfirm = () => {
    if (formData) {
      registerMutation.mutate(formData);
    }
    setShowPixModal(false);
  };

  if (isSubmitted) {
    return (
      <section className="px-4 mb-8">
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-green-600 text-4xl mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3 className="text-lg font-bold text-green-800 mb-2">Enviado com sucesso!</h3>
          <p className="text-green-700 text-sm">
            Sua inscrição foi recebida. Entraremos em contato em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-8">
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-na-guarda-dark mb-4 text-center">INSCRIÇÕES AQUI</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nome Completo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite seu nome completo" 
                      className="focus:ring-na-guarda-red focus:border-transparent"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="DD/MM/AAAA"
                      className="focus:ring-na-guarda-red focus:border-transparent"
                      maxLength={10}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2);
                        }
                        if (value.length >= 5) {
                          value = value.substring(0, 5) + '/' + value.substring(5, 9);
                        }
                        field.onChange(value);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Telefone</FormLabel>
              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-24 focus:ring-na-guarda-red">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="(11) 99999-9999" 
                          className="focus:ring-na-guarda-red focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="focus:ring-na-guarda-red focus:border-transparent"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="beltColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Cor da Faixa</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-na-guarda-red">
                        <SelectValue placeholder="Selecione a cor da sua faixa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="azul">🔵 Azul - R$ 350,00</SelectItem>
                      <SelectItem value="roxa">🟣 Roxa - R$ 450,00</SelectItem>
                      <SelectItem value="marrom">🟤 Marrom - R$ 600,00</SelectItem>
                      <SelectItem value="preta">⚫ Preta - R$ 1.200,00</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center text-sm text-gray-600">
              <i className="fas fa-shield-alt mb-2"></i>
              <div>reCAPTCHA</div>
              <div className="text-xs mt-1">
                Protected by <strong>reCAPTCHA</strong><br />
                <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-600 hover:underline">Privacy</a> - 
                <a href="https://www.google.com/intl/en/policies/terms/" className="text-blue-600 hover:underline">Terms</a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-na-guarda-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Enviando..." : "Continuar para Pagamento"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Ao continuar, você será direcionado para realizar o pagamento via PIX.
            </p>
          </form>
        </Form>
      </div>

      {formData && (
        <PixModal
          isOpen={showPixModal}
          onClose={() => setShowPixModal(false)}
          onConfirm={handlePixConfirm}
          registrationData={formData}
        />
      )}
    </section>
  );
}
