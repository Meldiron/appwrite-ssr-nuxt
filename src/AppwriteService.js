import { Account, Avatars, Client } from "appwrite";

export const useAppwriteService = (runtimeConfig) => {
  const { AppwriteEndpoint, AppwriteProject } = runtimeConfig;

  const client = new Client();
  client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

  const account = new Account(client);
  const avatars = new Avatars(client);

  return {
    signOut: async () => {
      await account.deleteSession("current");
    },
    getAccount: async () => {
      return await account.get();
    },
    getAccountPicture: (name) => {
      return avatars
        .getInitials(name.split("").reverse().join(""), 256, 256)
        .toString();
    },
  };
};
