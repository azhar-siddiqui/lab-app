import { unstable_cache } from "next/cache";
import { cache } from "react";

type CacheProfile = "static" | "catalog" | "live" | "entity";

const revalidateByProfile: Record<CacheProfile, number> = {
  static: 300,
  catalog: 120,
  live: 60,
  entity: 60,
};

type CreateCachedQueryOptions<T> = {
  keyParts: string[];
  tags: string[];
  profile?: CacheProfile;
  fn: () => Promise<T>;
};

export function createCachedQuery<T>({
  keyParts,
  tags,
  profile = "live",
  fn,
}: CreateCachedQueryOptions<T>) {
  return cache(() =>
    unstable_cache(fn, keyParts, {
      tags,
      revalidate: revalidateByProfile[profile],
    })(),
  );
}

type CreateCachedQueryFnOptions<TArgs extends unknown[], TResult> = {
  fn: (...args: TArgs) => Promise<TResult>;
  getKeyParts: (...args: TArgs) => string[];
  getTags: (...args: TArgs) => string[];
  profile?: CacheProfile;
};

export function createCachedQueryFn<TArgs extends unknown[], TResult>({
  fn,
  getKeyParts,
  getTags,
  profile = "live",
}: CreateCachedQueryFnOptions<TArgs, TResult>): (
  ...args: TArgs
) => Promise<TResult> {
  const cached = cache((...args: TArgs) =>
    unstable_cache(
      () => fn(...args),
      getKeyParts(...args),
      {
        tags: getTags(...args),
        revalidate: revalidateByProfile[profile],
      },
    )(),
  );

  return cached as (...args: TArgs) => Promise<TResult>;
}