import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    // Instead of throwing an error, return a component that displays an error message.
    return (
      <div className={"grow flex flex-col items-center justify-center p-4 text-center"}>
        <h1 className="text-xl font-semibold mb-2">Application Error</h1>
        <p className="mb-1">Could not retrieve the necessary access token to start the application.</p>
        <p>This might be due to missing or incorrect API key configuration.</p>
        <p>Please ensure server environment variables are set up correctly and try again.</p>
      </div>
    );
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
    </div>
  );
}
