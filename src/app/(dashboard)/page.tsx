import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {


  const user = await getCurrent()
  console.log(user);

  if (!user) redirect('/sign-in');

  return (
    <div >
      this is home page
    </div>
  );
}
