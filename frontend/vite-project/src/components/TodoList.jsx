import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import { 
  useGetDashboardQuery,
  useCreateDashboardMutation,
  useUpdateDashboardMutation,
  useDeleteDashboardMutation 
} from "../redux/Api.jsx";

const TodoList = () => {
  const { data, error: getError, isError: isGetError, isLoading, refetch } = useGetDashboardQuery();
  const [addTodo] = useCreateDashboardMutation();
  const [updateTodo] = useUpdateDashboardMutation();
  const [deleteTodo] = useDeleteDashboardMutation();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);  // Track which todo is being edited
  const [editingText, setEditingText] = useState('');        // Track the text being edited

  const handleAddTodo = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (text) {
      try {
        const response = await addTodo({ text }).unwrap();
        setText('');
        console.log("response", response);
        refetch(); // Trigger refetch after adding a todo
        setLoading(false);
      } catch (err) {
        console.error("Failed to add todo:", err);
        alert("Failed to add todo. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo._id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = async (todoId) => {
    try {
      const response = await updateTodo({ id: todoId, text: editingText }).unwrap();
      console.log("response edit updated", response);
      setEditingTodoId(null);
      refetch(); // Refetch after saving the edit
    } catch (err) {
      console.error("Failed to update todo:", err);
      alert("Failed to update todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (id) => {
    setDelLoading(true);
    try {
      await deleteTodo(id).unwrap();
      refetch(); // Trigger refetch after deleting a todo
      setDelLoading(false);
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setDelLoading(false);
      alert("Failed to delete todo. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isGetError) return <div>Error: {getError.message}</div>;

  return (
    <div>
      <h1 className='text-center'>Todo List</h1>
      <Link to={"/chatting"}>Chat</Link>
      <div className='flex justify-center items-center mt-3'>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new todo"
          className='border-[2px] p-1'
        />
        <button onClick={handleAddTodo} className='bg-green-500 p-1'>
          {loading ? "Loading..." : "Add Todo"}
        </button>
      </div>
      <div>
        {data?.payload?.map((dat, ind) => (
          <div key={ind} className='flex justify-between items-center w-4/12 ml-auto mr-auto mt-6'>
            {editingTodoId === dat._id ? (
              <>

                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className='border-[2px] p-1'
                />
                <button onClick={() => handleSaveEdit(dat._id)} className='bg-blue-500 p-2 rounded-lg'>Save</button>
                <button onClick={() => setEditingTodoId(null)} className='bg-gray-500 p-2 rounded-lg'>Cancel</button>
              </>
            ) : (
              <>
                <div className='mt-4 w-5/12'>{dat.text}</div>
                <div className='flex justify-center items-center w-2/12'>
                  <button onClick={() => handleEditTodo(dat)} className='bg-orange-500 p-2 rounded-lg'>Edit</button>
                </div>
                <div className='flex justify-center items-center w-2/12'>
                  <button onClick={() => handleDeleteTodo(dat._id)} className='bg-red-400 rounded-lg p-1'>
                    {delLoading ? "Loading..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
