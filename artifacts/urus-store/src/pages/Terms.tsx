import { Link } from "wouter";

export default function Terms() {
  return (
    <div style={{ backgroundColor: "#050608", minHeight: "100vh", color: "white", fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-cyan-400 text-sm hover:underline">&larr; Volver al inicio</Link>
        <h1 className="text-3xl font-bold mt-6 mb-8">Términos y Condiciones</h1>

        <div className="space-y-6 text-white/70 text-sm leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">1. Naturaleza del servicio</h2>
            <p>
              Urus Store vende licencias de software de terceros (paneles, bypass y herramientas relacionadas)
              con entrega digital. Al comprar, aceptas que el uso de estos productos es bajo tu propia
              responsabilidad y puede infringir los términos de servicio de los juegos con los que se usan.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">2. Pagos</h2>
            <p>
              Las compras se coordinan directamente a través de nuestro servidor de Discord. Un agente de
              soporte te guiará con el proceso de pago y la entrega del producto.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">3. Entrega</h2>
            <p>
              La entrega de los productos es digital e inmediata tras la confirmación del pago. Si no recibes
              tu producto en un plazo razonable, contáctanos por Discord con tu comprobante de compra.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">4. Reembolsos</h2>
            <p>
              Debido a la naturaleza digital de los productos, las compras no son reembolsables una vez
              entregado el acceso, salvo error comprobado de nuestra parte.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">5. Reseñas</h2>
            <p>
              Al publicar una reseña aceptas que su contenido sea público en el sitio. Nos reservamos el
              derecho de eliminar reseñas ofensivas, falsas o que infrinjan derechos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">6. Limitación de responsabilidad</h2>
            <p>
              No garantizamos disponibilidad ininterrumpida de los productos frente a actualizaciones de
              anti-cheat de terceros. Haremos esfuerzos razonables para mantener los productos funcionando,
              pero no podemos garantizar resultados.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-2">7. Contacto</h2>
            <p>
              Para dudas sobre estos términos, escríbenos en nuestro{" "}
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
