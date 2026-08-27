import { _saveQuestion, _saveQuestionAnswer } from "../../_DATA";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store/store";
import NewQuestion from "../pages/NewQuestion";

describe("_saveQuestion", () => {
  it("returns a saved question with all expected fields when correctly formatted data is passed", async () => {
    const input = {
      optionOneText: "Learn React",
      optionTwoText: "Learn Angular",
      author: "sarahedo",
    };

    const result = await _saveQuestion(input);

    expect(result).toMatchSnapshot();
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.author).toBe(input.author);
    expect(result.optionOne.text).toBe(input.optionOneText);
    expect(result.optionTwo.text).toBe(input.optionTwoText);
    expect(result.optionOne.votes).toEqual([]);
    expect(result.optionTwo.votes).toEqual([]);
  });
});

describe("saveQuestion failing", () => {
  it("returns a saved question with wrong data and return error", async () => {
    const input = { data: "wrong data" };

    await expect(_saveQuestion(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestionAnswer true", () => {
  it("should return true when correctly formatted data is passed", async () => {
    const input = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(input);

    expect(result).toBe(true);
  });
});

describe("_saveQuestionAnswer error", () => {
  it("should return error when bad formatted data is passed", async () => {
    const input = { data: "wrong data" };

    await expect(_saveQuestionAnswer(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestion missing optionOneText", () => {
  it("should reject when optionOneText is missing", async () => {
    const input = { optionTwoText: "Learn Angular", author: "sarahedo" };
    await expect(_saveQuestion(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestion missing optionTwoText", () => {
  it("should reject when optionTwoText is missing", async () => {
    const input = { optionOneText: "Learn React", author: "sarahedo" };
    await expect(_saveQuestion(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestion missing author", () => {
  it("should reject when author is missing", async () => {
    const input = { optionOneText: "Learn React", optionTwoText: "Learn Angular" };
    await expect(_saveQuestion(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestionAnswer missing authedUser", () => {
  it("should reject when authedUser is missing", async () => {
    const input = { qid: "8xf0y6ziyjabvozdd253nd", answer: "optionOne" };
    await expect(_saveQuestionAnswer(input)).rejects.toBeDefined();
  });
});

describe("_saveQuestionAnswer missing qid", () => {
  it("should reject when qid is missing", async () => {
    const input = { authedUser: "sarahedo", answer: "optionOne" };
    await expect(_saveQuestionAnswer(input)).rejects.toBeDefined();
  });
});

describe("NewQuestion component", () => {
  it("should enable the Submit button when both option fields are filled in", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );

    const input1 = getByPlaceholderText("Enter option one");
    const input2 = getByPlaceholderText("Enter option two");
    const button = getByRole("button", { name: /submit/i });

    expect(button).toBeDisabled();

    fireEvent.change(input1, { target: { value: "First input" } });
    fireEvent.change(input2, { target: { value: "Second input" } });

    expect(button).not.toBeDisabled();
  });
});
