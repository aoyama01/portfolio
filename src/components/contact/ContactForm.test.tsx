import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("すべての入力フィールドを表示する", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/名前/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/件名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メッセージ/i)).toBeInTheDocument();
  });

  it("送信ボタンを表示する", () => {
    render(<ContactForm />);

    expect(screen.getByRole("button", { name: /送信/i })).toBeInTheDocument();
  });

  it("すべてのフィールドにrequired属性がある", () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/名前/i);
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const subjectInput = screen.getByLabelText(/件名/i);
    const messageInput = screen.getByLabelText(/メッセージ/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(subjectInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it("メールアドレスフィールドがemail typeである", () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("メッセージフィールドがtextareaである", () => {
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/メッセージ/i);
    expect(messageInput.tagName).toBe("TEXTAREA");
  });

  it("フォームにaction属性がある", () => {
    const { container } = render(<ContactForm />);

    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action");
  });

  it("必須フィールドマーク（*）を表示する", () => {
    render(<ContactForm />);

    const requiredMarks = screen.getAllByText("*");
    // 4つのフィールドすべてに必須マークがあることを確認
    expect(requiredMarks.length).toBeGreaterThanOrEqual(4);
  });
});
