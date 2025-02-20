import { render, screen } from "@testing-library/react";
import NoteCard from "../src/components/NoteCard";

test("renders note title", () => {
  const note = { id: "1", title: "Test Note", content: "Test content" };
  render(<NoteCard note={note} />);
  expect(screen.getByText("Test Note")).toBeInTheDocument();
});
