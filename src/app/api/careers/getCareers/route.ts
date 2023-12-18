import { Careers, Users } from "@/lib/mongoose";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" });
    }
    const userInfo = await Users.findById(session.user.sub)
    const careers = await Careers.find({ course:userInfo.stream });
    return Response.json(careers);
  } catch (error) {
    return Response.json({ message: error});
  }
}
