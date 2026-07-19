import { Link } from "wouter";

export default function Privacy() {
  return (
    <div style={{ backgroundColor: "#050608", minHeight: "100vh", color: "white", fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-cyan-400 text-sm hover:underline">&larr; Volver al inicio</Link>
        <h1 className="text-3xl font-bold mt-6 mb-8">Política de Privacidad</h1>

        <div className="space-y-6 text-white/70 text-sm leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">1. Información que recopilamos</h2>
            <p>
              Al usar Urus Store recopilamos información necesaria para brindarte soporte:
              tu nombre de usuario de Discord, el contenido de las reseñas que publicas voluntariamente, y datos
              técnicos básicos (dirección IP, tipo de navegador) para prevenir abuso del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">2. Proceso de compra</h2>
            <p>
              Las compras se coordinan directamente a través de Discord. No almacenamos datos de tarjetas
              ni métodos de pago en nuestros servidores. Toda información financiera se maneja fuera de
              esta plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">3. Uso de la información</h2>
            <p>
              Usamos tus datos únicamente para: brindarte soporte técnico,
              mostrar reseñas públicas que decidas publicar, y mejorar la seguridad y funcionamiento de la
              tienda. No vendemos ni compartimos tu información con terceros con fines publicitarios.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">4. Cookies</h2>
            <p>
              Este sitio puede usar cookies o almacenamiento local del navegador para recordar el contenido
              de tu carrito de compras entre visitas.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">5. Tus derechos</h2>
            <p>
              Puedes solicitar la eliminación de tus reseñas o cualquier dato asociado a tu cuenta de Discord
              contactándonos por nuestro servidor de Discord.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">6. Contacto</h2>
            <p>
              Para cualquier duda sobre esta política, contáctanos a través de nuestro{" "}
              <a href="https://discord.gg/panelurus" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                servidor de Discord
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
