import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/src/config/queryClient.config';

/**
 * Creates a query key factory for a feature
 * Provides type-safe and consistent query keys
 */
export const createQueryKeys = <T extends string>(feature: T) => {
  return {
    all: [feature] as const,
    lists: () => [...createQueryKeys(feature).all, 'list'] as const,
    list: (filters: any) => [...createQueryKeys(feature).lists(), filters] as const,
    details: () => [...createQueryKeys(feature).all, 'detail'] as const,
    detail: (id: string) => [...createQueryKeys(feature).details(), id] as const,
  };
};

/**
 * Invalidate queries helper with types
 */
export const invalidateQueries = (queryKey: QueryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};

/**
 * Prefetch helper
 */
export const prefetchQuery = async <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>
) => {
  await queryClient.prefetchQuery({ queryKey, queryFn });
};
