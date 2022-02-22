import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"

// Setting up mongodb adapter
const uri = process.env.DB_URL;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client = new MongoClient(uri, options);
let clientPromise = client.connect();



export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: 'qwertyuiop',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    }
});
