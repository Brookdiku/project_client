import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";

export default async function page() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <SignUpForm/>
}