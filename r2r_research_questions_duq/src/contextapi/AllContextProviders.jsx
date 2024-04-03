"use client";
import { UiDataProvider } from "./UiDataProvider";
import { QuestionsDataProvider } from "./QuestionsDataProvider";
import { UserContextProvider } from "./UserProvider";

export const AllContextProviders = ({ children }) => {
  return (
    <UserContextProvider>
      <QuestionsDataProvider>
        <UiDataProvider>{children}</UiDataProvider>
      </QuestionsDataProvider>
    </UserContextProvider>
  );
};
