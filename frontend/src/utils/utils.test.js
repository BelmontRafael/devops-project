import assert from "node:assert/strict";
import { test } from "node:test";

import { formatDate } from "./utils.js";

test("formatDate retorna data em portugues do Brasil", () => {
  const formattedDate = formatDate("2026-06-25T12:00:00.000Z");

  assert.equal(formattedDate, "25 de junho de 2026");
});
