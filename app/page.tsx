import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Button>Click Me</Button> <UserButton />
    </>
  );
}
