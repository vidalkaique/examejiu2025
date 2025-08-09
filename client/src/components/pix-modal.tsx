import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  registrationData: {
    name: string;
    birthDate: string;
    email: string;
    phone: string;
    countryCode?: string;
    beltColor: string;
  };
}

export default function PixModal({ isOpen, onClose, onConfirm, registrationData }: PixModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Gerar chave PIX aleatória (simulação)
  const pixKey = "00020126360014BR.GOV.BCB.PIX0114+5571997294034520400005303986540550.005802BR5925LEANDRO RODRIGUES SANTOS6014XIQUE-XIQUE-BA62070503***6304A1B2";
  
  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast({
        title: "Chave PIX copiada!",
        description: "A chave PIX foi copiada para sua área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a chave PIX.",
        variant: "destructive",
      });
    }
  };

  const handleSendWhatsApp = () => {
    const beltColorEmojis = {
      branca: "⚪",
      azul: "🔵", 
      roxa: "🟣",
      marrom: "🤎",
      preta: "⚫"
    };

    const message = `Olá! Sou *${registrationData.name}* e gostaria de me inscrever no exame de faixa. Segue meus dados abaixo:

👤 *Nome Completo:* ${registrationData.name}
🎂 *Data de Nascimento:* ${registrationData.birthDate}
📧 *Email:* ${registrationData.email}
📱 *Contato:* ${registrationData.countryCode || '+55'} ${registrationData.phone}
🥋 *Cor da Faixa:* ${beltColorEmojis[registrationData.beltColor as keyof typeof beltColorEmojis]} ${registrationData.beltColor.charAt(0).toUpperCase() + registrationData.beltColor.slice(1)}

Realizei o pagamento via PIX conforme orientado. Segue em anexo o comprovante.`;

    const whatsappUrl = `https://wa.me/5571997294034?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">Pagamento via PIX</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Valor: R$ 50,00</h3>
              <p className="text-sm text-gray-600">Taxa de inscrição para o exame de faixa</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Chave PIX:</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-2 bg-gray-50 rounded border text-xs font-mono break-all">
                {pixKey}
              </div>
              <Button
                onClick={copyPixKey}
                size="sm"
                variant="outline"
                className="flex-shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Instruções:</strong><br />
              Realize o pagamento e, em seguida, clique no botão 'Enviar' abaixo para enviar seus dados. 
              Não se esqueça de anexar o comprovante na mensagem. Entrarei em contato em breve.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSendWhatsApp}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Enviar via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}