import { Session } from "next-auth";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

export default function Feed({ user, expires }: Session) {
  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!user && "!grid-cols-1 !max-w-3xl"}`}>
      <section className="col-span-2">
        <Stories  user={user} expires={expires}/>
        <Posts />
      </section>
      {user && (
      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile user={user} expires={expires} />
          <Suggestions />
        </div>
      </section>
      )}
    </main>
  );
}
