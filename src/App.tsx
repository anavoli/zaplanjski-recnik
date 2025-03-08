import React, { useState } from 'react';
import { Book, Plus, Search, Save, Trash2 } from 'lucide-react';

interface RečničkaOdrednica {
  id: number;
  reč: string;
  prevod: string;
  opis?: string;
}

function App() {
  const [rečnik, setRečnik] = useState<RečničkaOdrednica[]>([
    { id: 1, reč: "вреви", prevod: "говори", opis: "Када неко прича или говори" },
    { id: 2, reč: "дудњи", prevod: "тутњи", opis: "Када нешто производи дубок звук" },
    { id: 3, reč: "лелејка", prevod: "љуљашка", opis: "Направа за љуљање" }
  ]);

  const [novaReč, setNovaReč] = useState("");
  const [noviPrevod, setNoviPrevod] = useState("");
  const [noviOpis, setNoviOpis] = useState("");
  const [pretraga, setPretraga] = useState("");

  const dodajReč = () => {
    if (novaReč && noviPrevod) {
      const novaOdrednica: RečničkaOdrednica = {
        id: Date.now(),
        reč: novaReč,
        prevod: noviPrevod,
        opis: noviOpis
      };
      setRečnik([...rečnik, novaOdrednica]);
      setNovaReč("");
      setNoviPrevod("");
      setNoviOpis("");
    }
  };

  const obrišiReč = (id: number) => {
    setRečnik(rečnik.filter(reč => reč.id !== id));
  };

  const filtriraneReči = rečnik.filter(odrednica =>
    odrednica.reč.toLowerCase().includes(pretraga.toLowerCase()) ||
    odrednica.prevod.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заглавље */}
      <header className="bg-emerald-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Book className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Заплањски речник</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Форма за унос */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-800 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Додај нову реч
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Реч на дијалекту
              </label>
              <input
                type="text"
                value={novaReč}
                onChange={(e) => setNovaReč(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Унесите реч..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Превод
              </label>
              <input
                type="text"
                value={noviPrevod}
                onChange={(e) => setNoviPrevod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Унесите превод..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опис (опционо)
              </label>
              <input
                type="text"
                value={noviOpis}
                onChange={(e) => setNoviOpis(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Унесите опис..."
              />
            </div>
          </div>
          <button
            onClick={dodajReč}
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Сачувај
          </button>
        </div>

        {/* Претрага */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Претражите речник..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={pretraga}
              onChange={(e) => setPretraga(e.target.value)}
            />
          </div>
        </div>

        {/* Листа речи */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {filtriraneReči.map((odrednica) => (
              <div key={odrednica.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-800">{odrednica.reč}</h3>
                    <p className="text-gray-600 font-medium">{odrednica.prevod}</p>
                    {odrednica.opis && (
                      <p className="text-gray-500 text-sm mt-1">{odrednica.opis}</p>
                    )}
                  </div>
                  <button
                    onClick={() => obrišiReč(odrednica.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Подножје */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Заплањски дијалектски речник</h2>
            <p className="text-gray-400">
              Дигитална збирка речи и израза из Заплања
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;