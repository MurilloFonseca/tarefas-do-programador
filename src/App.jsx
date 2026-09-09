import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  // Hook useState: cria e controla os estados da aplicação
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todas");

  // Hook useEffect: salva automaticamente as tarefas no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (tarefa) => {
    setTarefas([...tarefas, tarefa]);
  };

  // Callback: recebe o id da tarefa e remove somente essa tarefa
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  // Callback: recebe o id e altera o status da tarefa
  const alterarStatus = (id) => {
    setTarefas(
      tarefas.map((tarefa) => {
        if (tarefa.id === id) {
          if (tarefa.status === "Pendente") {
            return { ...tarefa, status: "Em andamento" };
          }

          if (tarefa.status === "Em andamento") {
            return { ...tarefa, status: "Concluída" };
          }

          return { ...tarefa, status: "Pendente" };
        }

        return tarefa;
      }),
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#212529]">
        <Sidebar adicionarTarefa={adicionarTarefa} />

        <main className="ml-80 min-h-screen p-10">
          <div className="flex items-center justify-between mb-9">
            <h1 className="text-[#919ba5] text-[25px] italic border-l-2 border-[#919ba585] pl-2">
              Minhas Tarefas
            </h1>

            <div className="flex items-center gap-2">
              {/* Filtro: mostra todas as tarefas */}
              <button
                onClick={() => setFiltro("todas")}
                className="px-4 py-2 rounded-md bg-[#495057] text-[#adb5bd] text-sm hover:bg-[#adb5bd] hover:text-[#495057] duration-500 transition-colors cursor-pointer"
              >
                Todas
              </button>

              {/* Filtro: mostra somente tarefas pendentes */}
              <button
                onClick={() => setFiltro("pendentes")}
                className="px-4 py-2 rounded-md bg-[#495057] text-[#adb5bd] text-sm hover:bg-[#adb5bd] hover:text-[#495057] duration-500 transition-colors cursor-pointer"
              >
                Pendentes
              </button>

              {/* Filtro: mostra somente tarefas em andamento */}
              <button
                onClick={() => setFiltro("andamento")}
                className="px-4 py-2 rounded-md bg-[#495057] text-[#adb5bd] text-sm hover:bg-[#adb5bd] hover:text-[#495057] duration-500 transition-colors cursor-pointer"
              >
                Em andamento
              </button>

              {/* Filtro: mostra somente tarefas concluídas */}
              <button
                onClick={() => setFiltro("concluidas")}
                className="px-4 py-2 rounded-md bg-[#495057] text-[#adb5bd] text-sm hover:bg-[#adb5bd] hover:text-[#495057] duration-500 transition-colors cursor-pointer"
              >
                Concluídas
              </button>

              <div className="relative ml-2">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#7d868f]"></i>

                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  type="text"
                  placeholder="Buscar tarefa..."
                  className="w-64 bg-[#343a40] border border-[#515962] rounded-md pl-9 pr-3 py-2 text-[#ccc9dc] outline-none focus:border-[#bdc4cb]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tarefas

              // filter: filtra as tarefas pelo nome pesquisado
              .filter((tarefa) =>
                tarefa.nome.toLowerCase().includes(busca.toLowerCase()),
              )

              // filter: filtra as tarefas pelo status selecionado
              .filter((tarefa) => {
                if (filtro === "pendentes") {
                  return tarefa.status === "Pendente";
                }

                if (filtro === "andamento") {
                  return tarefa.status === "Em andamento";
                }

                if (filtro === "concluidas") {
                  return tarefa.status === "Concluída";
                }

                return true;
              })

              // map: percorre as tarefas filtradas e cria um card para cada tarefa
              .map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="bg-[#343a408e] border border-[#515962ad] rounded-lg p-5 shadow-lg"
                >
                  <h2 className="text-[#acafb3] text-2xl font-semibold italic mb-3">
                    {tarefa.nome}
                  </h2>

                  <p className="text-[#858a8f] text-sm mb-2">
                    <i className="fa-regular fa-calendar mr-2"></i>
                    {tarefa.data}
                  </p>

                  <p className="text-[#adb5bd] text-sm mx-3 mb-3 wrap-break-words">
                    {tarefa.descricao}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Prioridade */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          tarefa.prioridade === "Alta"
                            ? "bg-[#9a0000] text-[#d5a6a6]"
                            : tarefa.prioridade === "Média"
                              ? "bg-[#9a6a00] text-[#ffe8a1]"
                              : "bg-[#009a0d] text-[#b3cfb4]"
                        }
                      `}
                    >
                      {tarefa.prioridade}
                    </span>

                    {/* Status */}
                    <button
                      onClick={() => alterarStatus(tarefa.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-500 cursor-pointer
                        ${
                          tarefa.status === "Pendente"
                            ? "bg-[#979dac] text-[#454954] hover:bg-[#454954] hover:text-[#979dac]"
                            : tarefa.status === "Em andamento"
                              ? "bg-[#edbb6b] text-[#b07807] hover:bg-[#b07807] hover:text-[#edbb6b]"
                              : "bg-[#a3b18a] text-[#588157] hover:bg-[#588157] hover:text-[#a3b18a]"
                        }
                      `}
                    >
                      {tarefa.status}
                    </button>

                    {/* Remover */}
                    <button
                      onClick={() => removerTarefa(tarefa.id)}
                      className="px-3 py-1 text-xs font-bold italic text-[#aa0202] hover:text-[#ff0000] transition-colors duration-500 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash mr-1"></i>
                      Remover
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
