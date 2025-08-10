import React from 'react';

export default function Footer() {
  return (
    <footer className="px-4 py-6 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-gray-200">
          <img 
            src="/assets/logo-naguarda.png" 
            alt="NA GUARDA JIU-JITSU" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold">NA GUARDA JIU-JITSU</h2>
      </div>
    </footer>
  );
}
