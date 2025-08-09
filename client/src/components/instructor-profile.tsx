import leandroImage from "@assets/image_1754757796479.png";

export default function InstructorProfile() {
  return (
    <section className="px-4 mb-8">
      <div className="text-center">
        <img 
          src={leandroImage} 
          alt="Leandro Rodrigues" 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
        />
        
        <h3 className="text-lg font-bold text-na-guarda-dark mb-1">LEANDRO RODRIGUES</h3>
        <p className="text-sm text-gray-600 mb-4">Faixa Preta e Presidente da equipe NA GUARDA JJ</p>
      </div>
    </section>
  );
}
