# Features & Concepts Demonstrated
This project showcases best practices for data fetching, state management, and modern routing in React, using TanStack Query (React Query) and the latest React Router:

## Fetching Data with useQuery
Effortlessly fetch and manage server data using TanStack Query’s useQuery hook. The hook abstracts away loading, error, and caching logic, letting you focus on your UI.

## Caching and Stale Time
Benefit from out-of-the-box caching and automatic re-fetching of stale data. Fine-tune data freshness and background updates using the staleTime and cacheTime options.

##  Multiple & Parameterized Queries
Handle multiple concurrent queries with ease, including queries that depend on dynamic parameters (like route params or query strings) for flexible, scalable data access.

##   Mutations with useMutation
Safely create, update, and delete server data using the useMutation hook. Integrate server changes into your UI instantly, with built-in support for success/error handling.

##  Optimistic Updates
Deliver a snappy user experience by immediately updating the UI before the server responds. If a mutation fails, changes are automatically rolled back to keep data consistent.

##  Pagination & Infinite Queries
Implement efficient pagination, using React Query’s pagination utilities for seamless user experiences.

## DevTools Integration
Debug queries, mutations, and cache states visually using the built-in TanStack Query DevTools, streamlining development and troubleshooting.

## Latest React Routing v6.4+ (data router)
Utilize the latest React Router for file-based and data-centric routing patterns:

Nested routes and layouts via <Outlet />

*Dynamic route parameters for detail pages

Programmatic navigation with useNavigate

Route-based UI composition

### todo 
Loader functions for prefetching 

Action function for mutations (create/update)



