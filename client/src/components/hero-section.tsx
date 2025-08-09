import headerImage from "@assets/image_1754709275315.png";

export default function HeroSection() {
  return (
    <section className="text-center px-4 pt-8 pb-4">
      <img 
        src={headerImage} 
        alt="NA GUARDA JJ Team" 
        className="w-full h-48 object-cover rounded-2xl shadow-lg mb-6" 
      />
      
      <h1 className="text-xl font-bold text-na-guarda-dark mb-2">NA GUARDA JJ</h1>
      <p className="text-sm text-gray-600 mb-8">Filial - Xique-xique/BA.</p>
    </section>
  );
}
