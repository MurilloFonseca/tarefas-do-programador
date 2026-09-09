import { useState } from "react";

const Sidebar = ({ adicionarTarefa }) => {
  // Hook useState: cria e controla os estados do formulário
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");

  const handleNovaTarefa = () => {
    if (nome === "") {
      alert("O nome não pode ficar em branco");

      return;
    }

    if (data === "") {
      alert("Por favor selecione uma data");

      return;
    }

    const novaTarefa = {
      id: Date.now(),
      nome: nome,
      data: data,
      descricao: descricao,
      prioridade: prioridade,
      status: "Pendente",
    };

    adicionarTarefa(novaTarefa);

    setNome("");
    setData("");
    setDescricao("");
    setPrioridade("Baixa");
  };

  return (
    <aside className="bg-[#515962] fixed left-0 top-0 h-screen w-80 border-r border-[#70767d] p-8">
      <h1 className="text-[#70767d] text-[25px] italic border-l-2 border-[#70767d] pl-2 mb-9">
        Tarefas
      </h1>

      <h2 className="text-[#858a8f] text-[17px] mb-6">Nova Tarefa</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-[#ccc9dc] text-sm mb-2">Nome</label>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            type="text"
            placeholder="Nome da tarefa"
            className="w-full bg-[#495057] border border-[#0000000b] rounded-md px-3 py-1.5 text-[#bdc4cb] outline-none focus:border-[#bdc4cb] mb-3 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-[#ccc9dc] text-sm mb-2">Data</label>

          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="date"
            className="w-full bg-[#495057] border border-[#0000000b] rounded-md px-3 py-1.5 text-[#7d868f] outline-none focus:border-[#bdc4cb] mb-3 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-[#ccc9dc] text-sm mb-2">
            Prioridades
          </label>

          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="w-full bg-[#495057] border border-[#0000000b] rounded-md px-3 py-1.5 text-[#7d868f] outline-none focus:border-[#bdc4cb] mb-3 cursor-pointer"
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-[#ccc9dc] text-sm mb-2">Descrição</label>

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
            placeholder="Descrição..."
            className="w-full resize-none bg-[#495057] border border-[#0000000b] rounded-md px-3 py-1.5 text-[#7d868f] outline-none focus:border-[#bdc4cb] mb-3"
          ></textarea>
        </div>

        <div>
          <button
            onClick={handleNovaTarefa}
            className="w-full bg-[#818a91] hover:bg-[#adb5bd] text-[#adb5bd] hover:text-[#818a91] font-bold py-2 rounded-md transition-colors duration-700 cursor-pointer"
          >
            + Adicionar tarefa
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
