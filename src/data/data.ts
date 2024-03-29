const BASE_URL = "http://127.0.0.1:8000";
type Data = {
  text: string;
  is_complete: boolean;
};

export const sendTodo = async ({ text, is_complete }: Data) => {
  console.log(text, is_complete);
  try {
    const response = await fetch(`${BASE_URL}/create-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        is_complete: false,
      }),
    });
    if (response.ok) {
      return response.json();
    } else {
      return response.status;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/`, { cache: "no-store" });
  try {
    if (response.ok) {
      return response.json();
    } else {
      return "No tasks found";
    }
  } catch (e) {
    console.log(e);
  }
};

export const checkTodo = async (id: number) => {
  console.log(`Id from the check function in CRUD ${id}`);
  const response = await fetch(`${BASE_URL}/check-todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      task_id: id,
    }),
  });
};
