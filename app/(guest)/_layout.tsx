import { router, Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function GuestLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={"/(auth)"} />;

  return <Stack />;
}
