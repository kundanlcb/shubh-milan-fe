/**
 * useFeed Hook
 * Custom hook to manage feed data with API integration
 */

import { useState, useEffect, useCallback } from 'react';
import { feedService } from '../services';
import type { PostData, FeedFilters } from '../types/api.types';
import { getErrorMessage, logError } from '../utils/errorHandler';
import { allUsers } from '../utils/homeData'; // Fallback mock data

interface UseFeedResult {
  posts: PostData[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  hasMore: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  applyFilters: (filters: FeedFilters) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
}

export const useFeed = (initialFilters?: FeedFilters): UseFeedResult => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FeedFilters>(initialFilters || {});

  // Fallback to mock data if API fails
  const useMockData = __DEV__; // Use mock data in development mode

  const fetchFeed = useCallback(
    async (pageNum: number, isRefresh: boolean = false) => {
      try {
        if (useMockData) {
          // Use mock data in development
          const filteredPosts = allUsers.filter((post) => {
            const user = post.user;

            // Apply filters
            if (filters.ageMin && user.age < filters.ageMin) return false;
            if (filters.ageMax && user.age > filters.ageMax) return false;
            if (
              filters.professions?.length &&
              !filters.professions.includes(user.profession)
            )
              return false;
            if (
              filters.locations?.length &&
              !filters.locations.includes(user.location)
            )
              return false;
            if (
              filters.religions?.length &&
              !filters.religions.includes(user.religion)
            )
              return false;
            if (
              filters.genders?.length &&
              !filters.genders.includes(user.gender)
            )
              return false;
            if (filters.salaryMin && user.salary < filters.salaryMin)
              return false;
            if (filters.salaryMax && user.salary > filters.salaryMax)
              return false;

            return true;
          });

          if (isRefresh) {
            setPosts(filteredPosts);
          } else {
            setPosts((prev) => [...prev, ...filteredPosts]);
          }
          setHasMore(false); // Mock data doesn't paginate
          return;
        }

        // Use real API
        const response = await feedService.getFeed(filters, {
          page: pageNum,
          pageSize: 10,
        });

        if (isRefresh) {
          setPosts(response.items);
        } else {
          setPosts((prev) => [...prev, ...response.items]);
        }
        setHasMore(response.pageInfo.hasNextPage);
        setError(null);
      } catch (err) {
        logError(err, 'useFeed.fetchFeed');
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);

        // Fallback to mock data on error
        if (posts.length === 0) {
          setPosts(allUsers);
        }
      }
    },
    [filters, useMockData, posts.length]
  );

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    fetchFeed(1, true).finally(() => setIsLoading(false));
  }, []);

  // Refresh feed
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setPage(1);
    await fetchFeed(1, true);
    setIsRefreshing(false);
  }, [fetchFeed]);

  // Load more posts
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || isRefreshing) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchFeed(nextPage, false);
  }, [hasMore, isLoading, isRefreshing, page, fetchFeed]);

  // Apply filters
  const applyFilters = useCallback(
    async (newFilters: FeedFilters) => {
      setFilters(newFilters);
      setPage(1);
      setIsLoading(true);
      await fetchFeed(1, true);
      setIsLoading(false);
    },
    [fetchFeed]
  );

  // Toggle like on a post
  const toggleLike = useCallback(async (postId: string) => {
    // Optimistic update
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );

    try {
      if (!useMockData) {
        const post = posts.find((p) => p.id === postId);
        if (post) {
          await feedService.toggleLike(postId, post.isLiked);
        }
      }
    } catch (err) {
      logError(err, 'useFeed.toggleLike');
      // Revert optimistic update on error
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes + 1 : post.likes - 1,
              }
            : post
        )
      );
    }
  }, [posts, useMockData]);

  return {
    posts,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    refresh,
    loadMore,
    applyFilters,
    toggleLike,
  };
};
