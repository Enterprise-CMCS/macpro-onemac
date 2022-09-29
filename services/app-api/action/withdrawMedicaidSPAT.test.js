import { main } from "./withdrawMedicaidSPA";
import { changeStatusAny } from "./changeStatusAny";

jest.mock("./changeStatusAny");

const testEvent = {
  this: "is an event object",
};

it("calls changeStatusAny", async () => {
  const response = main(testEvent);
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
  expect(changeStatusAny).toHaveBeenCalled();
});

it("cathes logs and rethrows submit error", async () => {
  const mockError = Error("changeStatusAny error");
  changeStatusAny.mockImplementationOnce(() => {
    throw mockError;
  });
  const logSpy = jest.spyOn(console, "log");
  //console.log("Exception: ", Error("changeStatusAny error"));
  expect(main(testEvent))
    .rejects.toThrow(mockError)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
  expect(logSpy).toHaveBeenCalledWith("Exception: ", mockError);
});
