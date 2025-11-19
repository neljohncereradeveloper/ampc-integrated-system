import {
  InvalidateQueryFilters,
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type MutationSuccessParams<TData, TVariables, TContext> = {
  data: TData;
  variables: TVariables;
  context: TContext | undefined;
  queryClient: QueryClient;
};

type InvalidateTarget<TData, TVariables, TContext> =
  | QueryKey
  | InvalidateQueryFilters
  | ((
      params: MutationSuccessParams<TData, TVariables, TContext>
    ) =>
      | void
      | QueryKey
      | InvalidateQueryFilters
      | Promise<void | QueryKey | InvalidateQueryFilters>);

export type AppMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
> = UseMutationOptions<TData, TError, TVariables, TContext> & {
  /**
   * Queries to invalidate after a successful mutation.
   * Accepts query keys, invalidate filters, or a function that can derive them
   * from the mutation result.
   */
  invalidateQueries?:
    | InvalidateTarget<TData, TVariables, TContext>
    | InvalidateTarget<TData, TVariables, TContext>[];
};

export function useAppMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: AppMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();
  const { invalidateQueries, onSuccess, ...rest } = options;

  return useMutation({
    ...rest,
    onSuccess: async (data, variables, context) => {
      if (invalidateQueries) {
        const targets = Array.isArray(invalidateQueries)
          ? invalidateQueries
          : [invalidateQueries];

        for (const target of targets) {
          await handleInvalidateTarget(target, {
            data,
            variables,
            context,
            queryClient,
          });
        }
      }

      await onSuccess?.(data, variables, context);
    },
  });
}

async function handleInvalidateTarget<TData, TVariables, TContext>(
  target: InvalidateTarget<TData, TVariables, TContext>,
  params: MutationSuccessParams<TData, TVariables, TContext>
) {
  if (typeof target === "function") {
    const result = await target(params);
    if (!result) {
      return;
    }
    await handleInvalidateTarget(result, params);
    return;
  }

  if (isQueryKey(target)) {
    await params.queryClient.invalidateQueries({ queryKey: target });
    return;
  }

  await params.queryClient.invalidateQueries(target);
}

function isQueryKey(value: unknown): value is QueryKey {
  return Array.isArray(value);
}
