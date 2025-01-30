export class ApiService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, body: any) {
    const options = {
      method: "POST",
      headers: {
        version: "1.0",
      },
      body: body,
    };

    return await fetch(url, options).then((response) => {
      return response.json();
    });
  }
}
