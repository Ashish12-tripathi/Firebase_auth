export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">No tasks available</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
          <div>
            <h3 className="font-bold">{t.title}</h3>
            <p className="text-gray-600">{t.description}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onUpdate(t._id, { title: t.title + " ✅" })}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(t._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
