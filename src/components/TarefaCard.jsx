const TarefaCard = ({ tarefa, alterarStatus, removerTarefa }) => {
  const getPrioridadeColors = (prioridade) => {
    if (prioridade === "Alta") return "bg-[#9a0000] text-[#d5a6a6]";
    else if (prioridade === "Média") return "bg-[#9a6a00] text-[#ffe8a1]";
    else return "bg-[#009a0d] text-[#b3cfb4]";
  };

  const getStatusColors = (status) => {
    if (status === "Pendente")
      return "bg-[#979dac] text-[#454954] hover:bg-[#454954] hover:text-[#979dac]";
    else if (status === "Em andamento")
      return "bg-[#edbb6b] text-[#b07807] hover:bg-[#b07807] hover:text-[#edbb6b]";
    else
      return "bg-[#a3b18a] text-[#588157] hover:bg-[#588157] hover:text-[#a3b18a]";
  };

  return (
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
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPrioridadeColors(tarefa.prioridade)}`}
        >
          {tarefa.prioridade}
        </span>

        {/* Status */}
        <button
          onClick={() => alterarStatus(tarefa.id)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-500 cursor-pointer ${getStatusColors(tarefa.status)}`}
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
  );
};

export default TarefaCard;
