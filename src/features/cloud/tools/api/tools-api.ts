export type ToolApiResult<T> = {
  ok: boolean;
  data: T;
  source: "live" | "fallback";
  message?: string;
};

const DEFAULT_TOOLS_API_BASE = "https://console.octalve.cloud/api/tools";

export function getToolsApiBase() {
  return process.env.NEXT_PUBLIC_OCTALVE_TOOLS_API_BASE ?? DEFAULT_TOOLS_API_BASE;
}

export async function runToolApi<TPayload extends Record<string, unknown>, TResult>(
  toolPath: string,
  payload: TPayload,
  fallback: TResult,
): Promise<ToolApiResult<TResult>> {
  try {
    const response = await fetch(`${getToolsApiBase()}${toolPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Tool API returned ${response.status}`);
    }

    const data = (await response.json()) as TResult;

    return {
      ok: true,
      data,
      source: "live",
    };
  } catch {
    return {
      ok: false,
      data: fallback,
      source: "fallback",
      message:
        "Live tool infrastructure is not connected yet. Showing a safe frontend preview until the console API is ready.",
    };
  }
}
