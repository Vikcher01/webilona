async function makeTinkoffToken(
  params: Record<string, any>,
  password: string
): Promise<string> {
  const entries = Object.entries(params).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      typeof value !== "object"
  );

  entries.push(["Password", password]);
  entries.sort(([a], [b]) => a.localeCompare(b));

  const concat = entries.map(([, v]) => String(v)).join("");
  
  const encoder = new TextEncoder();
  const data = encoder.encode(concat);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: Request) {
  try {
    console.log("[v0] Starting Tinkoff Init");
    
    const terminalKey = process.env.TINKOFF_TERMINAL_KEY;
    const secretKey = process.env.TINKOFF_SECRET_KEY;
    
    console.log("[v0] Terminal Key exists:", !!terminalKey);
    console.log("[v0] Secret Key exists:", !!secretKey);
    
    if (!terminalKey || !secretKey) {
      console.error("[v0] Missing environment variables");
      return Response.json(
        { error: "Не настроены переменные окружения для оплаты" },
        { status: 500 }
      );
    }

    const { amount, orderId, description, customerData } = await req.json();
    console.log("[v0] Request data:", { amount, orderId, description });

    const receipt = {
      FfdVersion: "1.2",
      Email: customerData?.email || "test@example.com",
      Taxation: "usn_income",
      Items: [
        {
          Name: description || "Оплата доступа к вебинару",
          Price: amount,
          Quantity: 1,
          Amount: amount,
          PaymentMethod: "full_payment",
          PaymentObject: "service",
          Tax: "none"
        }
      ]
    };

    const basePayload: Record<string, any> = {
      TerminalKey: terminalKey,
      Amount: amount,
      OrderId: orderId,
      Description: description,
      Receipt: receipt, // Added Receipt to payload
    };

    const token = await makeTinkoffToken(basePayload, secretKey);
    const payload = { ...basePayload, Token: token };

    console.log("[v0] Payload:", payload);
    console.log("[v0] Sending request to Tinkoff...");

    const res = await fetch("https://securepay.tinkoff.ru/v2/Init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("[v0] Tinkoff response:", data);

    if (!data.Success) {
      console.error("[v0] Tinkoff Init error:", data);
      return Response.json(
        { error: data.Message || data.Details || "Ошибка инициализации платежа" },
        { status: 400 }
      );
    }

    return Response.json(
      { paymentUrl: data.PaymentURL },
      { status: 200 }
    );
  } catch (e) {
    console.error("[v0] Tinkoff Init exception:", e);
    const errorMessage = e instanceof Error ? e.message : "Server error";
    return Response.json(
      { error: `Ошибка сервера: ${errorMessage}` },
      { status: 500 }
    );
  }
}
