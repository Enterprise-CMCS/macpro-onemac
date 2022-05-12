import { main } from "./withdrawWaiverRenewal";
import { changeStatusAny } from "./changeStatusAny";

jest.mock("./changeStatusAny");

const testEvent = {
  this: "is an event object",
};

it("calls changeStatusAny", async () => {
  const response = main(testEvent);
  expect(response).toBeInstanceOf(Promise);
  expect(changeStatusAny).toHaveBeenCalled();
});

it("cathes logs and rethrows submit error", async () => {
  const mockError = Error("changeStatusAny error");
  changeStatusAny.mockImplementationOnce(() => {
    throw mockError;
  });
  const logSpy = jest.spyOn(console, "log");
  //console.log("Exception: ", Error("changeStatusAny error"));
  expect(main(testEvent)).rejects.toThrow(mockError);
  expect(logSpy).toHaveBeenCalledWith("Exception: ", mockError);
});
