import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Example API fetch function
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Example mutation function
async function createPost(newPost: { title: string; body: string }) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}

export default function TanStackQueryExample() {
  const queryClient = useQueryClient();

  // Example query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Example mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts after creating a new one
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCreatePost = () => {
    mutation.mutate({
      title: "New Post",
      body: "This is a new post created with TanStack Query mutation",
    });
  };

  if (isLoading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        TanStack Query Example
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5 }}>
          Fetched {data?.length || 0} posts
        </Text>
        <Button title="Refetch Posts" onPress={() => refetch()} />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Button
          title={mutation.isPending ? "Creating..." : "Create New Post"}
          onPress={handleCreatePost}
          disabled={mutation.isPending}
        />
        {mutation.isSuccess && (
          <Text style={{ color: "green", marginTop: 5 }}>
            Post created successfully!
          </Text>
        )}
        {mutation.isError && (
          <Text style={{ color: "red", marginTop: 5 }}>
            Error: {mutation.error.message}
          </Text>
        )}
      </View>

      <Text style={{ fontWeight: "bold", marginTop: 10 }}>First 3 Posts:</Text>
      {data?.slice(0, 3).map((post: any) => (
        <View
          key={post.id}
          style={{
            padding: 10,
            marginTop: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{post.title}</Text>
          <Text numberOfLines={2}>{post.body}</Text>
        </View>
      ))}
    </View>
  );
}
