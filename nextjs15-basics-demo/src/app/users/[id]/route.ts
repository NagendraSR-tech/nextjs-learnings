import { users } from "../route";
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const user = users.find(user => user.id === parseInt(id))
  return Response.json(user)
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await request.json();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return new Response("User not found", { status: 404 });
    }
    users[userIndex] = { ...users[userIndex], ...body };
    return Response.json(users[userIndex]);
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return new Response("User not found", { status: 404 });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    return Response.json(deletedUser);
}