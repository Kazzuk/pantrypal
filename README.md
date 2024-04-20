# pantrypal

## Prerequisites

Ensure you have the following installed:

- [Node.js v20.X](https://nodejs.org/)
- [Bun.sh](https://bun.sh/)

## Getting Started

Follow these steps to get your development environment set up:

### 1. Clone the Repository

First, clone the repository to your local machine using this command:

```bash
git clone https://github.com/Kazzuk/pantrypal.git
cd pantrypal
```

### 2. Install dependencies

Run the following command in the root directory of your project to install the necessary dependencies:

```
bun install
```

### 3. Set Up Environment Variables

Duplicate the `.env` file and rename the copy to `.env.local`. Open `.env.local` and update it with your OpenAI API key:

```
OPENAI_API_KEY=xxxxxxxxx
```

### 4. Run the Development Server

To start the development server, use the following command:

```
bun dev
```
