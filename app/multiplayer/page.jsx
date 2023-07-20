import createClient from "@/utils/supabase-server";

const MultiPlayerPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  return (
    <>
      <h1 className="text-foreground">Multiplayer</h1>
      <div>
        <h3 className="text-foreground">Create Room</h3>
      </div>
      <div>
        <h3 className="text-foreground">Join Room</h3>
      </div>
    </>
  );
};

export default MultiPlayerPage;
