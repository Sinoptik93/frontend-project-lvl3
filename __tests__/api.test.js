import api from "../src/scripts/helpers/api.js";

const URL = "https://jsonplaceholder.typicode.com/todos/1";
const EXAMPLE_RESPONSE = {
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false,
};

describe("test api response", () => {
  it("success response 'json placeholder' data item:", () =>
    expect(api(URL).then(({ data }) => data)).resolves.toStrictEqual(
      EXAMPLE_RESPONSE
    ));
});
