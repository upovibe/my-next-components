// hooks/useFetchMentions.tsx
import { useState, useEffect } from "react";

type MentionItem = {
  id: number;
  label: string;
};

const mockUsers: MentionItem[] = [
  { id: 1, label: "johndoe" },
  { id: 2, label: "janedoe" },
  { id: 3, label: "developer" },
];

const mockTrends: MentionItem[] = [
  { id: 1, label: "React" },
  { id: 2, label: "NextJS" },
  { id: 3, label: "TypeScript" },
];

const useFetchMentions = () => {
  const [users, setUsers] = useState<MentionItem[]>([]);
  const [trends, setTrends] = useState<MentionItem[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setTimeout(() => {
      setUsers(mockUsers);
      setTrends(mockTrends);
    }, 500); // Simulate delay
  }, []);

  return { users, trends };
};

export default useFetchMentions;
