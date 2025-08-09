export default function WhatsAppContact() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5571997294034", "_blank");
  };

  return (
    <section className="px-4 mb-8">
      <button 
        onClick={handleWhatsAppClick}
        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-center transition-colors"
      >
        <i className="fab fa-whatsapp text-xl mr-2"></i>
        <div className="text-sm">▶️ PAGAMENTO</div>
        <div className="text-xs opacity-90">wa.me/5571997294034</div>
      </button>
    </section>
  );
}
