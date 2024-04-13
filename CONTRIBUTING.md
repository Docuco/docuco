# Contributing to Docuco

Don't forget to make Docuco more popular and give it a ⭐

First off, thank you for considering contributing to Docuco! We appreciate your interest in our project. Whether you're fixing a bug, improving the documentation, or adding a new feature, we welcome your contributions. This document will guide you through the process of contributing to Docuco. Please read it carefully before you start contributing. If you have any questions, feel free to reach out to us. We're happy to help! 

## How to Contribute

1. Fork the repository
2. Do changes to a new branch in your fork
3. Make sure your change follows the [contribution guidelines](#contribution-guidelines)
4. Make sure that all tests pass (and add new ones if necessary)
5. Commit your changes and push them to your fork
6. Create a pull request to `docuco:main`
7. Request a review from one of the maintainers

## Contribution Guidelines

To be able to contribute to Docuco you need to understand the architecture and the codebase. 

The project is divided into three main folders: `_core`, `web_app`, and `http_rest_api`.

The `_core` folder contains all the domain logic used in the backend side. Inside this folder, you will find the different contexts, and each context follows an hexagonal architecture with DDD. Follow the same pattern when adding new features or fixing bugs.

Inside `(web_app)` you will find the frontend side of the project. This project is built with Next.js and Mantine.

Lastly, the `(http_rest_api)` folder contains all the routes and controllers for the REST API.

We use Just and Docker Compose to develop and run the project. Make sure you have both installed on your machine and feel free see the `Justfile` to see all the available commands.

