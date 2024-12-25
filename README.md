# AIOne - All-in-One AI Desktop App

AIOne is an all-in-one AI application providing access to multiple AI models, including ChatGPT, Gemini, and Claude. The app is built using **Electron**, **React**, **Webpack**, and packaged using **Electron Forge**.

## Features

- **ChatGPT**: The most powerful AI language model to assist with a wide range of tasks.
- **Gemini**: A next-generation AI for creative and technical needs.
- **Claude**: Cutting-edge AI technology designed for intelligent and precise tasks.

## Download the Installer

To download the installer for the app, click the link below:

[Download AIOne Installer](https://github.com/SUMExXx/AIOne/releases/download/v1.0.0/AIOneInstaller.exe)

## Project Setup

### Option 1: Using Dev Container (Recommended)

1. Ensure you have **Docker** installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).
2. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SUMExXx/AIOne.git
   cd AIOne
   ```

3. Open the project in your IDE (e.g., Visual Studio Code) and open the dev container configuration by clicking on **Reopen in Container** if you're using VS Code.
4. Docker will build and start the development environment inside the container.
5. After the container is ready, install the necessary dependencies:

   ```bash
   npm install
   ```

6. To start the development server, run:

   ```bash
   npm start
   ```

### Option 2: Without Dev Container

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SUMExXx/AIOne.git
   cd AIOne
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. To start the development server, run:

   ```bash
   npm start
   ```

## Technology Stack

- **Frontend**: React, Webpack, Tailwind CSS
- **Backend**: Electron (for packaging and running the app as a desktop application)
- **AI Models**: ChatGPT, Gemini, Claude

## Contributing

We welcome contributions to improve the project. If you have suggestions or want to report bugs, please feel free to open an issue or submit a pull request.

### Steps to contribute

1. Fork this repository.
2. Create a new branch for your feature (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add feature xyz'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).