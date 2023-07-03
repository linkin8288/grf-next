import NextAuth from "next-auth";

import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);

// Make use of GET nd POST methods out side of this file.
export { handler as GET, handler as POST };
