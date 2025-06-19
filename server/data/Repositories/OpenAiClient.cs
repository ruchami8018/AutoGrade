using core.IRepositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace data.Repositories
{
    public class OpenAiClient : IOpenAiClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public OpenAiClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;

            var apiKey = _configuration["OpenAI:ApiKey"];//Environment.GetEnvironmentVariable("_apiKey");
            //האם צריך להוסיף משהו בהגדרות כדי שיוכלו לעשות קונפיגורציה
            if (string.IsNullOrWhiteSpace(apiKey))
                throw new InvalidOperationException("Missing OpenAI API Key in configuration.");

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);
        }

        public async Task<string> SendPromptAsync(string prompt)
        {
            //return $"Fake response for prompt: \"{prompt}\". This is a placeholder result.";
            var requestBody = new
            {
                model = "gpt-3.5-turbo", // או "gpt-3.5-turbo"
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.7
            };

            var requestJson = JsonSerializer.Serialize(requestBody);
            var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"OpenAI API Error: {response.StatusCode}, {error}");
            }

            var responseContent = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseContent);
            var message = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return message ?? string.Empty;
        }
    }
}
