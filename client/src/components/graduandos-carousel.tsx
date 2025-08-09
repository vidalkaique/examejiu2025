import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Graduando {
  name: string;
  beltColor: string;
  beltLevel: string;
  image: string;
}

export default function GraduandosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const graduandos: Graduando[] = [
    {
      name: "JAIR",
      beltColor: "Faixa Roxa",
      beltLevel: "Marrom",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "ERIK",
      beltColor: "Faixa Azul",
      beltLevel: "Roxa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "LUCAS",
      beltColor: "Faixa Branca",
      beltLevel: "Azul",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "PEDRO",
      beltColor: "Faixa Azul",
      beltLevel: "Roxa",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === graduandos.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? graduandos.length - 2 : prevIndex - 1
    );
  };

  const getBeltColor = (beltLevel: string) => {
    const colors = {
      "Branca": "bg-gray-100 text-gray-800",
      "Azul": "bg-blue-500 text-white",
      "Roxa": "bg-purple-500 text-white", 
      "Marrom": "bg-amber-700 text-white",
      "Preta": "bg-black text-white"
    };
    return colors[beltLevel as keyof typeof colors] || "bg-gray-500 text-white";
  };

  return (
    <section className="px-4 mb-8">
      <h3 className="text-lg font-bold text-na-guarda-dark mb-4 text-center">GRADUANDOS 2025</h3>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {graduandos.map((graduando, index) => (
              <div key={index} className="w-1/2 flex-shrink-0 px-1">
                <Card className="bg-white shadow-lg border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={graduando.image}
                        alt={graduando.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                              <img 
                                src={graduando.image}
                                alt={graduando.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-white font-bold text-sm">{graduando.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 ${getBeltColor(graduando.beltLevel)}`}>
                      <div className="text-center">
                        <div className="text-xs opacity-90">{graduando.beltColor}</div>
                        <div className="text-xs font-bold">{">>>"}</div>
                        <div className="text-xs font-bold">{graduando.beltLevel}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          onClick={prevSlide}
          size="sm"
          variant="outline"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 z-10 rounded-full w-8 h-8 p-0 bg-white shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={nextSlide}
          size="sm"
          variant="outline"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 z-10 rounded-full w-8 h-8 p-0 bg-white shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: graduandos.length - 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-na-guarda-red' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}