# Prettify: A Spotify Visualizer

## Introduction

Prettify is a web-based Spotify Visualizer that offers a mesmerizing experience by dynamically visualizing the currently playing track on Spotify. With a minimalist design, it displays vibrant gradients influenced by the track's cover art, along with essential track information, enhancing your music listening experience.

## Features

- **Real-time Music Visualization**
- **Dynamic Background Colors**
- **Track Information Display**

## Getting Started

### Prerequisites

- A Spotify Premium account
- Node.js and npm installed on your machine

### Environment Setup

#### Spotify Web API App

1. Navigate to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in.
2. Create a new app to obtain your `clientId` and `clientSecret`.
3. Note down the credentials for later use in the project setup.

#### Node.js and npm

- Ensure Node.js and npm are installed by running `node -v` and `npm -v` in your terminal. If not, download and install Node.js from the [official website](https://nodejs.org/), which includes npm.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/raqeebanjum/prettify.git
2. Navigate to the project directory:
   ```bash
   cd prettify
3. Install dependencies:
   ```bash
   npm install express axios querystring express-session
### Configuration
- Open server.js in your project directory and replace 'Client ID Here' and 'Client Secret Here' with your actual clientId and clientSecret.

### Usage
- Start the server:
   ```bash
   - To start server, run either 'npm start' or 'node server.js'
   Open 'http://localhost:3000' in your browser.
   Click "Login with Spotify" and authorize the application.
- Enjoy the visualizer with your current Spotify track!

### License
This project is released under the MIT License. Please refer to the LICENSE file for more details.
