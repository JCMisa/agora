"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const SyncUser = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const createNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        clerkId: user?.id,
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        // headline is initially null
        // bio is initially null
        // location is initially null
        // resumeUrl is initially null
        // linkedinUrl is initially null
        // githubUrl is initially null
        // portfolioUrl is initially null
        role: "employee",
        // subscriptionId is initially null
        // createdAt is automatically set by the database
        // updatedAt is initially null
      });

      if (result.data) {
        console.log("User sync successfully: ", result.data);
      }
      toast.warning("Email aleady in use");
    } catch (error) {
      console.log("User sync internal error: ", error);
      toast.error("Internal error occured while saving the user");
    }
  };

  useEffect(() => {
    user && createNewUser();
  }, [user]);

  return <>{children}</>;
};

export default SyncUser;
