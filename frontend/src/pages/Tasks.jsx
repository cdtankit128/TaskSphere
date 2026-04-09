import { useOutletContext } from "react-router-dom";

export default function Tasks() {
  const {
    uid,
    loading,
    newTask,
    setNewTask,
    filter,
    setFilter,
    stats,
    visibleTodos,
    editingTodoId,
    editingText,
    setEditingText,
    handleAddTask,
    handleToggle,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
    clearCompleted,
  } = useOutletContext();

  return (
    <section className="page-grid">
      <div className="surface-card page-title">
        <p className="tag">Core Work Area</p>
        <h1>Tasks</h1>
        <p>Add tasks, filter quickly, edit names, and keep your list clean.</p>
      </div>

      <section className="surface-card">
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            disabled={!uid || loading}
          />
          <button type="submit" disabled={!uid || loading}>
            Add
          </button>
        </form>

        <div className="filter-row">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button type="button" className="ghost" onClick={clearCompleted} disabled={!stats.completed || loading}>
            Clear Completed
          </button>
        </div>
      </section>

      <section className="surface-card">
        <div className="todo-list">
          {visibleTodos.length === 0 && <p className="empty">No tasks yet. Add your first task.</p>}
          {visibleTodos.map((todo) => (
            <article key={todo.id} className={todo.completed ? "todo-item done" : "todo-item"}>
              <button
                type="button"
                className="tick"
                onClick={() => handleToggle(todo)}
                aria-label="Toggle complete"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>

              <div className="todo-copy">
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="task-edit-input"
                  />
                ) : (
                  <p>{todo.text}</p>
                )}

                <small>
                  Created {new Date(todo.createdAt).toLocaleString()} {todo.completedAt ? `| Completed ${new Date(todo.completedAt).toLocaleString()}` : ""}
                </small>
              </div>

              <div className="task-actions">
                {editingTodoId === todo.id ? (
                  <>
                    <button type="button" className="ghost" onClick={() => handleSaveEdit(todo.id)}>
                      Save
                    </button>
                    <button type="button" className="ghost" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" className="ghost" onClick={() => handleStartEdit(todo)}>
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  className="remove"
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
