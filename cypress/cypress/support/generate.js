import { build, fake } from "test-data-bot";

const buildUser = build("User").fields({
  email: fake((f) => f.internet.email()),
  password: fake((f) => f.internet.password()),
});

export { buildUser };
