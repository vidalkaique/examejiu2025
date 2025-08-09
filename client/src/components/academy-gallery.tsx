import exameBanner from "@assets/image_1754709091633.png";

export default function AcademyGallery() {
  const academyImages = [
    {
      src: exameBanner,
      alt: "III Exame de Faixa 2025"
    },
    {
      src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
      alt: "Technique Demonstration"
    },
    {
      src: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
      alt: "Students Group"
    }
  ];

  return (
    <section className="px-4 mb-8">
      <div className="grid grid-cols-1 gap-4">
        {academyImages.map((image, index) => (
          <img 
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-32 object-cover rounded-xl"
          />
        ))}
      </div>
    </section>
  );
}
