import { useUser } from "@clerk/nextjs";

const { isLoaded, isSignedIn, user } = useUser();