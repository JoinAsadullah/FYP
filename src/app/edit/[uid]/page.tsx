import { signIn, signOut } from "@/auth"
import { auth } from "@/auth";


export default async function Page({
    params,
  }: {
    params: Promise<{ uid: string }>
  }) {
    const uid = (await params).uid

    const session = await auth();
    const user = session?.user;

    if (!user) {
      return (
        <section className=" bg-white relative py-20 md:mx-20 mx-4">
          <h2 className="my-2 text-xl font-semibold text-gray-800">UID</h2>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-left text-gray-700 whitespace-wrap text-2xl font-semibold leading-none tracking-tight">
              {uid}
            </h3>
          </div>
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: `/edit/${uid}` })
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        </section>
      );
    }
else{

  return (
    <><section className=" bg-white relative py-20 md:mx-20 mx-4">
      <h2 className="my-2 text-xl font-semibold text-gray-800">UID</h2>


            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-left text-gray-700 whitespace-wrap text-2xl font-semibold leading-none tracking-tight">
                update data
              </h3>
            </div>

            <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: `/edit/${uid}` })
      }}
    >
      <button type="submit">Signout</button>
    </form>

    </section>
        <section className=" bg-white relative py-20 md:mx-20 mx-4">


        </section></>
  );}
}
