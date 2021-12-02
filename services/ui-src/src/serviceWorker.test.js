const serviceWorkerTest =  require("./serviceWorker");


it("renders without crashing", () => {

    process.env.NODE_ENV = "production"
    const worker = serviceWorkerTest.register("");
    expect(worker).toBe(undefined)

    const worker2 = serviceWorkerTest.unregister("");
    expect(worker2).toBe(undefined)

});
