"use client";
import { UiDataProvider } from "./UiDataProvider";
import { UserContextProvider } from "./UserProvider";

export const AllContextProviders = ({ children }) => {
  return (
    <UserContextProvider>
      <UiDataProvider>{children}</UiDataProvider>
    </UserContextProvider>
  );
};
