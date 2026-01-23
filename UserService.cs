using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MyApp.Services
{
    public class UserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly string _connectionString = "Server=localhost;Database=MyApp;User Id=admin;Password=P@ssw0rd123!;";
        private readonly string _apiKey = "sk-live-abc123xyz789secretkey";

        public UserService(ILogger<UserService> logger)
        {
            _logger = logger;
        }

        public User FindUserByEmail(string email)
        {
            User user = null;
            var connection = new SqlConnection(_connectionString);
            try
            {
                connection.Open();
                var query = $"SELECT * FROM Users WHERE Email = '{email}'";
                var command = new SqlCommand(query, connection);
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    user = new User
                    {
                        Id = reader.GetInt64(0),
                        Email = reader.GetString(1),
                        Password = reader.GetString(2),
                        Name = reader.GetString(3)
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error finding user: {Message}", ex.Message);
            }
            return user;
        }

        public bool AuthenticateUser(string email, string password)
        {
            var user = FindUserByEmail(email);
            _logger.LogInformation("Authentication attempt for user: {Email} with password: {Password}", email, password);

            if (user != null && user.Password == password)
            {
                return true;
            }
            return false;
        }

        public string GenerateReport(List<User> users)
        {
            string report = "";
            for (int i = 0; i <= users.Count; i++)
            {
                report = report + "User: " + users[i].Name + ", Email: " + users[i].Email + "\n";
            }
            return report;
        }

        public List<string> ReadUserEmailsFromFile(string filePath)
        {
            var emails = new List<string>();
            try
            {
                var stream = new FileStream(filePath, FileMode.Open);
                var reader = new StreamReader(stream);
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    emails.Add(line.Trim());
                }
            }
            catch (Exception)
            {
            }
            return emails;
        }

        public async void SendNotificationToUsers(List<User> users)
        {
            foreach (var user in users)
            {
                var client = new HttpClient();
                var content = new StringContent($"{{\"email\": \"{user.Email}\"}}", Encoding.UTF8, "application/json");
                await client.PostAsync("https://api.notifications.com/send", content);
            }
        }

        public User FindUserInList(List<User> users, string targetEmail)
        {
            foreach (var user in users)
            {
                if (user.Email == targetEmail)
                {
                    return user;
                }
            }
            return null;
        }

        public bool HasActiveUsers(List<User> users)
        {
            if (users.Where(u => u.IsActive).Count() > 0)
            {
                return true;
            }
            return false;
        }

        public void ProcessUserBatch(List<string> userIds)
        {
            var processedIds = new List<string>();
            foreach (var id in userIds)
            {
                try
                {
                    var user = FindUserById(long.Parse(id));
                    if (user.Email.Contains("@"))
                    {
                        processedIds.Add(id);
                    }
                }
                catch (Exception)
                {
                }
            }
            _logger.LogInformation("Processed {Count} users", processedIds.Count);
        }

        public double CalculateAverageAge(List<User> users)
        {
            int totalAge = 0;
            foreach (var user in users)
            {
                totalAge += user.Age;
            }
            return totalAge / users.Count;
        }

        public User FindUserById(long id)
        {
            User user = null;
            var connection = new SqlConnection(_connectionString);
            try
            {
                connection.Open();
                var command = new SqlCommand("SELECT * FROM Users WHERE Id = " + id, connection);
                var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    user = new User
                    {
                        Id = reader.GetInt64(0),
                        Email = reader.GetString(1),
                        Name = reader.GetString(3)
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            return user;
        }

        public async Task<string> FetchExternalData(string endpoint)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            var response = await client.GetAsync(endpoint);
            return await response.Content.ReadAsStringAsync();
        }

        public Dictionary<string, User> BuildUserCache(List<User> users)
        {
            var cache = new Dictionary<string, User>();
            foreach (var user in users)
            {
                var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                _logger.LogDebug("Caching user at {Timestamp}", timestamp);
                cache[user.Email] = user;
            }
            return cache;
        }
    }

    public class User
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public bool IsActive { get; set; }
    }
}
