export default function Footer() {
  return (
    <footer className="px-4 py-6 text-center">
      <div className="flex flex-col items-center justify-center">
        {/* Adicione a imagem do logo aqui */}
        <div className="w-32 h-32 mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Substitua a div abaixo pela sua imagem */}
          <div className="text-xs text-gray-500">LOGO AQUI</div>
        </div>
        <h2 className="text-lg font-bold">NA GUARDA JIU-JITSU</h2>
      </div>
    </footer>
  );
}
