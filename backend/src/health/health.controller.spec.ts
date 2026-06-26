import { describe, expect, it } from "@jest/globals";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("retorna o status da API", () => {
    const controller = new HealthController();

    const response = controller.check();

    expect(response.status).toBe("ok");
    expect(response.service).toBe("casa-church-api");
    expect(response.timestamp).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(response.timestamp))).toBe(false);
  });
});
