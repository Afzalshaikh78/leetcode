
import { onBoardUser } from "@/modules/auth/actions";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await onBoardUser();
  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <UserButton/>

    </div>
  );
}
   