export default function GraduandosGallery() {
  const graduandosImages = [
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
    "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
    "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
  ];

  const additionalImages = [
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400"
  ];

  return (
    <section className="px-4 mb-8">
      <h3 className="text-lg font-bold text-na-guarda-dark mb-4">GRADUANDOS 2025</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {graduandosImages.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt={`Graduando 2025 ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>
      
      <div className="space-y-3">
        {additionalImages.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt={`Graduation Ceremony ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}
