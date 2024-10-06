import { useEffect, useState } from "react";
import { Trash2, PlusCircle, CheckCircle, Circle, Pencil, X, Check } from "lucide-react";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingIndex !== null) {
        handleSaveEdit();
      } else {
        addTodo();
      }
    } else if (e.key === 'Escape' && editingIndex !== null) {
      handleCancelEdit();
    }
  };

  const toggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editingIndex !== null) {
      const newTodos = [...todos];
      newTodos[editingIndex].text = editText.trim();
      setTodos(newTodos);
      setEditingIndex(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos && Array.isArray(savedTodos)) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Elegant Todo List
        </h1>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors duration-300"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="group flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-purple-100 transform transition-all duration-300 hover:shadow-md animate-[fadeIn_0.3s_ease-in-out]"
            >
              <button
                onClick={() => toggleCompleted(index)}
                className="flex-shrink-0 focus:outline-none"
              >
                {todo.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 group-hover:text-purple-400 transition-colors duration-300" />
                )}
              </button>
              
              {editingIndex === index ? (
                <div className="flex-grow flex items-center gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    className="flex-grow px-2 py-1 rounded border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-green-500 hover:text-green-600 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-red-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <span
                  className={`flex-grow text-gray-700 transition-all duration-300 ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "group-hover:text-purple-600"
                  }`}
                >
                  {todo.text}
                </span>
              )}
              
              {editingIndex !== index && (
                <>
                  <button
                    onClick={() => startEditing(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 text-purple-400 hover:text-purple-600"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8 animate-pulse">
            No todos yet. Add some tasks!
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Todo;