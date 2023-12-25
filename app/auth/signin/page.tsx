import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <SignInForm/>
}