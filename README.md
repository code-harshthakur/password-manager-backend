# 🔒 Encrypted Password Manager API 🛡️

This is an Express server that provides an API for an encrypted password manager. It allows you to securely store and retrieve encrypted usernames and passwords.

## 🚀 Features

- **Add Credentials**: Send a POST request to the `/add` endpoint with a `label`, `username`, and `password` in the request body to add new credentials.
- **Search Credentials**: Send a POST request to the `/search` endpoint with a `label` in the request body to retrieve the encrypted `username` and `password` for that label.

## 🛠️ Installation

1. Clone this repository: `git clone https://github.com/yourusername/yourrepository.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## 📚 Usage

### Add Credentials

```bash
curl -X POST -H "Content-Type: application/json" -d '{"label":"MyLabel", "username":"MyUsername", "password":"MyPassword"}' http://localhost:3001/add
```
## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

- Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/code-harshthakur/password-manager-backend/issues/1) if you want to contribute.
- Always run prettier script before commiting : ```npm run prettier```

## 🙏 Acknowledgements

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
