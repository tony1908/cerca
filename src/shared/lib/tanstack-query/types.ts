import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * Shared query types for type safety
 */
export type QueryOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

export type MutationOptions<TData, TError = Error, TVariables = void> = UseMutationOptions<
  TData,
  TError,
  TVariables
>;
