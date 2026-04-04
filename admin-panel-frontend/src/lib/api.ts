import createClient from "openapi-fetch";
import type { paths } from "../types/api";

export const client = createClient<paths>({
    baseUrl: "http://localhost:8080/api/v1",

    headers: {
        "Content-Type": "application/json",
    },
});