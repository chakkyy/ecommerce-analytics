# ecommerce-analytics

ecommerce-analytics is a marketing site where you can import information about your products, orders, customers, and stores from different sources such as VTEX and physical stores. This allows creating and tracking metrics, applying user segments, generating information dashboards, displaying graphics, and trigger actions to your customers.

## Getting started

This project is organized as a monorepo with two main folders:

- **api:** Contains everything related to the backend of the site, including migrations, models, controllers, services, and middlewares.
- **dashboards:** Contains the UI and presentation layer, including assets, pages, components, styles, hooks, and more.

## Prerequisites

Make sure you have the following prerequisites installed before getting started:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Usage

### Environment Configuration

private

### Using Docker

Docker is used in this project to run Redis instances and scheduled jobs. Make sure you have Docker installed and running on your system.
You can also run the scripts located at `scripts` folder in the project's root directory.

### Collaboration

This project is designed to facilitate collaboration with other development teams. Follow these steps to get started:

- Clone this repository to your local device.
- Configure your environment variables in the .env files.
- Follow the environment setup steps.
- Run the project in your local environment.

### Running the Project

To locally run the project, follow these steps:

- Navigate to the root directory.
- Install dependencies: `npm install` or `yarn install`.
- Start the project: `yarn run dev`.

### Stack

This project leverages the following technologies:

- **TurboRepo:** This project utilizes TurboRepo to manage its monorepo structure efficiently.
- **Nest:** The backend is built with Nest, a powerful and extensible Node.js framework.
- **ReactJS:** The frontend is developed using ReactJS, a popular JavaScript library for building user interfaces.
- **Next.js:** The dashboards are powered by Next.js, a React framework for building server-rendered applications.
- **Redis:** Redis is used for caching and data storage, providing efficient data retrieval.
- **TypeScript:** The project is primarily written in TypeScript, a statically typed superset of JavaScript, which enhances code maintainability and developer productivity.
- **Swagger:** API endpoints are documented using Swagger for easy reference.

## Additional Documentation

For more detailed information about the project and its functionality, please refer to [private docs]

Contribute to the project and help ecommerce-analytics grow!
