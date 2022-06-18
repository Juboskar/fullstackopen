import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("new blog created", async () => {
  const user = userEvent.setup();
  const mockCreateBlog = jest.fn();

  render(<NewBlogForm createBlog={mockCreateBlog} />);

  const button = screen.getByText("create");
  const inputs = screen.getAllByRole("textbox");

  await user.type(inputs[0], "test title");
  await user.type(inputs[1], "test author");
  await user.type(inputs[2], "test url");

  await user.click(button);

  expect(mockCreateBlog.mock.calls).toHaveLength(1);
  expect(mockCreateBlog.mock.calls[0][0].title).toBe("test title");
  expect(mockCreateBlog.mock.calls[0][0].author).toBe("test author");
  expect(mockCreateBlog.mock.calls[0][0].url).toBe("test url");
});
