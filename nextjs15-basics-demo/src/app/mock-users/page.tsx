import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
  id: number;
  name: string;
};

export default async function MockUser() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log({ authObj, userObj });

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch("https://6502bf84a0f2c1f3faeace37.mockapi.io/users");
  const users = await res.json();

  //formData: FormData - buildin browser API that provides a way to easily construct keyvalue pairs
  // representing form fields and their values
  async function addUser(formData: FormData) {
    "use server"; //this function should be executed on the server
    const name = formData.get("name");
    const res = await fetch(
      "https://6502bf84a0f2c1f3faeace37.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer PRIVATE_KEY"
        },
        body: JSON.stringify({ name }),
      }
    );
    const newUser = await res.json();
    revalidatePath("mock-users");
    console.log(newUser);
  }

  return (
    <>
      <div className="py-10">
        <form action={addUser} className="mb-4">
          <input type="text" name="name" required className="border p-2 mr-2" />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add user
          </button>
        </form>
        <div className="grid grid-cols-4 gap-4 py-10">
          {users.map((user: MockUser) => {
            return (
              <div
                key={user.id}
                className="p-4 bg-white rounded-lg text-gray-700 border-2"
              >
                {user.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
