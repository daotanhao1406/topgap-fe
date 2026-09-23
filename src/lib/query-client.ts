import { environmentManager, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  // Each server render gets its own cache; the browser keeps one stable client.
  if (environmentManager.isServer()) return makeQueryClient();

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
