import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("子要素を表示する", () => {
    render(
      <Tooltip content="ツールチップテキスト">
        <button>ホバーしてください</button>
      </Tooltip>
    );
    expect(screen.getByText("ホバーしてください")).toBeInTheDocument();
  });

  it("デフォルトではツールチップコンテンツが非表示である", () => {
    render(
      <Tooltip content="ツールチップテキスト">
        <button>ホバーしてください</button>
      </Tooltip>
    );
    // ツールチップは初期状態では表示されない
    expect(screen.queryByText("ツールチップテキスト")).not.toBeInTheDocument();
  });

  it("ホバー時にツールチップコンテンツを表示する", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="ツールチップテキスト">
        <button>ホバーしてください</button>
      </Tooltip>
    );

    const trigger = screen.getByText("ホバーしてください");
    await user.hover(trigger);

    expect(screen.getByText("ツールチップテキスト")).toBeInTheDocument();
  });

  it("ホバー解除時にツールチップコンテンツを非表示にする", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="ツールチップテキスト">
        <button>ホバーしてください</button>
      </Tooltip>
    );

    const trigger = screen.getByText("ホバーしてください");
    await user.hover(trigger);
    expect(screen.getByText("ツールチップテキスト")).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByText("ツールチップテキスト")).not.toBeInTheDocument();
  });

  it("クリック時にツールチップをトグルする（モバイル対応）", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="ツールチップテキスト">
        <button>タップしてください</button>
      </Tooltip>
    );

    const button = screen.getByText("タップしてください");
    const outerContainer = button.parentElement!.parentElement!;

    // クリックで表示
    await user.click(outerContainer);
    expect(screen.getByText("ツールチップテキスト")).toBeInTheDocument();

    // 再度クリックで非表示
    await user.click(outerContainer);
    expect(screen.queryByText("ツールチップテキスト")).not.toBeInTheDocument();
  });

  it("適切なaria属性を持つ", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="ツールチップテキスト">
        <button>ホバーしてください</button>
      </Tooltip>
    );

    const button = screen.getByText("ホバーしてください");
    const wrapper = button.parentElement;

    // ツールチップが表示されていない時はaria-describedbyがない
    expect(wrapper).not.toHaveAttribute("aria-describedby");

    // ホバー後はaria-describedbyがある
    await user.hover(wrapper!);
    expect(wrapper).toHaveAttribute("aria-describedby");
  });

  it("複数行のコンテンツを表示できる", async () => {
    const user = userEvent.setup();
    const content = (
      <div>
        <p>行1</p>
        <p>行2</p>
      </div>
    );

    render(
      <Tooltip content={content}>
        <button>ホバーしてください</button>
      </Tooltip>
    );

    const trigger = screen.getByText("ホバーしてください");
    await user.hover(trigger);

    expect(screen.getByText("行1")).toBeInTheDocument();
    expect(screen.getByText("行2")).toBeInTheDocument();
  });
});
