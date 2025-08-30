    const URL =
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream";

    const HEADERS = {
      Accept: "*/*",
      "Accept-Language": "en-GB,en-US;q=0.99,en;q=0.88,fr;q=0.77",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      "x-mastra-dev-playground": "true",
    };

    const PAYLOAD = {
      messages: [
        {
          role: "user",
          content: "What's the weather like today in Mumbai?",
        },
      ],
      runId: "weatherAgent",
      maxRetries: 2,
      maxSteps: 5,
      temperature: 0.5,
      topP: 1,
      runtimeContext: {},
      threadId: "YOUR_COLLEGE_ROLL_NUMBER", // Replace with your actual roll number
      resourceId: "weatherAgent",
    };