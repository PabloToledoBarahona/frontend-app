'use client';

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">¿Por qué TeLoCobro?</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Automatización de cobros' },
            { title: 'Historial de pagos' },
            { title: 'Recordatorios por correo' },
            { title: 'Panel de control intuitivo' },
          ].map(({ title }, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-gray-700">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, eaque.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}